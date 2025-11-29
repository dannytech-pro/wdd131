// Get counter from localStorage
let count = localStorage.getItem('reviewCount') ? parseInt(localStorage.getItem('reviewCount')) : 0;

// Increment counter
count++;
localStorage.setItem('reviewCount', count);

// Display counter
document.getElementById('counter').textContent = count;
