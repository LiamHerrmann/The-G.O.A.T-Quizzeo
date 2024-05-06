// déconnexion
async function doLogout() {
  const token = localStorage.getItem("quizjwt");
  if (!token) {
    console.error("Pas de token. Il faut s'authentifier");
    return null;
  }

  localStorage.removeItem("quizjwt");

  // on se déconnecte du serveur
  // ça aide journalisation

  fetch("/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la déconnexion");
      }
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });



  // on redirige vers la page d'accueil
  window.location.href = "/";
}
