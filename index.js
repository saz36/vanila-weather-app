function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function showUser(response) {
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#results");
  let tempElement = document.querySelector("#temp-icon");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#pic-icon");

  celciusTemp = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
  let units = "metric";
  let weathUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},&units=${units}`;
  axios.get(`${weathUrl}&appid=${apiKey}`).then(showUser);
}
function search1(event) {
  event.preventDefault();
  let city = document.querySelector("#data-input").value;
  search(city);
}
function search2(position) {
  let units = "metric";
  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
  let weathUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}`;

  axios.get(`${weathUrl}&appid=${apiKey}`).then(showUser);
}
function searchLocate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(search2);
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-icon");
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}
function showCelciusTemp(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  let tempElement = document.querySelector("#temp-icon");
  tempElement.innerHTML = Math.round(celciusTemp);
}
let celciusTemp = null;

let button = document.querySelector("#locate");
button.addEventListener("click", searchLocate);

let form = document.querySelector("#user-input");
form.addEventListener("submit", search1);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", showCelciusTemp);

search("hawaii");
