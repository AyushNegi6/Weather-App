const inpbox = document.querySelector('.inputbox');
const searchbut = document.getElementById('button');

const image = document.querySelector('.img_weather');
const Temprature = document.querySelector('.Temprature');
const Description = document.querySelector('.Description');
const Humidity = document.getElementById('humidity');
const Windspeed = document.getElementById('windspeed');
const location_error = document.querySelector('.so_error');
const weather_body = document.querySelector('.weatherbody')

async function checkWeather(city) {
  const api_key = "5f253c63fa9c29229a7db3d2bbadac4a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
    }

    const weather_data = await response.json();
    console.log('Weather data:', weather_data);

    // Update weather information
    Temprature.innerHTML = `${weather_data.main.temp}` + "°C";
    Description.innerHTML = `${weather_data.weather[0].description}`;
    Humidity.innerHTML = `${weather_data.main.humidity}` + "%";
    Windspeed.innerHTML = `${weather_data.wind.speed}` + "Km/H";

    switch (weather_data.weather[0].main) {
      case 'Clouds':
        image.src = "/img/clouds.png";
        break;
      case 'clear':
        image.src = "/img/clear-sky.png";
        break;
      case 'Rain':
        image.src = "/img/rain.png";
        break;
      case 'Mist':
        image.src = "/img/mist.png";
        break;
      case 'Snow':
        image.src = "/img/snow.png";
        break;
      case 'Smoke':
        image.src = "/img/smog.png";
        break;
    }

    // Hide error message and show weather information
    location_error.style.display = "none";
    weather_body.style.display = "flex";

  } catch (error) {
    console.error('Error fetching or processing weather data:', error);

    // Show error message and hide weather information
    location_error.style.display = "flex";
    weather_body.style.display = "none";
  }
}



searchbut.addEventListener('click',() =>{
  checkWeather(inpbox.value);
});
