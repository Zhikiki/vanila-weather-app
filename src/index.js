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

function formatIcon(defaultIcon) {
  if (defaultIcon === "01d" || defaultIcon === "01n") {
    return `fa-solid fa-sun`;
  }
  if (defaultIcon === "02d" || defaultIcon === "02n") {
    return `fa-solid fa-cloud-sun`;
  }
  if (
    defaultIcon === "03d" ||
    defaultIcon === "03n" ||
    defaultIcon === "04d" ||
    defaultIcon === "04n"
  ) {
    return `fa-solid fa-cloud`;
  }

  if (
    defaultIcon === "09d" ||
    defaultIcon === "09n" ||
    defaultIcon === "10d" ||
    defaultIcon === "10n"
  ) {
    return `fa-solid fa-cloud-rain`;
  }

  if (defaultIcon === "11d" || defaultIcon === "11d") {
    return `fa-solid fa-cloud-bolt`;
  }
  if (defaultIcon === "13d" || defaultIcon === "13n") {
    return `fa-solid fa-snowflake`;
  }
  if (defaultIcon === "50d" || defaultIcon === "50n") {
    return `fa-solid fa-cloud`;
  }
}

function displayCurrentTemperature(response) {
  celsiusTemp = response.data.main.temp;
  console.log(celsiusTemp);

  let currentCityElement = document.querySelector("#current-city");
  currentCityElement.innerHTML = response.data.name;

  let currentCityWeatherStatusElement = document.querySelector(
    "#current-city-weather-status"
  );
  currentCityWeatherStatusElement.innerHTML = response.data.weather[0].main;

  let currentCityTemperatureElement = document.querySelector(
    "#current-city-temperature"
  );
  currentCityTemperatureElement.innerHTML = Math.round(celsiusTemp);

  let visibilityElement = document.querySelector("#visibility");
  visibilityElement.innerHTML = Math.round(response.data.visibility / 1000);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let currentDateElement = document.querySelector("#current-date");
  currentDateElement.innerHTML = formatDate(response.data.dt * 1000);

  let currentWeatherIconElement = document.querySelector(
    "#current-weather-icon"
  );
  currentWeatherIconElement.setAttribute(
    "class",
    formatIcon(response.data.weather[0].icon)
  );

  console.log(response.data.weather[0].icon);
}

function searchCity(city) {
  let apiKey = "da6d6b75abd767e257a129a08b4d0f5d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  let currentTemperatureElement = document.querySelector(
    "#current-city-temperature"
  );
  currentTemperatureElement.innerHTML = Math.round(celsiusTemp);

  fahreneitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let currentTemperatureElement = document.querySelector(
    "#current-city-temperature"
  );
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);

  currentTemperatureElement.innerHTML = fahrenheitTemp;

  celsiusLink.classList.remove("active");
  fahreneitLink.classList.add("active");
  //   remove class="acrive" from celsius link
  //   add class="acrive" for fahrenheitLink
}
let celsiusTemp = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahreneitLink = document.querySelector("#fahrenheit-link");
fahreneitLink.addEventListener("click", displayFahrenheitTemp);

searchCity("Kiev");
