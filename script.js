let currentQuestionIndex = 0;
let questions = [];
let score = 0; // Pour garder le score des réponses correctes

// Charger les questions depuis le fichier JSON
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data.questions;
        displayQuestion();
    });

// Afficher la question actuelle
function displayQuestion() {
    const responseElement = document.getElementById('response');
    responseElement.textContent = ''; // Effacer la réponse précédente
    document.getElementById('next-button').style.display = 'none'; // Cacher le bouton de la question suivante

    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.getElementById('question').textContent = question.question;
        const options = document.getElementById('options');
        options.innerHTML = ''; // Effacer les options précédentes
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => {
                checkAnswer(option);
                disableOptions(); // Désactiver les autres options après un clic
            };
            options.appendChild(button);
        });

        // Activer tous les boutons de réponse pour la nouvelle question
        const optionButtons = document.querySelectorAll('#options button');
        optionButtons.forEach(button => {
            button.disabled = false;
        });
    } else {
        document.getElementById('quiz-container').innerHTML = `
            <h1>Quiz terminé! Votre score: ${score}/${questions.length}</h1>
            <button onclick="location.reload()">Recommencer</button>
            <button onclick="window.location.href='index.html'">Retourner à l'accueil</button>
        `;
    }
}

// Vérifier si la réponse est correcte
function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const responseElement = document.getElementById('response');
    if (selectedOption === correctAnswer) {
        score++; // Augmenter le score pour une réponse correcte
        responseElement.textContent = "Correct!";
        responseElement.style.color = 'green';
    } else {
        responseElement.innerHTML = "Incorrect!<br>The correct answer was:<br>" + correctAnswer;
        responseElement.style.color = 'red';
    }
    document.getElementById('next-button').style.display = 'block'; // Afficher le bouton de la question suivante
}

// Désactiver toutes les options après un clic
function disableOptions() {
    const optionButtons = document.querySelectorAll('#options button');
    optionButtons.forEach(button => {
        button.disabled = true;
    });
}

// Passer à la question suivante
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion(); // Afficher la nouvelle question
}