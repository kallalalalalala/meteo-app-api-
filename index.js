
        const apiKey = '66f6a434271ab6aef3583caf';
        const weatherApiUrl = 'https://api.tomorrow.io/v4/weather';
        const locationApiUrl = 'https://api.tomorrow.io/v4/locations';

        const locationInput = document.getElementById('locationInput');
        const searchButton = document.getElementById('searchButton');
        const locationElement = document.getElementById('location');
        const temperatureElement = document.getElementById('temperature');
        const descriptionElement = document.getElementById('description');

        searchButton.addEventListener('click', () => {
            const location = locationInput.value;
            if (location) {
                fetchLocation(location);
            }
        });

        async function fetchLocation(city) {
            try {
                const response = await fetch(`${locationApiUrl}?apikey=${apiKey}&q=${city}`);
                const data = await response.json();
                if (data.data.length > 0) {
                    const { lat, lon } = data.data[0];
                    fetchWeather(lat, lon);
                } else {
                    locationElement.textContent = 'Ville non trouvée';
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        async function fetchWeather(lat, lon) {
            try {
                const weatherResponse = await fetch(`${weatherApiUrl}?location=${lat},${lon}&apikey=${apiKey}`);
                const weatherData = await weatherResponse.json();

                locationElement.textContent = weatherData.location.name;
                temperatureElement.textContent = `${weatherData.current.temperature}°C`;
                descriptionElement.textContent = weatherData.current.weather[0].description;

            } catch (error) {
                console.error('Error:', error);
            }
        }
