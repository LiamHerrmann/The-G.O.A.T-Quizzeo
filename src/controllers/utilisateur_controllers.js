const db = require('../database/database');
// Controller utilisateur

//Create
async function createUtilisateur(req, res) {
	const id = req.body.id;
    const nom = req.body.nom;
    const mdp = req.body.mdp;
    const mail = req.body.mail;
    const role = req.body.role;

    const name = await db.query('CALL addUtilisateur(?,?,?,?,?);', [id,nom, mdp, mail, role]);
    let result = await db.query('CALL getUtilisateur(?,?);', [Number(name[0][0].element) - 1, 1]);

    res.status(201).json(result[0]);
    
}

//Read
async function readUtilisateur(req, res) {
    const nom = req.body.nom;
    const role = req.body.role;

    let result = await db.query('CALL getUtilisateur(?,?);', [nom, role]);

    if (result[0].length > 0) {
        res.status(200).json(result[0]);
    }
    else {
        res.status(404).json({ error: "Utilisateurs introuvables." });
    }
}

//Update
async function updateUtilisateur(req, res) {

    const id = req.body.id;
    const nom = req.body.nom;
    const mdp = req.body.mdp;
    const mail = req.body.mail;
    const role = req.body.role;

    await db.query('CALL updateUtilisateur(?,?,?,?,?);', [id, nom, mdp, mail, role]);
    let result = await db.query('CALL getUtilisateur(?,?);', [Number(id) - 1, 1]);

    res.status(200).json(result[0]);
}

//Delete
async function deleteUtilisateur(req, res) {

    await db.query('CALL deleteUtilisateur(?);', [req.param.id]);
    res.status(200).send('Utilisateur supprimée');
}

module.exports = {
    createUtilisateur,
    updateUtilisateur,
    deleteUtilisateur,
    readUtilisateur
}; 