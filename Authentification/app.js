// on utilise Express
const express = require('express')
const app = express()

// on active l'accès aux fichier web dans le dossier public/
app.use(express.static('public'))


// on utilise JSON
app.use(express.json());

//app.use(express.urlencoded({ extended: true }));

// base de données
const db = require('./database/db.js');

// routes

// routes pour la gestion des utilisateurs
const usersRoutes = require('./routes/users.js');
app.use('/users', usersRoutes);

// routes pour captcha
const captchaRoutes = require('./routes/captcha.js');
app.use('/captcha', captchaRoutes);


// TODO: routes pour les quiz... etc


// page d'accueil
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/page_accueil.html');
});

// port d'ecoute
const port = 8000

app.listen(port, () => console.log(`URL: http://localhost:${port}`))