const express = require('express');
const path = require('path');
const multer = require('multer');
const publishData = require('./src/publishData');
const ProjectDevelopmentPhase = require('./src/devphase');
const ProjectPool = require('./src/projectPool');
const sampleProject = require('./src/sampleProject');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();
const createProject = new ProjectDevelopmentPhase();
const newProjectPool = new ProjectPool();

app.use(express.json());
const DEFAULT_PORT = 4000; 

app.use(express.static(path.join(__dirname, 'public'))); 


// GET Request to display the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/index.html'));
})

// GET Request to display the project page
app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/create.html'));
})

// GET Request to display the dao page
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


//app.post('/api/devphase', (req, res) => {
//    const { title, input } = req.body;
//    console.log('API Received:',title, input);
//})

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
app.post('/api/devphase', upload.single('document'), (req, res) => {
    if (!req.file){
        res.json({ message: 'No file uploaded!' });
    }
    const uploadedFile = req.file;
    const title = req.body;

    // The following is an implementation to show how the programs retreives projects
    // from the project pool and updates specific information before publishing to the network (if/as needed)
    const initializeProject = sampleProject.newProject;
    
    initializeProject.projectPhases[title.title] = "Completed";
    console.log("Updated project:", initializeProject);

    const updatedProjectPool = newProjectPool.addProject(initializeProject);
    console.log("Updated Project Pool:", updatedProjectPool);

    // Depending on our final implementation, we could either emit a message to 
    // protius to say a step was completed, or publish to the entire network. 
    // This will be influenced by things like transaction costs.
    // For now, we will publish to the Stellar testnet
    const announceUpdate = JSON.stringify("Updated project:", initializeProject);
    try{
        publishData.publishStellar(JSON.stringify(announceUpdate));
    }catch(error){
        console.error("Error", error)
    }


});


// Listening on the right port
app.listen(DEFAULT_PORT, () => {
    console.log(`Listening on Localhost: ${DEFAULT_PORT}`);
});
