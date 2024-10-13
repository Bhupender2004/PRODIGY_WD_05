const apiKey = '2e846de9acd4e4ed18d6bce095cd7096';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const form = document.getElementById('location-form');
const input = document.getElementById('location-input');
const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const weatherIcon = document.querySelector('.weather-icon');
const clock = document.getElementById('clock');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = input.value;
    if (location) {
        try {
            const response = await fetch(`${apiUrl}?q=${location}&units=metric&appid=${apiKey}`);
            const weatherData = await response.json();
            updateWeather(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
});

function updateWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = capitalizeFirstLetter(data.weather[0].description);
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    sunrise.textContent = `Sunrise: ${convertUnixToTime(data.sys.sunrise)}`;
    sunset.textContent = `Sunset: ${convertUnixToTime(data.sys.sunset)}`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function convertUnixToTime(unixTime) {
    const date = new Date(unixTime * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Real-time clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000); // Update clock every second
updateClock(); // Initial clock display
