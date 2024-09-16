const webAppUrl = 'https://script.google.com/macros/s/AKfycbz8GhIC-0t572mKIgkkXDdOiw5GEDUy2481Ure80rndF_HnDb6d8kjydSuoBekUecg2sg/exec';  // Replace with your actual URL

let currentUser = "";

function checkPassword() {
  const inputPassword = document.getElementById("password").value;
  const wrongPasswordMessage = document.getElementById("wrong-password-message");

  if (inputPassword === "KoibitoPass") {
    currentUser = "Koibito ♡";
    wrongPasswordMessage.innerHTML = "";
    document.getElementById("password-section").style.display = "none";
    document.getElementById("notes-section").style.display = "block";
    loadNotes();
  } else if (inputPassword === "KoiPass") {
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
  fetch(webAppUrl)  // Fetches the notes from the Google Sheet
    .then(response => response.json())
    .then(data => {
      const notesList = document.getElementById("notes-list");
      notesList.innerHTML = "";
      data.forEach(note => {
        const noteItem = document.createElement("div");
        noteItem.className = "note-item";
        noteItem.innerHTML = `<strong>${note.name}</strong>: ${note.note}`;
        notesList.appendChild(noteItem);
      });
    });
}

function addNote() {
  const newNote = document.getElementById("new-note").value;
  if (newNote) {
    const formData = new FormData();
    formData.append("name", currentUser);
    formData.append("note", newNote);

    fetch(webAppUrl, {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(result => {
      document.getElementById("new-note").value = "";
      loadNotes();  // Reload the notes after adding
    });
  }
}
