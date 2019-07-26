const express = require('express');
const favicon = require('express-favicon');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, '/public/favicon.png')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`App is up and running 🌎`);
});