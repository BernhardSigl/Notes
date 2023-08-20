//
// Templates
//
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}
//
// Render
//
titles = [];
notes = [];
garbageCanTitles = [];
garbageCanNotes = [];
load();
function render() {
    let contentInput = document.getElementById('contentInput');
    let contentOutput = document.getElementById('contentOutput');
    contentInput.innerHTML += '';
    contentOutput.innerHTML = '';
    for (let i = 0; i < notes.length; i++) {
        const title = titles[i];
        const note = notes[i];
        contentOutput.innerHTML += /*html*/ `
        <div class="card">
            <b id="deleteTitle">${title}</b><br><br>
            <div class="noteAndGarbageIMG" id="deleteNote">${note}
            <img class="garbageInText" src="./img/trash-can-regular.svg" onclick="deleteNoteAndTitle(${i})"></div>
        </div>`;
    }
}

function addNote() {
    if ((titleField.value == 0) && (noteField.value == 0)) {
        alert('Titel und Notiz eintragen!')
    } else if (noteField.value == 0) {
        alert('Notiz eintragen!');
    } else if (titleField.value == 0) {
        alert('Titel eintragen!');
    } else {
        let titleField = document.getElementById('titleField').value;
        let noteField = document.getElementById('noteField').value;
        titles.push(titleField);
        notes.push(noteField);
        render();
        save();
    }
}
function deleteNoteAndTitle(i) {
    let deleteTitle = titles.splice(i, 1);
    let deleteNote = notes.splice(i, 1);
    garbageCanTitles.push(deleteTitle);
    garbageCanNotes.push(deleteNote);
    render();
    save();
}
function save() {
    let titlesAsText = JSON.stringify(titles);
    let notesAsText = JSON.stringify(notes);
    let deletetTitlesAsText = JSON.stringify(garbageCanTitles);
    let deletetNotesAsText = JSON.stringify(garbageCanNotes);
    localStorage.setItem('titles', titlesAsText);
    localStorage.setItem('notes', notesAsText);
    localStorage.setItem('garbageCanTitles', deletetTitlesAsText);
    localStorage.setItem('garbageCanNotes', deletetNotesAsText);
}
function load() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');
    let deletetTitlesAsText = localStorage.getItem('garbageCanTitles');
    let deletetNotesAsText = localStorage.getItem('garbageCanNotes');
    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
        garbageCanTitles = JSON.parse(deletetTitlesAsText);
        garbageCanNotes = JSON.parse(deletetNotesAsText);
    }
}
function garbage() {
    let garbage = document.getElementById('garbage');
    garbage.innerHTML = '';
    for (let i = 0; i < garbageCanTitles.length; i++) {
        const deleteTitles = garbageCanTitles[i];
        const deleteNotes = garbageCanNotes[i];
        garbage.innerHTML += /*html*/ `
        <div class="card">
            <b id="deleteTitle">${deleteTitles}</b>
            <div class="noteAndGarbageIMG" id="deleteNote">${deleteNotes}
            <img class="garbageInText" src="./img/trash-can-regular.svg" onclick="purgeNoteAndTitle(${i})"></div>
        </div>`;
    }
}
function purgeNoteAndTitle(position) {
    garbageCanTitles.splice(position, 1);
    garbageCanNotes.splice(position, 1);

    save();
    garbage();
}
//
// Burger
//
function showMenu() {
    document.getElementById('menu').classList.add('show-overlay-menu');
}
function closeMenu() {
    document.getElementById('menu').classList.remove('show-overlay-menu');
}

function onMouseOver() {
    document.getElementById('menu').classList.add('show-overlay-menu');
}
function onMouseLeave() {
    document.getElementById('menu').classList.remove('show-overlay-menu');
}