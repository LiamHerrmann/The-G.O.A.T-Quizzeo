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

    const name = await db.query('CALL addQuiz(?,?,?,?,?,?);', [id,titre, dc, createur, statut,utilisateur]);
    let result = await db.query('CALL getQuiz(?,?);', [Number(name[0][0].element) - 1, 1]);

    res.status(201).json(result[0]);
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
    let result = await db.query('CALL getQuiz(?,?);', [Number(id) - 1, 1]);

    res.status(200).json(result[0]);
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