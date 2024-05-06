const { query, param, body, validationResult } = require("express-validator");

// Validation des données
//   module: express-validator

// si les données ne sont pas valides, affichier les erreurs
function handleErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

const login = [
  body("email").isEmail().normalizeEmail(),
  body("password").isString().isLength({ min: 1, max: 128 }).notEmpty(),
  handleErrors,
];

const register = [
  body("email").isEmail().normalizeEmail(),

  // on pourra ajouter une règle pour empêcher des mots de passe faciles
  // mais on laisse pour les tests
  body("password").isString().isLength({ min: 2, max: 128 }).notEmpty(),

  // le nom complet doit être composé de:
  // \w: alphanumérique ou '_' (underscore)
  // des tirets, des points, des apostrophes ou des espaces
  // "^" veut dire: le début
  // "$" veut dire la fin
  // "*": 0 ou plus de caractères
  body("name")
    .isString()
    .isLength({ min: 1, max: 128 })
    .matches(/^[\w\-\.\' ]*$/)
    .notEmpty(),

  handleErrors,
];

const logout = [handleErrors];

module.exports = {
  login,
  register,
  logout
};
