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
            window.location.href = "exclusive-page.html"; // Replace with her exclusive page URL
        }, 2000); // Redirect after 2 seconds
    } else {
        // Wrong answer
        feedback.textContent = "Haha nice try! Go back to 'Someone else' option please.";
        feedback.style.color = "red";
        feedback.classList.remove('hidden');
    }
});

document.getElementById('option2').addEventListener('click', function () {
    // Redirect to the main menu
    window.location.href = "main-menu.html"; // Replace with the general main menu URL
});