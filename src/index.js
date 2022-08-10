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

  let visibilityElement = document.querySelector("#visibility");
  visibilityElement.innerHTML = Math.round(response.data.visibility / 1000);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  console.log(response.data);
}

let apiKey = "da6d6b75abd767e257a129a08b4d0f5d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayCurrentTemperature);
