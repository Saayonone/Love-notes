// Firebase configuration
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

// Password checking logic
const passwords = {
  koibito: "KoibitoPass", // Password for you
  koi: "KoiPass"          // Password for your girlfriend
};

let currentUser = "";

function checkPassword() {
  const inputPassword = document.getElementById("password").value;
  const wrongPasswordMessage = document.getElementById("wrong-password-message");

  console.log("Entered Password: ", inputPassword); // Debugging line

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

// Store notes in Firebase Firestore (Firebase version)
function loadNotes() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = ""; // Clear the existing notes

  // Get notes from Firebase Firestore
  firebase.firestore().collection('loveNotes').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const note = doc.data();
      const noteItem = document.createElement("div");
      noteItem.className = "note-item";
      noteItem.innerHTML = `<strong>${note.name}</strong>: ${note.text}`;
      notesList.appendChild(noteItem);
    });
  }).catch((error) => {
    console.error("Error getting documents: ", error);
  });
}

function addNote() {
  const newNote = document.getElementById("new-note").value;
  if (newNote) {
    // Add note to Firebase Firestore
    firebase.firestore().collection('loveNotes').add({
      name: currentUser,
      text: newNote
    }).then(() => {
      document.getElementById("new-note").value = "";
      loadNotes();
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
}
