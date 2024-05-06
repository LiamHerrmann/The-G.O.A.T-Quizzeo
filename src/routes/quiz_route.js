// CRUD QUIZ

const express = require('express');
const auth = require('../middlewares/auth_middlewares');
const controller = require('../controllers/quiz_controllers');
const validation = require('../middlewares/validation_middlewares');

const router = express.Router();

//Create
router.post('/create', validation.createQuiz, controller.createQuiz);
//Update
router.put('/update', validation.updateQuiz, controller.updateQuiz);
//Delete
router.delete('/delete/:id', controller.deleteQuiz);

module.exports = router;