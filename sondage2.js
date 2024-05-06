document.addEventListener("DOMContentLoaded", function () {
    const surveyForm = document.getElementById('surveyForm');

    // Écouteur d'événement pour soumettre le formulaire de création de sondage
    surveyForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche la soumission par défaut du formulaire

        // Récupère les valeurs du formulaire
        const surveyTitle = surveyForm.querySelector('#surveyTitle').value;
        const questions = Array.from(surveyForm.querySelectorAll('[name^=question]')).map(input => input.value);
        const isPublic = surveyForm.querySelector('#publicSurvey').checked;

        // Appel de la fonction pour créer le sondage
        createSurvey(surveyTitle, questions, isPublic);

        // Efface les champs du formulaire après la soumission
        surveyForm.reset();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const surveyAnswerForm = document.getElementById('surveyAnswerForm');

    // Écouteur d'événement pour soumettre le formulaire de réponse au sondage
    surveyAnswerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche la soumission par défaut du formulaire

        // Récupère les réponses du formulaire
        const answers = Array.from(surveyAnswerForm.querySelectorAll('[name^=answer]')).map(input => input.value);
        const surveyId = ""; // ID du sondage auquel l'utilisateur répond À déterminer selon votre implémentation 

    });
     
});
