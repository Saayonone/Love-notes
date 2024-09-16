// Firebase SDK is initialized in the HTML file, no need for import statements here

const passwords = {
  koibito: "KoibitoPass", // Password for you
  koi: "KoiPass"          // Password for your girlfriend
};

let currentUser = "";

// Function to check the entered password and allow access to love notes
function checkPassword() {
  const inputPassword = document.getElementById("password").value;
  const wrongPasswordMessage = document.getElementById("wrong-password-message");

  if (inputPassword === passwords.koibito) {
    currentUser = "Koibito ♡";
    wrongPasswordMessage.innerHTML = "";
    document.getElementById("password-section").style.display = "none";
    document.getElementById("notes-section").style.display = "block";
    loadNotes(); // Load existing notes after successful password entry
  } else if (inputPassword === passwords.koi) {
    currentUser = "Koi ♡>ω<♡";
    wrongPasswordMessage.innerHTML = "";
    document.getElementById("password-section").style.display = "none";
    document.getElementById("notes-section").style.display = "block";
    loadNotes(); // Load existing notes after successful password entry
  } else {
    wrongPasswordMessage.innerHTML = "Wrong password, try again!";
  }
}

// Load notes from Firebase Firestore
async function loadNotes() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = ""; // Clear existing notes

  try {
    // Fetch all notes from the 'loveNotes' collection in Firestore
    const querySnapshot = await getDocs(collection(db, "loveNotes"));
    querySnapshot.forEach((doc) => {
      const noteItem = document.createElement("div");
      noteItem.className = "note-item";
      noteItem.innerHTML = `<strong>${doc.data().name}</strong>: ${doc.data().text}`;
      notesList.appendChild(noteItem);
    });
  } catch (error) {
    console.error("Error fetching notes: ", error);
  }
}

// Add a new note to Firebase Firestore
async function addNote() {
  const newNote = document.getElementById("new-note").value;
  if (newNote) {
    try {
      // Add a new note document to the 'loveNotes' collection
      await addDoc(collection(db, "loveNotes"), {
        name: currentUser,
        text: newNote
      });
      document.getElementById("new-note").value = ""; // Clear the input after adding the note
      loadNotes(); // Reload the notes to reflect the new note
    } catch (error) {
      console.error("Error adding note: ", error);
    }
  }
}
