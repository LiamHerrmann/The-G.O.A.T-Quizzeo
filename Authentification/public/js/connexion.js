// implémente la "connexion"
//   on "convertit" le formulaire en JSON pour l'envoyer sur le serveur
//   on récupère le résultat, qui est un JWT...
function doLogin() {
  // si l'utilisateur est déjà authentifié, on ne montre pas le formulaire
  // d'authentification. on redirige directemet vers la page cible.
  const role = getUserRole();
  if (role && !(role instanceof Promise)) {
    console.log("role:: " + role);
    redirigeApresAuth();
    return;
  }

  // on met un "event listener" pour soumettre le formulaire sous forme JSON
  // à l'API REST, en utilisant Javascript.
  document
    .getElementById("loginForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const messageDiv = document.getElementById("errorMessage");

      // on réinitialise le message d'erreur
      messageDiv.innerText = "";
      messageDiv.style.display = "block";

      // on envoie un "POST /usr/auth" pour s'authentifier
      try {
        const response = await fetch("/users/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        });

        // on récupère la réponse
        const data = await response.json();

        // en cas d'erreur, on affiche un message sur la page
        if (!response.ok) {
          console.error(data.error);

          // message d'erreur
          messageDiv.innerText =
            "Echec d'authentification: mauvais email ou password";
          return;
        }

        // on stocke le token dans le navigateur
        const token = data.token;
        storeToken(token);

        // on redirige vers la page protégée
        redirigeApresAuth(token);
      } catch (error) {
        console.error("Error:", error);
        // Message d'erreur
        messageDiv.innerText = "Echec d'authentification...";
      }
    });
}

// on vérifie si l'utilisateur a un rôle "autorisé"
//   s'il n'est pas authentifié, on redirige vers loginPage
//   s'il est authentifié mais son rôle n'autorise pas, on
//   le redirige vers badRolePage
function checkPermission(rolesPermis, loginPage, badRolePage) {
  //si pas authentifié, rediriger vers la page d'authentification
  token = loadAuthToken();
  if (!token) {
    window.location.href = loginPage;
    return;
  }
  console.log("checkPermission:");
  const role = getUserRole();
  if (!role) {
    role = "utilisateur";
    console.log("pas de role: erreur ");
    window.location.href = badRolePage;
    return;
  }

  const isAuthorized = rolesPermis.has(role);
  console.log("isAuthorized=" + isAuthorized);

  if (!isAuthorized) {
    // s'il n'a pas le bon rôle, rediriger vers l'accueil
    // TODO: il faudrait afficher un message d'erreur etc
    console.log("pas le bon role: " + role);
    window.location.href = badRolePage;
  }
  return;
}

// ###### fonctions internes à login.js

function redirigeApresAuth(token) {
  // la page appelante envoie vers /connexion.html&redir=PAGE
  // après authentification, on renvoie vers /PAGE
  // cette fonction récupère la valeur de PAGE

  const params = new URLSearchParams(window.location.search);
  let redir = params.get("redir");
  if (!redir) {
    redir = "";
  }

  console.log("redir :: /" + redir);

  const role = getUserRole();
  console.log("role: " + role);
  // si pas de role, on redirige vers la page d'authentification
  if (!role) {
    window.location.href = "/connexion.html?" + redir;
    return;
  }

  console.log("redir vers: " + redir);

  window.location.href = "/" + redir;

  // rediriger avecenvoi du jwt.
  // ne marche pas avec les permission
  //redirigerAvecJwt(token, redir);
}

// on redirige en javascript pour pouvoir mettre le JWT dans
// l'entête "Authorization".
function redirigerAvecJwt(token, redir) {
  // on redirige en mettant l'entête
  // Authorization: Bearer <JWT>
  // par exemple:
  // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ........

  fetch("/" + redir, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération de la page");
      }
      return response.text(); // Return HTML content as text
    })
    .then((htmlContent) => {
      // on remplace la page html courante par le html reçu
      document.documentElement.innerHTML = htmlContent;
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });

  // on "corrige" l'url dans la barre du navigateur
  history.pushState({}, null, "/" + redir);
}

// renvoie le role trouvé dans le token
function getUserRole() {
  token = loadAuthToken();
  if (!token) {
    console.log("pas de token....");
    return null;
  }

  const arrayToken = token.split(".");
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  const role = tokenPayload.role;

  // le role par défaut est utilisateur
  if (!role) {
    console.log("HMMM pas de role...");
    role = "utilisateur";
  }
  console.log("User role:", role);

  return role;
}

// stockage du jeton JWT dans le "localStorage" du navigateur
function storeToken(token) {
  localStorage.setItem("quizjwt", token);
  console.log("Logged in successfully! token=" + token);
}

// récupère le JWT du localStorage
function loadAuthToken() {
  const token = localStorage.getItem("quizjwt");
  if (!token) {
    console.error("Pas de token. Il faut s'authentifier");
    return null;
  }

  console.log("token trouvé");
  return token;
}
