// support des fichiers .env pour externaliser les paramètres
const dotenv = require("dotenv");
dotenv.config();

// support de token JWT
const jwt = require("jsonwebtoken");

const db = require("../database/db.js");

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // on utilise des requêtes paramétrées : on met  '?'
  const dbstatement =
    "SELECT email, role FROM users WHERE email = ? AND password = ? LIMIT 1";

  const [user] = await db.query(dbstatement, [email, password]);

  if (!user) {
    return res.status(401).json({ error: "Echec d'authentification" });
  }

  // journalisation

  journalise(req, email, "login");

  // on met le rôle dans le JWT
  const tokenPayload = {
    email: email,
    role: user.role,
  };

  // on signe le JWT.
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  // Send JWT token as response
  res.json({ token: token });
}

async function register(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  // on utilise des requêtes paramétrées : on met  '?'
  const dbstatement =
    "INSERT INTO users (email, name, password) VALUES (?, ?, ?)";

  try {
    await db.query(dbstatement, [email, name, password]);
  } catch (error) {
    // TODO: meilleure gestion d'erreur
    console.error("register error: " + error);
    return res.status(401).json({ error: error });
  }

  // journalisation
  journalise(req, email, "insert");

  res.json({ status: "ok" });
}

async function logout(req, res) {

  console.log("DBG1");
  const token = getToken(req, res);
  console.log("DBG2");
  // s'il n'y a pas de jeton, ...
  if (token == null) {
    console.log("DBG3");
    return res.status(401).json({ error: "Pas de token" });
  }
  console.log("DBG4");

  //const tokenPayload = parseJwt(token);
  const email = token.email; // tokenPayload.email;

  journalise(req, email, "logout");

  // todo..
  return res.status(200).json({ status: "ok" });
}

async function journalise(req, email, action) {
  // journalisation
  const ip = req.ip;

  // on écrit un log sur la console (qui peut être redirigé vers un fichier)
  console.log("action=" + action + ", email=" + email + ", ip=" + ip);

  // on écrit une entrée dans la table "journal"
  const logStatement =
    "INSERT INTO journal (email, ip, action) VALUES (?, ?, ?)";
  await db.query(logStatement, [email, ip, action]);
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
    if (err) {
      console.log(err);
      return null;
    }
    req.token = decoded;
  });

  return req.token;
}

// on exporte la fonction auth()
module.exports = { login, logout, register };
