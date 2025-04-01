const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
const DEFAULT_PORT = 4000; 

app.use(express.static(path.join(__dirname, 'public'))); 


// GET Request to display the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/index.html'));
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


app.post('/api/devphase', (req, res) => {
    const input = req.body;
    console.log('API Received:', input);
})


// Listening on the right port
app.listen(DEFAULT_PORT, () => {
    console.log(`Listening on Localhost: ${DEFAULT_PORT}`);
});
