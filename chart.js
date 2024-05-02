$(document).ready(function() {
    // Code pour initialiser le graphique avec Chart.js
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5', 'Question 6', 'Question 7', 'Question 8', 'Question 9', 'Question 10'],
            datasets: [{
                label: 'Réponses Correctes',
                data: [12, 19, 3, 5, 2, 4, 8, 15, 7, 18],
                backgroundColor: 'rgba(218,165,32)',
                borderColor: 'rgba(218,165,32)',
                borderWidth: 1
            }, {
                label: 'Réponses Incorrectes',
                data: [5, 3, 8, 4, 6, 18, 2, 15, 14, 7],
                backgroundColor: 'rgba(105,105,105)',
                borderColor: 'rgba(105,105,105)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
 
        // Code pour ajouter des fonctionnalités de filtrage
        $('#filterBtn').on('click', function() {
            var selectedValue = $('#filterSelect').val();
            
            // Code pour filtrer les données ou ajuster le graphique en conséquence
            if (selectedValue === 'correct') {
                myChart.data.datasets[0].hidden = false; // Afficher les données des réponses correctes
                myChart.data.datasets[1].hidden = true;  // Masquer les données des réponses incorrectes
            } else if (selectedValue === 'incorrect') {
                myChart.data.datasets[0].hidden = true;  // Masquer les données des réponses correctes
                myChart.data.datasets[1].hidden = false; // Afficher les données des réponses incorrectes
            } else if (selectedValue === 'both') {
                myChart.data.datasets[0].hidden = false; // Afficher les données des réponses correctes
                myChart.data.datasets[1].hidden = false; // Afficher les données des réponses incorrectes
            }
    
            myChart.update(); // Mettre à jour le graphique avec les nouvelles données filtrées
        });
    });

