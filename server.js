const express = require('express');
const path = require('path');
const multer = require('multer');
const ProjectDevelopmentPhase = require('./src/devphase');
const ProjectPool = require('./src/projectPool')


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

// GET Request to display the about page
//app.get('/about', (req, res) => {
//    res.sendFile(path.join(__dirname, '/public/pages/about.html'));
//})

// GET Request to display the project page
//app.get('/project', (req, res) => {
//    res.sendFile(path.join(__dirname, '/public/pages/project.html'));
//})

// GET Request to display the project page
app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/create.html'));
})

// GET Request to display the dao page
app.get('/dao', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/dao.html'));
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
    console.log("New Project Initiated", newProject);

    fetch('http://localhost:3000/api/publish', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        //body: JSON.stringify( newProject )
        body: JSON.stringify({ updatedProjectPool })
    }) 
})

// POST request to upload files 
app.post('/api/devphase', upload.single('document'), (req, res) => {
    if (!req.file){
        res.json({ message: 'No file uploaded!' });
    }
    const uploadedFile = req.file;
    const title = req.body;
    console.log('API Received:',title);
    console.log(uploadedFile);

});


// Listening on the right port
app.listen(DEFAULT_PORT, () => {
    console.log(`Listening on Localhost: ${DEFAULT_PORT}`);
});
