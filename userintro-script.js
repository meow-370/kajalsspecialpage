document.addEventListener("DOMContentLoaded", function () {
    const textChunks = [
        "What's the date today",
        "Ah, It's December 29th...",
        "But What makes this day so extraordinary ?",
        "Wellll...",
        "It's the day when...",
        "Perfection and grace",
        "Decided to take a human form",
        "When beauty finally found it's home",
        "When the gods and angels alike",
        "And the angels",
        "Joined with reverence and care",
        "To craft the most divine creation ",
        "The universe itself stood still,",
        "In awe of this radiant beauty--",
        "KAJAL",
    ];

    const textContainer = document.getElementById("text-container");
    const skipBtn = document.getElementById("skip-btn");  // Skip button reference
    let currentChunkIndex = 0;
    let skipRequested = false; // To track if the intro is skipped

    // Skip intro function
    function skipIntro() {
        skipRequested = true;
        window.location.href = "https://meow-370.github.io/kajalsspecialpage/userhp.html"; // Redirect immediately
    }

    // Add event listener to the skip button
    skipBtn.addEventListener("click", skipIntro);

    function showTextChunk() {
        if (skipRequested) return; // Stop the animation if skipped

        if (currentChunkIndex < textChunks.length) {
            const chunk = document.createElement("div");
            chunk.classList.add("fade-text");

            // Glow effect for specific words
            if (textChunks[currentChunkIndex] === "Perfection and grace" || textChunks[currentChunkIndex] === "KAJAL") {
                chunk.classList.add("glow");
            }

            // Grouped emphasis for 'gods' and 'angels'
            if (textChunks[currentChunkIndex] === "When the gods" || textChunks[currentChunkIndex] === "And the angels") {
                chunk.classList.add("group");
            }

            // Emphasis for 'gods' and 'angels' with additional glow
            if (textChunks[currentChunkIndex] === "gods" || textChunks[currentChunkIndex] === "angels") {
                chunk.classList.add("emphasized");
            }

            chunk.textContent = textChunks[currentChunkIndex];
            textContainer.appendChild(chunk);

            setTimeout(() => {
                chunk.classList.add("show");
            }, 100);

            setTimeout(() => {
                chunk.classList.remove("show");
                setTimeout(() => {
                    chunk.remove();
                    currentChunkIndex++;
                    showTextChunk();
                }, 600);  /* Shortened fade-out time */
            }, 2500);  /* Shortened display time */
        } else {
            // After the animation ends, redirect to the user homepage
            window.location.href = "https://meow-370.github.io/kajalsspecialpage/userhp.html"; // Replace this URL with the actual URL of the user homepage
        }
    }

    showTextChunk();
});