const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');




const controller = require('../controllers/users.js');
const validation = require('../middlewares/validation.js');


// lire .env
dotenv.config();


// s'authentifier et recevoir un token jwt
router.post('/auth', validation.login, controller.login);

// déconnexion
router.post('/logout', validation.logout, controller.logout);

// inscription
router.post('/register', validation.register, controller.register);




module.exports = router;
