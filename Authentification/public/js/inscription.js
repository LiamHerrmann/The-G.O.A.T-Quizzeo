function getCaptcha() {

  fetch("/captcha")
    .then((response) => response.json())
    .then((data) => {
      // afficher l'image captcha
      document.getElementById("captchaContainer").innerHTML = data.svg;
      // Stocker le texte
      sessionStorage.setItem("captchaText", data.text);
    });
}

function validateCaptcha() {

  const form = document.getElementById("captchaForm");

  const userInput = document.getElementById("captchaInput").value;
  const captchaText = sessionStorage.getItem("captchaText");
  if (userInput === captchaText) {
    alert("Captcha correct");
    doRegister();
  } else {
    alert("Captcha incorrect");
    
    getCaptcha(); // récupérer un nouveau Captcha
  }
}

async function doRegister() {
  getCaptcha();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const messageDiv = document.getElementById("errorMessage");

  // on réinitialise le message d'erreur
  messageDiv.innerText = "";
  messageDiv.style.display = "block";

  // on envoie un "POST /usr/register" pour s'authentifier
  try {
    const response = await fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });

    // on récupère la réponse
    const data = await response.json();

    // en cas d'erreur, on affiche un message sur la page
    if (!response.ok) {
      console.error(data.error);
      // message d'erreur
      messageDiv.innerText = "Echec: " + data.error;
      return;
    }
  } catch (error) {
    console.error("Error:", error);
    // Message d'erreur
    messageDiv.innerText = "Echec: " + data.error;
  }


}

function oldDoReg() {
  // on met un "event listener" pour soumettre le formulaire sous forme JSON
  // à l'API REST, en utilisant Javascript.
  document
    .getElementById("registerForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      console.log("===doReg called");

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const messageDiv = document.getElementById("errorMessage");

      // on réinitialise le message d'erreur
      messageDiv.innerText = "";
      messageDiv.style.display = "block";

      // on envoie un "POST /usr/register" pour s'authentifier
      try {
        const response = await fetch("/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
          }),
        });

        // on récupère la réponse
        const data = await response.json();

        // en cas d'erreur, on affiche un message sur la page
        if (!response.ok) {
          console.error(data.error);

          // message d'erreur
          messageDiv.innerText = "Echec: " + data.error;
          return;
        }
        console.log("===doReg = ok");
      } catch (error) {
        console.error("Error:", error);
        // Message d'erreur
        messageDiv.innerText = "Echec: " + data.error;
      }
    });
}
