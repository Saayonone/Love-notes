// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB6QUxxoIBxtgmBf_AJIchVY1s_QAfnh7I",
  authDomain: "deepaktech-fe70f.firebaseapp.com",
  projectId: "deepaktech-fe70f",
  storageBucket: "deepaktech-fe70f.appspot.com",
  messagingSenderId: "894349316629",
  appId: "1:894349316629:web:ba0643eea58688448f741c",
  measurementId: "G-NS6T8293VR"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics(app);

//My love note codes
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

// Store notes in local storage for simplicity
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('loveNotes')) || [];
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";
  notes.forEach(note => {
    const noteItem = document.createElement("div");
    noteItem.className = "note-item";
    noteItem.innerHTML = `<strong>${note.name}</strong>: ${note.text}`;
    notesList.appendChild(noteItem);
  });
}

function addNote() {
  const newNote = document.getElementById("new-note").value;
  if (newNote) {
    const notes = JSON.parse(localStorage.getItem('loveNotes')) || [];
    notes.push({ name: currentUser, text: newNote });
    localStorage.setItem('loveNotes', JSON.stringify(notes));
    document.getElementById("new-note").value = "";
    loadNotes();
  }
}
