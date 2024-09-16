// Firebase Configuration (paste your Firebase config here)
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
const db = firebase.firestore();

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

// Load notes from Firebase Firestore
function loadNotes() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  db.collection("loveNotes").orderBy("timestamp", "asc").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const noteData = doc.data();
      const noteItem = document.createElement("div");
      noteItem.className = "note-item";
      noteItem.innerHTML = `<strong>${noteData.name}</strong>: ${noteData.text} <br><small>${new Date(noteData.timestamp).toLocaleString()}</small>`;
      notesList.appendChild(noteItem);
    });
  });
}

// Add a new note to Firebase Firestore
function addNote() {
  const newNote = document.getElementById("new-note").value;
  if (newNote) {
    db.collection("loveNotes").add({
      name: currentUser,
      text: newNote,
      timestamp: new Date().getTime()  // Add timestamp
    }).then(() => {
      document.getElementById("new-note").value = "";
      loadNotes();
    });
  }
}
