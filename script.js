let drawnPattern = [];
const correctPattern = [4, 2, 5, 3]; // Set your unlock pattern here
let isDrawing = false;

// Get all dots
const dots = document.querySelectorAll('.dot');
const patternGrid = document.getElementById('patternGrid');

// Start drawing when touching a dot
function startPattern(event) {
    isDrawing = true;
    drawnPattern = [];
    updatePattern(event.target);
}

// Continue drawing while dragging over dots
function continuePattern(event) {
    if (!isDrawing) return;

    // Get the touched element
    let touch = event.touches ? document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY) : event.target;
    if (touch && touch.classList.contains('dot')) {
        updatePattern(touch);
    }
}

// Add a dot to the pattern if not already selected
function updatePattern(dot) {
    const index = parseInt(dot.dataset.index);
    if (!drawnPattern.includes(index)) {
        drawnPattern.push(index);
        dot.classList.add('active');
    }
}

// Stop drawing and check the pattern
function stopPattern() {
    isDrawing = false;
    if (JSON.stringify(drawnPattern) === JSON.stringify(correctPattern)) {
        window.location.href = "unlocked.html"; // Redirect if pattern is correct
    } else {
        alert("Incorrect pattern! Try again.");
        resetPattern();
    }
}

// Reset the pattern
function resetPattern() {
    drawnPattern = [];
    dots.forEach(dot => dot.classList.remove('active'));
}

// Add event listeners for mouse and touch support
dots.forEach(dot => {
    dot.addEventListener('mousedown', startPattern);
    dot.addEventListener('mouseenter', updatePattern);
});
patternGrid.addEventListener('mouseup', stopPattern);

// Touchscreen support
patternGrid.addEventListener('touchstart', startPattern, { passive: true });
patternGrid.addEventListener('touchmove', continuePattern, { passive: true });
patternGrid.addEventListener('touchend', stopPattern);
