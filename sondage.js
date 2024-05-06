function addOption() {
    const form = document.getElementById('surveyForm');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'option' + (form.getElementsByTagName('input').length - 2); 
    input.placeholder = 'Option ' + (form.getElementsByTagName('input').length +0); 
    form.insertBefore(input, document.getElementById('addOption'));
}

document.getElementById('addOption').addEventListener('click', addOption);

document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault(); 


    const formData = new FormData(this);

    const surveyData = {};
    for (const [key, value] of formData.entries()) {
        surveyData[key] = value;
    }

});