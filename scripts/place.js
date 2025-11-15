document.getElementById("lastModified").textContent = document.lastModified;

/**
 * @fileoverview Calculates the windchill factor based on temperature and wind speed
 * and updates the value on the webpage.
 */

// --- 1. Static Variables for Temperature and Wind Speed ---
// Based on the metric data provided in the HTML mock-up: 
// Temperature: 10 °C, Wind speed: 5 km/h
const staticTempC = 10; // Temperature in Celsius (°C)
const staticWindSpeedKmh = 5; // Wind speed in Kilometers per hour (km/h)

// --- 2. Wind Chill Calculation Function (Metric) ---
/**
 * Calculates the wind chill factor using the metric formula.
 * Formula: WC = 13.12 + 0.6215T - 11.37(V^0.16) + 0.3965T(V^0.16)
 * @param {number} tempC - Temperature in degrees Celsius.
 * @param {number} windSpeedKmh - Wind speed in kilometers per hour.
 * @returns {number} The calculated wind chill factor in Celsius.
 */
function calculateWindChill(tempC, windSpeedKmh) {
    // The formula implementation in a single return line
    return 13.12 + (0.6215 * tempC) - (11.37 * Math.pow(windSpeedKmh, 0.16)) + (0.3965 * tempC * Math.pow(windSpeedKmh, 0.16));
}


// --- 3. Function to Check Conditions and Update DOM ---
document.addEventListener('DOMContentLoaded', () => {
    // Viability Check Conditions (Metric)
    const tempConditionMet = staticTempC <= 10; // Temperature must be <= 10°C
    const windConditionMet = staticWindSpeedKmh > 4.8; // Wind speed must be > 4.8 km/h

    // Element to display the result (assuming ID 'windChillValue' is added to the HTML)
    const windChillDisplay = document.getElementById('windChillValue');
    
    // Fallback if the specific ID is not found (find the list item containing 'Wind Chill')
    if (!windChillDisplay) {
        // Attempt to find the specific list item in the Weather card
        const weatherCard = document.querySelector('.weather-card');
        if (weatherCard) {
            const listItem = Array.from(weatherCard.querySelectorAll('li')).find(li => li.textContent.includes('Wind Chill'));
            if (listItem) {
                // If found, we'll replace the existing value after the colon.
                // NOTE: This assumes a simple '<span>Text:</span> Value' structure.
                listItem.innerHTML = `<span>Wind Chill:</span> <span id="windChillValue">N/A</span>`;
                const newDisplay = listItem.querySelector('#windChillValue');
                if (newDisplay) {
                    updateDisplay(newDisplay);
                } else {
                    console.error('Could not set up windChillValue span.');
                }
            }
        }
    } else {
        updateDisplay(windChillDisplay);
    }
});


/**
 * Helper function to handle the calculation and DOM update logic.
 * @param {HTMLElement} element - The DOM element where the result will be displayed.
 */
function updateDisplay(element) {
    const tempConditionMet = staticTempC <= 10;
    const windConditionMet = staticWindSpeedKmh > 4.8;

    if (tempConditionMet && windConditionMet) {
        // Conditions met: perform calculation
        const windChillFactor = calculateWindChill(staticTempC, staticWindSpeedKmh);

        // Display the result, rounded to one decimal place, with the unit.
        // We use toFixed(1) for consistent display formatting.
        element.textContent = `${windChillFactor.toFixed(1)}°C`;
    } else {
        // Conditions not met: display "N/A"
        element.textContent = 'N/A';
    }
}