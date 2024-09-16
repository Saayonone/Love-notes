const passwords = {
  koibito: "KoibitoPass", // Password for you
  koi: "KoiPass"          // Password for your girlfriend
};

let currentUser = "";

// Check password for accessing notes
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

// Load notes from Firestore database
async function loadNotes() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = ""; // Clear previous notes

  const querySnapshot = await getDocs(collection(window.db, "loveNotes"));
  querySnapshot.forEach((doc) => {
    const note = doc.data();
    const noteItem = document.createElement("div");
    noteItem.className = "note-item";
    noteItem.innerHTML = `<strong>${note.name}</strong> (${note.time}): ${note.text}`;
    notesList.appendChild(noteItem);
  });
}

// Add a new note to Firestore
async function addNote() {
  const newNote = document.getElementById("new-note").value;
  if (newNote) {
    const currentTime = new Date().toLocaleString(); // Get current time

    // Add new note to Firestore
    await addDoc(collection(window.db, "loveNotes"), {
      name: currentUser,
      text: newNote,
      time: currentTime
    });

    document.getElementById("new-note").value = ""; // Clear the input field
    loadNotes(); // Reload notes to show the new one
  }
}
