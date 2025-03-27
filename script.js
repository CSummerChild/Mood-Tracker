const moodSelect = document.getElementById('mood');
const noteInput = document.getElementById('note');
const saveButton = document.getElementById('saveMood');
const moodList = document.getElementById('moodList');
const clearButton = document.getElementById('clearMoods');

let moods = JSON.parse(localStorage.getItem('moods')) || [];

function updateMoodList() {
    moodList.innerHTML = '';

    moods.forEach(entry => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${entry.mood}</strong> - ${entry.timestamp}<br>
                        <em>${entry.note ? entry.note : "No note added"}</em>`;
        moodList.appendChild(li);
    });
}

function saveMoods() {
    localStorage.setItem('moods', JSON.stringify(moods));
}
clearButton.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all moods?")) {
        moods = []; // Empty the local array
        localStorage.removeItem('moods'); // Remove stored moods
        updateMoodList(); // Refresh the displayed list
        alert("Moods Cleared!");
    }
});

saveButton.addEventListener('click', async () => {
    const selectedMood = moodSelect.value;
    const timestamp = new Date().toLocaleString();
    const note = noteInput.value.trim();

    moods.push({ mood: selectedMood, timestamp: timestamp, note: note });
    updateMoodList();
    saveMoods();
    noteInput.value = ''; // Clear note input

    // Send data to Google Sheets
    const response = await fetch("https://script.google.com/macros/s/AKfycbyGnznDAdBSvQCRAoyLqNd2NnIZERtqXshKW8rf4FaY/dev", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: selectedMood, note: note }),
    });

    console.log("Data sent to Google Sheets");
});

function sendToGoogleSheets(mood, note) {
    const timestamp = new Date().toLocaleString();
    const data = { mood, note, timestamp };

    fetch("YOUR_WEB_APP_URL_HERE", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(() => console.log("Mood data sent!"))
      .catch(error => console.error("Error:", error));
}

updateMoodList(); // Initial display
