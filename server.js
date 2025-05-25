const express = require('express');
const path = require('path');
const multer = require('multer');
const publishData = require('./src/publishData');
const ProjectDevelopmentPhase = require('./src/devphase');
const ProjectPool = require('./src/projectPool');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();
const createProject = new ProjectDevelopmentPhase();
const newProjectPool = new ProjectPool();

app.use(express.json());
const DEFAULT_PORT = 4000; 

app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/contracts', express.static(path.join(__dirname, 'contracts')));

// GET Request to display the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/index.html'));
})

// GET Request to display the project page
app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/create.html'));
})

// GET Request to display the project development page
app.get('/development', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/development.html'));
})

// GET Request to display the trade page
app.get('/trade', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/trade.html'));
})

// GET Request to display the trade page
app.get('/invest', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/invest.html'));
})

// Contract Template: GET request to serve solidity file
app.get('/contracts/stake.sol', (req, res) => {
    res.sendFile(path.join(__dirname, 'contracts', 'stake.sol'));
  });

// Contract Template: GET request to serve solidity file
app.get('/contracts/newproject.sol', (req, res) => {
    res.sendFile(path.join(__dirname, 'contracts', 'newproject.sol'));
  });
  
  
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
app.post('/api/createproject', (req, res) => {
    const { newName, newDeveloper } = req.body;
    const newProject = createProject.createNewProject( newName, newDeveloper );
    const updatedProjectPool = newProjectPool.addProject(newProject);
    const announceProject = JSON.stringify(newName, newDeveloper);
    console.log("New Project Initiated", newProject);   
    console.log("Updated project pool", updatedProjectPool);

    /*Fetch block below is for publishing to local network via API
    fetch('http://localhost:3000/api/publish', { //This points to a local instance of another blockchain for dynamic testing
        method: 'POST',
        headers: {'content-type': 'application/json'},
        //body: JSON.stringify( newProject )
        body: JSON.stringify({ updatedProjectPool })
    }) */

    // Functionality to publish data (new projects) to the stellar testnet
    try{
        publishData.publishStellar(JSON.stringify(announceProject));
    }catch(error){
        console.error("Error", error)
    }
    
})


// POST request to upload files 
app.post('/api/devphase', (req, res) => {
    const { title, pname } = req.body;

    if (!title || !pname) {
        return res.status(400).json({ message: 'Missing title or pname in request' });
    }

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
    
    try{
        publishData.publishStellar(JSON.stringify(announceUpdate));
        res.json({ message: 'Project updated and published' });
    }catch(error){
        console.error("Error", error)
        res.status(500).json({ message: 'Publishing failed' });
    }
});


// Listening on the right port
app.listen(DEFAULT_PORT, () => {
    console.log(`Listening on Localhost: ${DEFAULT_PORT}`);
});
