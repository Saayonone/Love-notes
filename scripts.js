import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const db = getFirestore();

// Two passwords for identifying users
const passwords = {
  koibito: "KoibitoPass", // Password for you
  koi: "KoiPass"          // Password for your girlfriend
};

let currentUser = "";

// Check if the entered password is correct
function checkPassword() {
  const inputPassword = document.getElementById("password").value;
  const wrongPasswordMessage = document.getElementById("wrong-password-message");

  if (inputPassword === passwords.koibito) {
    currentUser = "Koibito ♡";
    wrongPasswordMessage.innerHTML = "";
    document.getElementById("password-section").style.display = "none";
    document.getElementById("notes-section").style.display = "block";
    loadNotes();
  } else if (inputPassword === passwords.koi) {
    currentUser = "Koi ♡>ω<♡";
    wrongPasswordMessage.innerHTML = "";
    document.getElementById("password-section").style.display = "none";
    document.getElementById("notes-section").style.display = "block";
    loadNotes();
  } else {
    wrongPasswordMessage.innerHTML = "Wrong password, try again!";
  }
}

// Load notes from Firestore and display them
async function loadNotes() {
  const querySnapshot = await getDocs(collection(db, "loveNotes"));
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const noteData = doc.data();
    const noteItem = document.createElement("div");
    noteItem.className = "note-item";
    noteItem.innerHTML = `<strong>${noteData.name}</strong>: ${noteData.text}`;
    notesList.appendChild(noteItem);
  });
}

// Add a new note to Firestore
async function addNote() {
  const newNote = document.getElementById("new-note").value;
  if (newNote) {
    try {
      await addDoc(collection(db, "loveNotes"), {
        name: currentUser,
        text: newNote
      });
      document.getElementById("new-note").value = "";
      loadNotes();
    } catch (e) {
      console.error("Error adding note: ", e);
    }
  }
}
