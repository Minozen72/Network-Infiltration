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
        document.getElementById('question').innerHTML = `<p>${question.question}</p>`;
        const options = document.getElementById('options');
        options.innerHTML = ''; // Effacer les options précédentes
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option);
            button.classList.add('col-md-5', 'col-sm-12');
            options.appendChild(button);
        });

        // Activer tous les boutons de réponse pour la nouvelle question
        const optionButtons = document.querySelectorAll('#options button');
        optionButtons.forEach(button => {
            button.disabled = false;
        });
    } else {
        document.getElementById('quiz-container').innerHTML = `
            <h1>Quiz finished! <br> Your score: ${score}/${questions.length}</h1>
            <button onclick="location.reload()">Restart</button>
            <button onclick="window.location.href='index.html'">Back to home</button>
        `;
    }
}

// Vérifier si la réponse est correcte
function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const responseElement = document.getElementById('response');
    const optionButtons = document.querySelectorAll('#options button');

    // Désactiver tous les boutons de réponse
    optionButtons.forEach(button => {
        button.disabled = true;
        
        // Vérifier si le bouton correspond à la bonne réponse
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        }
        
        // Vérifier si le bouton correspond à la réponse sélectionnée
        if (button.textContent === selectedOption) {
            if (selectedOption === correctAnswer) {
                button.classList.add('correct');
                score++;

                // Passer à la question suivante après 5 secondes
                setTimeout(() => {
                    nextQuestion();
                }, 1000);
            } else {
                button.classList.add('incorrect');
                // Passer à la question suivante après 5 secondes
                setTimeout(() => {
                    nextQuestion();
                }, 3000);
            }
        }
    });
    

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