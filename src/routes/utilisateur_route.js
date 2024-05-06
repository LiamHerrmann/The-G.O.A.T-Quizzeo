// CRUD utilisateur

const express = require('express');
const auth = require('../middlewares/auth_middlewares');
const controller = require('../controllers/utilisateur_controllers');
const validation = require('../middlewares/validation_middlewares');

const router = express.Router();

//Create
router.post('/create', validation.createUtilisateur, controller.createUtilisateur);
//Read
router.get('/show/:id', validation.readUtilisateur, controller.readUtilisateur);
//Update
router.put('/update', validation.updateUtilisateur, controller.updateUtilisateur);
//Delete
router.delete('/delete/:id', controller.deleteUtilisateur);

module.exports = router;