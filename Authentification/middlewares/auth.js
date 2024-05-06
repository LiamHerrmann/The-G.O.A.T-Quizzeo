// support des fichiers .env pour externaliser les paramètres
const dotenv = require("dotenv");
dotenv.config();

// support de token JWT
const jwt = require("jsonwebtoken");

const db = require("../database/db.js");

// l'utilisateur est-il authentifié ?
function isAuth(req, res, next) {
  const token = getToken(req, res);

  // s'il n'y a pas de jeton, echec
  if (token == null) {
    return res.status(401).json({ error: "Pas de token" });
  }

  next();
}

function getToken(req, res) {
  // on récupère l'entête "Authorization"
  const authHeader = req.headers["authorization"];

  // l'entête contient: Bearer tokenjwt
  // on découpe en utilisant l'espace, le jeton est alors
  // le 2ème élément, donc [1]  (le [0] = "Bearer")
  const token = authHeader && authHeader.split(" ")[1];

  // s'il n'y a pas de jeton, echec
  if (token == null) {
    return null;
  }

  // on vérifie le jeton en utilisant le secret JWT_SECRET
  // qui a été utilisé pour le signer
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log(err);
    if (err) {
      return null;
    }
    req.token = decoded;
  });

  return req.token;
}

module.exports = { isAuth, getToken };
