const hambuger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
document.getElementById("lastModified").textContent = document.lastModified;

hambuger.addEventListener('click', () => {
    hambuger.classList.toggle('active');
    navLinks.classList.toggle('active');
});