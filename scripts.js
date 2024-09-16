// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6QUxxoIBxtgmBf_AJIchVY1s_QAfnh7I",
  authDomain: "deepaktech-fe70f.firebaseapp.com",
  projectId: "deepaktech-fe70f",
  storageBucket: "deepaktech-fe70f.appspot.com",
  messagingSenderId: "894349316629",
  appId: "1:894349316629:web:680353b6e18f90878f741c",
  measurementId: "G-WQJQ1S5F9F"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let currentUser = "";  // To store current user's name
const passwords = {
  koibito: "KoibitoPass",
  koi: "KoiPass"
};

// Function to check the password and set the user
function checkPassword() {
  const inputPassword = document.getElementById("password").value;
  if (inputPassword === passwords.koibito) {
    currentUser = "Koibito ♡";  // Set name for Koibito
    document.getElementById("password-section").style.display = "none";
    document.getElementById("notes-section").style.display = "block";
    loadNotes();  // Load the notes once password is correct
  } else if (inputPassword === passwords.koi) {
    currentUser = "Koi ♡>ω<♡";  // Set name for Koi
    document.getElementById("password-section").style.display = "none";
    document.getElementById("notes-section").style.display = "block";
    loadNotes();
  } else {
    document.getElementById("wrong-password-message").innerText = "Wrong password, try again!";
  }
}

// Function to add a new note to Firestore
async function addNote() {
  const newNote = document.getElementById("new-note").value;
  if (newNote) {
    // Add the new note to Firestore with user info
    await db.collection("loveNotes").add({
      name: currentUser,    // Add current user's name
      text: newNote,        // The note text
      timestamp: firebase.firestore.FieldValue.serverTimestamp()  // Add timestamp
    });
    document.getElementById("new-note").value = "";  // Clear the input field
    loadNotes();  // Reload notes after adding
  }
}

// Function to load notes from Firestore and display them
async function loadNotes() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";  // Clear the list first

  // Query Firestore to get all love notes ordered by timestamp
  const querySnapshot = await db.collection("loveNotes").orderBy("timestamp", "desc").get();

  // Loop through the notes and display them
  querySnapshot.forEach((doc) => {
    const noteData = doc.data();
    const noteItem = document.createElement("div");
    noteItem.className = "note-item";
    noteItem.innerHTML = `<strong>${noteData.name}</strong>: ${noteData.text}`;
    notesList.appendChild(noteItem);  // Append the note to the list
  });
}
