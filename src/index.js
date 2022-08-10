function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = weekdays[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  let day = date.getDate();

  return `${weekday} ${hours}:${minutes}, ${month} ${day}`;
}

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

  let currentDateElement = document.querySelector("#current-date");
  currentDateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "da6d6b75abd767e257a129a08b4d0f5d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayCurrentTemperature);
