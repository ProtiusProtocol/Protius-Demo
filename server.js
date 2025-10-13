const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
//const publishData = require('./src/publishData');
const ProjectDevelopmentPhase = require('./src/devphase');
const ProjectPool = require('./src/projectPool');
const { insertProjectAndPhases } = require('./src/updateDatabase');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const createProject = new ProjectDevelopmentPhase();
const newProjectPool = new ProjectPool();
const mysql = require('mysql2/promise');
const { insertNewEvent } = require('./src/eventsRouter');
//const { startChecking } = require("./src/poller");
const http = require("http");
const socketIO = require("socket.io");
const {pool} = require('./src/initializeDB');

//const allowedOrigins = ['http://localhost:4000'];
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 4000;
//const PORT = 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/smartcontracts', express.static(path.join(__dirname, 'smartcontracts')));
//app.use(cors({ origin: allowedOrigins}));

//Web socket
io.on('connection', socket => {
    console.log("Client connected");
});

// Periodically check database for events
//startChecking(io);


//_____________GET Requests for User Facing frontend pages___________________________________________________
// GET Request to display the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/index.html'));
})

// GET Request to display the Admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/admin.html'));
})

// GET Request to display the smart contracts page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/contact.html'));
})

// GET Request to display the smart contracts page
app.get('/contracts', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/contracts.html'));
})

// GET Request to display the project page
app.get('/create-project', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/create-project.html'));
})

// GET Request to display the dashboard page
app.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/admin-dashboard.html'));
})

// GET Request to display the dashboard page
app.get('/user-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/user-dashboard.html'));
})

// GET Request to display the smart contracts page
app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/docs.html'));
})

// GET Request to display the trade page
app.get('/invest', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/invest.html'));
})


// GET Request to display the smart contracts page
app.get('/connect', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/connect.html'));
})


// GET Request to display the admin projects page
app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/projects.html'));
})

// GET Request to display the trade page
app.get('/trade', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/trade.html'));
})

// GET Request to display the project development page
app.get('/update', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/update.html'));
})



//_____________GET Requests to serve smart contract templates___________________________________________________
// Contract Template: GET request to serve solidity file
app.get('/contracts/stake.sol', (req, res) => {
    res.sendFile(path.join(__dirname, 'contracts', 'stake.sol'));
  });

// Contract Template: GET request to serve solidity file
app.get('/contracts/newproject.sol', (req, res) => {
    res.sendFile(path.join(__dirname, 'contracts', 'newproject.sol'));
  });
  


//_____________POST Requests/API Endpoints___________________________________________________
// POST request to test and ensure stakes are received 
app.post('/api/newstake', (req, res) => {
    const { tokens } = req.body;
    console.log('API Received:', tokens);
})


// POST request to test and ensure votes are received 
app.post('/api/vote', (req, res) => {
    const { userVote } = req.body;
    console.log('Vote Received:', userVote);
})


// POST request to create new project
app.post('/api/createproject', async (req, res) => {
    const { owner, newName, newDeveloper, finance, devContribute } = req.body;

    if (!owner || !newName || !newDeveloper || !finance || !devContribute) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProject = createProject.createNewProject( owner, newName, newDeveloper, finance, devContribute );

    try{
        console.log(newProject);
        await insertProjectAndPhases(newProject);
        res.status(201).json({ message: 'Project created successfully', projectID: newProject.projectID });
    } catch (err) {
        console.error('Project creation failed:', err);
        res.status(500).json({ error: 'Failed to create project' });
    }
    
    //const updatedProjectPool = newProjectPool.addProject(newProject);
    //const announceProject = JSON.stringify(newName, newDeveloper);
    //console.log("New Project Initiated", newProject);   
    //console.log("Updated project pool", updatedProjectPool);

    /*Fetch block below is for publishing to local network via API
    fetch('http://localhost:3000/api/publish', { //This points to a local instance of another blockchain for dynamic testing
        method: 'POST',
        headers: {'content-type': 'application/json'},
        //body: JSON.stringify( newProject )
        body: JSON.stringify({ updatedProjectPool })
    }) */

    // Functionality to publish data (new projects) to the stellar testnet_____________
    /*
    try{
        publishData.publishStellar(JSON.stringify(announceProject));
    }catch(error){
        console.error("Error", error)
    }
    */
})


// POST request to retreive projects from database for a specific user
app.post('/api/get-projects', async (req, res) => {
    const { walletAddress } = req.body;
    //console.log('[TEST] GET PROJECTS FOR SPECIFIC USER', walletAddress)
    
    if (!walletAddress) return res.status(400).json({error: "Wallet Address Required"});

    try {
        //const conn = await pool.connect()
        const query = `SELECT * FROM projects_table WHERE owner = $1`;
        //const values = [walletAddress];

        //const result = await conn.query(query, values);
        const result = await pool.query(query, [walletAddress]);

        const rows = result.rows;

        //conn.release();
        return res.json({ projects: rows});
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query failed'});
    }
        
});


