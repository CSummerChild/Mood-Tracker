const moodSelect = document.getElementById('mood');
const noteInput = document.getElementById('note');
const saveButton = document.getElementById('saveMood');
const moodList = document.getElementById('moodList');

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

saveButton.addEventListener('click', () => {
    const selectedMood = moodSelect.value;
    const timestamp = new Date().toLocaleString();
    const note = noteInput.value.trim();

    moods.push({ mood: selectedMood, timestamp: timestamp, note: note });

    updateMoodList();
    saveMoods();

    noteInput.value = ''; // Clear note input
});

updateMoodList(); // Initial display
