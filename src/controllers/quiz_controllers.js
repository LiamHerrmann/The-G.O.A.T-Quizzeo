const db = require('../database/database');
// Controller quiz

//Create
async function createQuiz(req, res) {
	const id = req.body.id;
    const titre = req.body.titre;
    const dc = req.body.dc;
    const createur = req.body.createur;
    const statut = req.body.statut;
    const utilisateur = req.body.utilisateur;

    await db.query('CALL addQuiz(?,?,?,?,?,?);', [id,titre, dc, createur, statut,utilisateur]);

    res.status(201).json('Quiz crée');
}

//Update
async function updateQuiz(req, res) {

    const id = req.body.id;
    const titre = req.body.titre;
    const dc = req.body.dc;
    const createur = req.body.createur;
    const statut = req.body.statut;
    const utilisateur = req.body.utilisateur;

    await db.query('CALL updateQuiz(?,?,?,?,?,?);', [id, titre, dc, createur, statut,utilisateur]);

    res.status(200).json('Mise à jour');
}

//Delete
async function deleteQuiz(req, res) {

    await db.query('CALL deleteQuiz(?);', [req.param.id]);
    res.status(200).send('Quiz supprimée');
}

module.exports = {
    createQuiz,
    updateQuiz,
    deleteQuiz
}; 