const { param, body, validationResult } = require('express-validator');

// Utilisation du module 'express-validator' pour faire le système de validation

//Permet d'afficher les erreurs au cas où il y en a eu pendant les validations.
function handleErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

//Contrôle les champs concernant certaines actions.
//Les actions concernées se déduisent du nom des constantes ci-dessous.

const createQuiz = [
    body('id').isInt().notEmpty(),
    body('titre').isString().isLength({ min: 1, max: 64 }).notEmpty(),
    body('dc').isString().isLength({ min: 1, max: 64 }).notEmpty(),
    body('createur').isString().isLength({ min: 1, max: 64 }).notEmpty(),
    body('statut').isString().isLength({ min: 1, max: 64 }).notEmpty(),
    body('utilisateur').isString().isLength({ min: 1, max: 64 }).notEmpty(),
    handleErrors
];

const updateQuiz = [
    body('id').isInt().notEmpty(),
    body('titre').isString().isLength({ min: 1, max: 64 }).notEmpty(),
    body('dc').isString().isLength({ min: 1, max: 64 }).notEmpty(),
    body('createur').isString().isLength({ min: 1, max: 64 }).notEmpty(),
    body('statut').isString().isLength({ min: 1, max: 64 }).notEmpty(),
    body('utilisateur').isString().isLength({ min: 1, max: 64 }).notEmpty(),
    handleErrors
];

const updateUtilisateur = [
    body('id').isInt().notEmpty(),
    body('nom').isString().isLength({ min: 1, max: 64 }).notEmpty(),
    body('mdp').isInt().notEmpty(),
    body('mail').isString().isLength({ min: 1, max: 1 }).notEmpty(),
    body('role').isInt().notEmpty(),
    handleErrors
];

const createUtilisateur = [
    body('nom').isString().isLength({ min: 1, max: 64 }).notEmpty(),
    body('mdp').isInt().notEmpty(),
    body('mail').isString().isLength({ min: 1, max: 1 }).notEmpty(),
    body('role').isInt().notEmpty(),
    handleErrors
];

const readUtilisateur = [
    param('id').isInt().notEmpty(),
    body('number').isInt().notEmpty(),
    handleErrors
];

const authenticate = [

    body('utilisateur').isString().isLength({ min: 1, max: 128 }).notEmpty(),
    body('mdp').isString().isLength({ min: 1, max: 128 }).notEmpty(),
    handleErrors
];

module.exports = {

    authenticate,
    updateUtilisateur,
    createUtilisateur,
    readUtilisateur,
    createQuiz,
    updateQuiz
};