// GET request to retreive All projects  (total) from database
app.get('/api/get-all-projects', async (req, res) => {
    //console.log('[TEST] GET PROJECTS API WORKING')
    
    try {
        //const conn = await pool.connect();
        //const result = await conn.query(`SELECT * FROM projects_table`);
        const result = await pool.query(`SELECT * FROM projects_table`);
        const rows = result.rows;

        //conn.release();

        return res.json({ projects: rows});
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query failed'});
    }
        
});


// GET request to retreive All project phases from database
app.get('/api/getallphases', async (req, res) => {
    const { projectID } = req.body;
    
    try {
        const query = `SELECT * FROM project_phases WHERE id =$1`;
        
        const values = [projectID];

        const result = pool.query(query, values)

        const rows = result.rows;

        return res.json({ projects: rows});
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query failed'});
    }
    /*
    const projectID = req.query.projectID;
    let conn;
    
      try {
          conn = await mysql.createConnection(dbconfig);
          const [rows] = await conn.execute(
              `SELECT * FROM project_phases WHERE projectID =?`,
              [projectID]
          );
          await conn.end();
          //console.log(rows);
          res.json({ phases: rows });
      } catch (err) {
          console.error('Database error:', err);
      }
          */
});


// POST request to update phases in a project 
app.post('/api/devphase', async (req, res) => {
    const { owner, pname, title } = req.body;
    //console.log('[TEST] GET PROJECTS FOR DEV PHASE')

    if ( !owner || !pname || !title ) {
        return res.status(400).json({ message: 'Missing owner, title or name in request' });
    }
    console.log( owner, pname, title );

    try {
        //const conn = await pool.connect();

        // Update phase status to 'completed' where project owner, name, and title match
        const query =
            `UPDATE project_phases
            SET  ${title} = 'completed'
            WHERE id = $1`;

        const values = [pname];

        //await conn.query(query, values);
        await pool.query(query, values);

        //conn.release();     

        res.status(200).json({ message: 'Phase status updated to completed' });
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query failed' });
    }
    //#######################################################################
    
    /*
    const matchingProject = newProjectPool.getAllProjects().find(project =>
        project.projectName.toLowerCase().includes(pname.toLowerCase())
    );

    

    if (!matchingProject) {
        return res.status(404).json({ message: 'Project not found in ProjectPool' });
    }

    if (!(title in matchingProject.projectPhases)) {
        return res.status(400).json({ message: `Invalid project phase: ${title}` });
    }

    matchingProject.projectPhases[title] = 'Completed';

    newProjectPool.updateProject(matchingProject.projectID, matchingProject); // replace existing

    console.log('Updated project:', matchingProject);
    console.log('Updated Project Pool:', newProjectPool.getAllProjects());
  
    const announceUpdate = JSON.stringify("Updated project:", matchingProject);
    
    // Push Updates to Stellar Testnet
    /*
    try{
        publishData.publishStellar(JSON.stringify(announceUpdate));
        res.json({ message: 'Project updated and published' });
    }catch(error){
        console.error("Error", error)
        res.status(500).json({ message: 'Publishing failed' });
    }
        */
});


//POST request to add a new event to the list
app.post('/api/newevent', async (req, res) => {
    const { type, event, user, payload, timestamp } = req.body;
    await insertNewEvent(type, event, user, JSON.stringify(payload), timestamp);
});

//POST request to get all events
/*
app.get('/api/events', async (req, res) => {
    const conn = await mysql.createConnection(dbconfig);
    
    try {
        const [rows] = await conn.execute("SELECT * FROM events ORDER BY timestamp DESC LIMIT 100");
        res.json(rows);
        //console.log(rows);
    } catch (err) {
        console.error("DB query failed:", err);
        res.status(500).send("DB query failed");
    }
        
});
*/

// POST request to record project decision
app.post('/api/projectdecision', async (req, res) => {
    const { projectID, decision } = req.body;

    try {
       
        const query =
            `UPDATE project_table
            SET  ${decision} = 'approved'
            WHERE id = $1`;

        const values = [projectID];

        //await conn.query(query, values);
        await pool.query(query, values);

        //conn.release();     

        res.status(200).json({ message: 'Phase status updated to completed' });
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query failed' });
    }
});



// Listening on the right port
server.listen(PORT, () => {
    console.log(`Protius Server Listening on Localhost Port: ${PORT}`);
});

//require('./src/eventListener');