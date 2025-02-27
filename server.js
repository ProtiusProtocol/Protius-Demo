const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
const DEFAULT_PORT = 4000; 

app.use(express.static(path.join(__dirname, 'public'))); 


// GET Request to display the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../protius/public/pages/index.html'));
})

// GET Request to display the dao page
app.get('/dao', (req, res) => {
    res.sendFile(path.join(__dirname, '../protius/public/pages/dao.html'));
})

// GET Request to display the trade page
app.get('/trade', (req, res) => {
    res.sendFile(path.join(__dirname, '../protius/public/pages/trade.html'));
})

// Listening on the right port
app.listen(DEFAULT_PORT, () => {
    console.log(`Listening on Localhost: ${DEFAULT_PORT}`);
});
