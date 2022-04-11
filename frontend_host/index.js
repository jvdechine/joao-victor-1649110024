const express = require('express');
const path = require('path');

const app = express();
console.log(path.join(__dirname, './dist'))
app.use(express.static(path.join(__dirname, './dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening to port 3000');
});