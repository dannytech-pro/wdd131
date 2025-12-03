// ============================================
// GLOBAL STATE & VARIABLES
// ============================================

let isDifficultyIntermediate = false;
const NOTES_STORAGE_KEY = 'workoutNotes';

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Retrieves notes from localStorage
 * @returns {Array} Array of note objects
 */
function getNotes() {
    const stored = localStorage.getItem(NOTES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

/**
 * Saves notes to localStorage
 * @param {Array} notes - Array of note objects to save
 */
function saveNotes(notes) {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}

/**
 * Creates a unique ID for notes
 * @returns {string} Unique identifier
 */
function generateNoteId() {
    return `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================
// HAMBURGER MENU FUNCTIONALITY
// ============================================

/**
 * Initializes hamburger menu toggle
 */
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// ============================================
// DIFFICULTY TOGGLE FUNCTIONALITY
// ============================================

/**
 * Toggles workout difficulty between Beginner and Intermediate
 */
function toggleDifficulty() {
    isDifficultyIntermediate = !isDifficultyIntermediate;
    updateDifficultyDisplay();
    saveDifficultyPreference();
}

/**
 * Updates the display of difficulty level and exercise sets/reps
 */
function updateDifficultyDisplay() {
    const difficultyLevel = document.getElementById('difficultyLevel');
    const difficultyInfo = document.getElementById('difficultyInfo');

    if (isDifficultyIntermediate) {
        difficultyLevel.textContent = 'Intermediate';
        if (difficultyInfo) {
            difficultyInfo.textContent = 'Showing intermediate sets and reps. Click the button to switch to beginner.';
        }
        showIntermediateExercises();
    } else {
        difficultyLevel.textContent = 'Beginner';
        if (difficultyInfo) {
            difficultyInfo.textContent = 'Showing beginner-friendly sets and reps. Click the button to switch to intermediate.';
        }
        showBeginnerExercises();
    }
}

/**
 * Shows beginner-level exercise sets and reps
 */
function showBeginnerExercises() {
    const beginnerElements = document.querySelectorAll('.beginner-sets');
    const intermediateElements = document.querySelectorAll('.intermediate-sets');

    beginnerElements.forEach(el => {
        el.style.display = 'block';
    });

    intermediateElements.forEach(el => {
        el.style.display = 'none';
    });
}

/**
 * Shows intermediate-level exercise sets and reps
 */
function showIntermediateExercises() {
    const beginnerElements = document.querySelectorAll('.beginner-sets');
    const intermediateElements = document.querySelectorAll('.intermediate-sets');

    beginnerElements.forEach(el => {
        el.style.display = 'none';
    });

    intermediateElements.forEach(el => {
        el.style.display = 'block';
    });
}

/**
 * Saves difficulty preference to localStorage
 */
function saveDifficultyPreference() {
    localStorage.setItem('difficultyPreference', isDifficultyIntermediate ? 'intermediate' : 'beginner');
}

/**
 * Loads difficulty preference from localStorage
 */
function loadDifficultyPreference() {
    const saved = localStorage.getItem('difficultyPreference');
    if (saved === 'intermediate') {
        isDifficultyIntermediate = true;
        updateDifficultyDisplay();
    }
}

/**
 * Initializes difficulty toggle button
 */
function initDifficultyToggle() {
    const difficultyBtn = document.getElementById('difficultyToggle');
    if (difficultyBtn) {
        difficultyBtn.addEventListener('click', toggleDifficulty);
        loadDifficultyPreference();
    }
}

// ============================================
// NOTES FUNCTIONALITY
// ============================================

/**
 * Renders all notes from localStorage to the DOM
 */
function renderNotes() {
    const notesContainer = document.getElementById('notesContainer');
    if (!notesContainer) return;

    notesContainer.innerHTML = '';
    const notes = getNotes();

    notes.forEach(note => {
        const noteElement = createNoteElement(note);
        notesContainer.appendChild(noteElement);
    });
}

/**
 * Creates a note DOM element
 * @param {Object} note - Note object with id and text properties
 * @returns {HTMLElement} Note element
 */
function createNoteElement(note) {
    const noteItem = document.createElement('div');
    noteItem.className = 'note-item';
    noteItem.setAttribute('data-note-id', note.id);

    const noteInput = document.createElement('input');
    noteInput.type = 'text';
    noteInput.className = 'note-input';
    noteInput.placeholder = 'Enter your note here...';
    noteInput.value = note.text;

    noteInput.addEventListener('change', () => {
        updateNote(note.id, noteInput.value);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-note-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        deleteNote(note.id);
    });

    noteItem.appendChild(noteInput);
    noteItem.appendChild(deleteBtn);

    return noteItem;
}

/**
 * Adds a new note
 */
function addNote() {
    const notes = getNotes();
    const newNote = {
        id: generateNoteId(),
        text: ''
    };

    notes.push(newNote);
    saveNotes(notes);
    renderNotes();

    // Focus on the new input
    const inputs = document.querySelectorAll('.note-input');
    if (inputs.length > 0) {
        inputs[inputs.length - 1].focus();
    }
}

/**
 * Updates an existing note
 * @param {string} noteId - ID of the note to update
 * @param {string} newText - New text content
 */
function updateNote(noteId, newText) {
    const notes = getNotes();
    const noteIndex = notes.findIndex(n => n.id === noteId);

    if (noteIndex !== -1) {
        notes[noteIndex].text = newText;
        saveNotes(notes);
    }
}

/**
 * Deletes a note
 * @param {string} noteId - ID of the note to delete
 */
function deleteNote(noteId) {
    const notes = getNotes();
    const filteredNotes = notes.filter(n => n.id !== noteId);
    saveNotes(filteredNotes);
    renderNotes();
}

/**
 * Initializes the notes feature
 */
function initNotes() {
    const addNotesBtn = document.getElementById('addNotesBtn');
    if (addNotesBtn) {
        addNotesBtn.addEventListener('click', addNote);
        renderNotes();
    }
}

// ============================================
// CTA BUTTON FUNCTIONALITY
// ============================================

/**
 * Initializes CTA button to scroll to workouts
 */
function initCTAButton() {
    const ctaButton = document.getElementById('ctaButton');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const workoutSection = document.querySelector('.workout-overview');
            if (workoutSection) {
                workoutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initializes all page features
 */
function initializeApp() {
    initHamburgerMenu();
    initDifficultyToggle();
    initNotes();
    initCTAButton();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// ============================================
// ADDITIONAL UTILITIES
// ============================================

/**
 * Logs app initialization status (for debugging)
 */
function logAppStatus() {
    console.log(`%cWorkout Planner App Initialized`, 'color: #00BCD4; font-size: 14px; font-weight: bold;');
    console.log(`Difficulty Preference: ${localStorage.getItem('difficultyPreference') || 'Not set'}`);
    console.log(`Saved Notes: ${getNotes().length}`);
}

// Log status after initialization
window.addEventListener('load', logAppStatus);
