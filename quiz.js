// JavaScript for quiz functionality

// Function to add additional options dynamically
function addOption() {
    const form = document.getElementById('quizForm');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'option' + (form.getElementsByTagName('input').length - 2); // Increment option name
    input.placeholder = 'Option ' + (form.getElementsByTagName('input').length - 1); // Increment option placeholder
    form.insertBefore(input, document.getElementById('addOption'));
}

// Event listener to call addOption() when Add Option button is clicked
document.getElementById('addOption').addEventListener('click', addOption);

// Event listener for form submission
document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Retrieve form data
    const formData = new FormData(this);
    
    // Convert form data to JSON
    const quizData = {};
    for (const [key, value] of formData.entries()) {
        quizData[key] = value;
    }

    // Send quizData to server for processing
    // Example: fetch('quiz-api.php', { method: 'POST', body: JSON.stringify(quizData) });
});
