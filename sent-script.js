// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUUzZBp8JFm4iPvJRcQyVtiXoXGw5uIws",
  authDomain: "website-for-her.firebaseapp.com",
  projectId: "website-for-her",
  storageBucket: "website-for-her.appspot.com",
  messagingSenderId: "222084545714",
  appId: "1:222084545714:web:3e1fec18a077db5980ddab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const startButton = document.getElementById("startButton");
  const mainContent = document.getElementById("mainContent");
  const userNameDisplay = document.getElementById("userName");
  const submitBtn = document.getElementById("submitBtn");
  const messageInput = document.getElementById("message");
  const giftUpload = document.getElementById("giftUpload");
  const canvas = document.getElementById("doodleCanvas");
  const clearDoodleButton = document.getElementById("clearDoodle");
  const ctx = canvas.getContext("2d");

  let isDrawing = false;

  // Start Button functionality
  startButton.addEventListener("click", () => {
    const userName = nameInput.value.trim();
    if (userName) {
      userNameDisplay.textContent = userName;
      document.getElementById("introSection").style.display = "none";
      mainContent.style.display = "block";
    } else {
      alert("Please enter your name to continue!");
    }
  });

  // Doodle functionality
  canvas.addEventListener("mousedown", () => {
    isDrawing = true;
  });

  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mousemove", (event) => {
    if (!isDrawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  });

  clearDoodleButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Submit Button functionality
  submitBtn.addEventListener("click", async () => {
    const userName = nameInput.value.trim();
    const message = messageInput.value.trim();
    const giftFile = giftUpload.files[0];
    const giftType = document.querySelector(".gift-options button.active")?.innerText || null;

    // Convert doodle to base64
    const doodleData = canvas.toDataURL();

    if (!userName || (!message && !giftFile && !giftType && doodleData === canvas.toDataURL("image/png"))) {
      alert("Please provide at least one of: a message, a gift file, a doodle, or a gift type.");
      return;
    }

    let fileURL = null;

    try {
      if (giftFile) {
        const fileRef = ref(storage, `uploads/${Date.now()}_${giftFile.name}`);
        await uploadBytes(fileRef, giftFile);
        fileURL = await getDownloadURL(fileRef);
      }

      // Save to Firestore
      await addDoc(collection(db, "gifts"), {
        name: userName,
        giftType: giftType,
        message: message,
        fileURL: fileURL,
        doodle: doodleData,
        timestamp: new Date().toISOString()
      });

      alert("Your gift has been sent successfully!");
      document.getElementById("gift-form").reset(); // Clear form
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear doodle
    } catch (error) {
      console.error("Error sending gift: ", error);
      alert("Failed to send gift. Please try again.");
    }
  });

  // Gift buttons functionality
  document.querySelectorAll(".gift-options button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".gift-options button").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});