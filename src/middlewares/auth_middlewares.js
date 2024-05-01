const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../database/database');

// get config vars
dotenv.config();

//Vérifie que l'utilisateur est authentifié
function isAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) { return res.status(401).json({ error: "Token non trouvé." }); }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        console.log(err);
        if (err) { return res.status(403).json({ error: "Token invalide." }); }
        req.token = decoded;
        next();
    });
}

module.exports = { isAuth };