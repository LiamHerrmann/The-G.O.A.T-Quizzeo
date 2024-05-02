const express = require('express');
const app = express();
const cors = require('cors');

const db = require('../database/database');

app.listen(8080,() => {
    console.log("Serveur is up")
})