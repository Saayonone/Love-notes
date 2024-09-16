import { db, collection, addDoc, getDocs } from './index.html';

const passwords = {
  koibito: "KoibitoPass", // Password for you
  koi: "KoiPass"          // Password for your girlfriend
};

let currentUser = "";

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

// Load notes from Firestore
async function loadNotes() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "loveNotes"));
  querySnapshot.forEach((doc) => {
    const noteItem = document.createElement("div");
    noteItem.className = "note-item";
    noteItem.innerHTML = `<strong>${doc.data().name}</strong>: ${doc.data().text}`;
    notesList.appendChild(noteItem);
  });
}

// Add a new note to Firestore
async function addNote() {
  const newNote = document.getElementById("new-note").value;
  if (newNote) {
    await addDoc(collection(db, "loveNotes"), {
      name: currentUser,
      text: newNote
    });
    document.getElementById("new-note").value = "";
    loadNotes();
  }
}
