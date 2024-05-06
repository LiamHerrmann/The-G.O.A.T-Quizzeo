# Base de données

on créé des tables:

## table users
champs: id, name, email, password, role
le role par défaut est: utilisateur

## table journal
pour la journalisation
champs: id, email, ip, action

ip : adresse IP source de l'utilisateur
action: login, logout, insert, ...
insert = inscription

# Navigation

## inscription
fichier: inscription.html 
on utilise inscription.js pour renvoyer le formulaire au format JSON à l'API REST de nodejs
la requête est envoyée vers http://serveur:port/users/register
(dans les test: serveur=localhost, port=8000)

le serveur valide les données en utilisant express-validator (dans middlewares/validations.js)
et si c'est valide, insère une ligne dans la table users.


le serveur ajoute une ligne dans la table journal (action=insert)

## connexion
fichier: connexion.html
on utiliser login.js pour renvoyer le formulaire au format JSON à l'API REST de nodejs
la requête est envoyée vers http://serveur:port/users/auth

le serveur valide les données (express-validator) et cherche l'utilisateur dans la base de données 
avec les champs email et password. en cas de succès, il un jeton JWT est généré et signé. ce jeton
contient les champs 'email' et 'role'. le role est utilisé côté client pour vérifier si l'utilisateur 
est autorisé à accéder à des pages. 

le serveur ajoute une ligne dans la table journal (action=login)

le serveur renvoie le jeton au navigateur. avec javascript, le jeton est sauvé dans le localStorage 
du navigateur avec le nom "quizjwt". il pourra être extrait par javascript lorsqu'il y en a besoin.

En cas d'erreur, un message d'erreur est affiché sous le formulaire. 


## logout
fichier: logout.html
on utilise logout.js pour
- envoyer une requête au serveur http://serveur:port/users/logout.
le serveur ajoute alors une ligne dans la table journal (action=logout)
- supprime le jeton du localStorage
- renvoie vers la page d'accueil

## quiz.html
on utilise javascript pour vérifier si l'utilisateur est authentifé.
s'il ne l'est pas, on renvoie vers la page connexion.html?redir=quiz.html
le parmètre redir=quiz permet de rediriger l'utilisateur vers quiz.html après une authentification réussie.

si l'utilisateur est authentifié, on vérifie que son rôle permet la création de quiz.
ici, on autorise uniquement les rôles: createur_quiz et admin_quiz.
la liste peut être modifée si besoin.

si l'utilisateur n'est pas autorisé, on renvoie vers la page d'accueil. une amélioration
porra être mise en place pour renvoyer sur une page d'erreur par exemple. 
on pourra aussi affichier un "dialog". 

<script>
       
      // les roles permis pour cette page
      const rolesPermis = new Set(["createur_quiz", "admin_quiz"]);

      // si pas authentifié, on renverra vers la page d'authentification
      // avec indication (?redir...) de redirection ici en cas de succès 
      loginPage =  "/connexion.html?redir=quiz.html";
      // si le rôle n'est pas autorisé à créer un quiz, on redirige 
      // vers la page d'accueil
      badRolePage = "/";

      checkPermission(rolesPermis, loginPage, badRolePage);

    </script>


# serveur
on déclare les routes /auth dans app.js, et on définit dans routes/users.js :
- /users/register
- /users/auth
- /users/logout


