function displayCurrentTemperature(response) {
  let currentCityElement = document.querySelector("#current-city");
  currentCityElement.innerHTML = response.data.name;

  let currentCityWeatherStatusElement = document.querySelector(
    "#current-city-weather-status"
  );
  currentCityWeatherStatusElement.innerHTML = response.data.weather[0].main;

  let currentCityTemperatureElement = document.querySelector(
    "#current-city-temperature"
  );
  currentCityTemperatureElement.innerHTML = Math.round(response.data.main.temp);

  console.log(response.data.weather[0].main);
}

let apiKey = "da6d6b75abd767e257a129a08b4d0f5d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayCurrentTemperature);
