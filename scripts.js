const passwords = {
  koibito: "KoibitoPass",
  koi: "KoiPass"
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
