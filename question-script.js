document.getElementById('option1').addEventListener('click', function () {
    // Show the question section
    document.getElementById('question-section').classList.remove('hidden');
});

document.getElementById('submit-answer').addEventListener('click', function () {
    const answer = document.getElementById('answer-input').value.trim();
    const feedback = document.getElementById('feedback-message');

    if (answer === "24/11/24") {
        // Correct answer
        feedback.textContent = "Access granted!";
        feedback.style.color = "green";
        feedback.classList.remove('hidden');
        setTimeout(() => {
            window.location.href = "https://www.instagram.com/iblame_sh__"; // Redirect to exclusive page
        }, 2000); // Redirect after 2 seconds
    } else {
        // Wrong answer
        feedback.textContent = "Haha nice try! Go back to 'Someone else' option please.";
        feedback.style.color = "red";
        feedback.classList.remove('hidden');
    }
});

document.getElementById('option2').addEventListener('click', function () {
    // Redirect to the user homepage
    window.location.href = " https://meow-370.github.io/kajalsspecialpage/userintro.html"; // Redirect to user homepage
});