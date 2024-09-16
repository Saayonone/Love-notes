// Initialize Firestore
const db = firebase.firestore();

let currentUser = "";

// Check password and set current user
function checkPassword() {
  const inputPassword = document.getElementById("password").value;
  const wrongPasswordMessage = document.getElementById("wrong-password-message");

  const passwords = {
    koibito: "KoibitoPass", // Replace with your password
    koi: "KoiPass"          // Replace with your girlfriend's password
  };

  if (inputPassword === passwords.koibito) {
    currentUser = "Koibito ♡";
    wrongPasswordMessage.innerHTML = "";
    document.getElementById("password-section").style.display = "none";
    document.getElementById("notes-section").style.display = "block";
    loadNotes(); // Load notes when user is authenticated
  } else if (inputPassword === passwords.koi) {
    currentUser = "Koi ♡>ω<♡";
    wrongPasswordMessage.innerHTML = "";
    document.getElementById("password-section").style.display = "none";
    document.getElementById("notes-section").style.display = "block";
    loadNotes(); // Load notes when user is authenticated
  } else {
    wrongPasswordMessage.innerHTML = "Wrong password, try again!";
  }
}

// Function to add a new note to Firestore
function addNote() {
  const newNote = document.getElementById("new-note").value;
  if (newNote) {
    db.collection("loveNotes").add({
      name: currentUser,
      text: newNote,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      document.getElementById("new-note").value = "";
      loadNotes(); // Reload notes after adding
    }).catch((error) => {
      console.error("Error adding note: ", error);
    });
  }
}

// Function to load notes from Firestore
function loadNotes() {
  db.collection("loveNotes").orderBy("timestamp", "desc").get().then((querySnapshot) => {
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const noteItem = document.createElement("div");
      noteItem.className = "note-item";
      noteItem.innerHTML = `<strong>${doc.data().name}</strong>: ${doc.data().text}`;
      notesList.appendChild(noteItem);
    });
  }).catch((error) => {
    console.error("Error loading notes: ", error);
  });
}
