// --- Mobile Navigation Setup ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Toggle the 'active' class for responsiveness
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// --- Temple Data Array ---
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // --- Additional Temples ---
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
    },
    {
        templeName: "Sapporo Japan",
        location: "Sapporo, Japan",
        dedicated: "2016, August, 21",
        area: 48480,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/sapporo-japan-temple/sapporo-japan-temple-3374-main.jpg"
    },
    
];

// --- Card Generation Function ---
const templeCardsContainer = document.querySelector('#temple-cards');

/**
 * Creates and displays temple cards from a given array of temple objects.
 * @param {Array<Object>} filteredTemples - The array of temples to display.
 */
function createTempleCards(filteredTemples) {
    // Clear the current content
    templeCardsContainer.innerHTML = '';

    filteredTemples.forEach(temple => {
        // Create the elements
        let card = document.createElement('figure');
        let name = document.createElement('h3');
        let location = document.createElement('p');
        let dedicated = document.createElement('p');
        let area = document.createElement('p');
        let img = document.createElement('img');

        // Populate content
        name.textContent = temple.templeName;
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
        dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
        area.innerHTML = `<span class="label">Area:</span> ${temple.area.toLocaleString()} sq ft`;

        img.setAttribute('src', temple.imageUrl);
        img.setAttribute('alt', `${temple.templeName} Temple`);
        // Required for native lazy loading
        img.setAttribute('loading', 'lazy'); 
        
        // Structure the card
        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);
        card.appendChild(img);

        // Append the complete card to the container
        templeCardsContainer.appendChild(card);
    });
}

// Initial call to display all temples when the page loads
createTempleCards(temples);

// --- Filtering and Navigation Logic ---
const filterLinks = document.querySelectorAll('nav a');
const mainTitle = document.querySelector('main h2');

filterLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); 
        
        // Close the mobile menu after selection
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');

        const filter = event.target.textContent;
        let filteredTemples = [];

        switch (filter) {
            case 'Old':
                // Temples built before 1900
                filteredTemples = temples.filter(t => {
                    const year = new Date(t.dedicated).getFullYear();
                    return year < 1900;
                });
                break;
            case 'New':
                // Temples built after 2000
                filteredTemples = temples.filter(t => {
                    const year = new Date(t.dedicated).getFullYear();
                    return year > 2000;
                });
                break;
            case 'Large':
                // Temples larger than 90,000 square feet
                filteredTemples = temples.filter(t => t.area > 90000);
                break;
            case 'Small':
                // Temples smaller than 10,000 square feet
                filteredTemples = temples.filter(t => t.area < 10000);
                break;
            case 'Home':
            default:
                // Displays all temples
                filteredTemples = temples; 
                break;
        }

        // Re-render the temple cards with the filtered list
        createTempleCards(filteredTemples);

        // Update the header/title to show the active filter
        mainTitle.textContent = `${filter} Temples`;
    });
});

// --- Footer Management ---
// 1. Footer copyright year
document.querySelector('#current-year').textContent = new Date().getFullYear();

// 2. Footer last modified date (using #last-modified ID)
document.querySelector('#last-modified').textContent = document.lastModified;