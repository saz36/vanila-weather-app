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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return ` ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#week-forecast");
  let forecastHTML = `<div class="row">`;
  console.log(response);
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3">
    <div class="card">
    <div class="card-body">
    <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
    <p class="card-text">
    <i class="fa-solid fa-temperature-arrow-up"></i>
    ${Math.round(forecastDay.temp.max)}<span class ="units">°C</span>
    <h6 id ="week-icons"> ${Math.round(forecastDay.temp.day)} 
    <span class ="units-middle">°C 
    <img class="icons" src = "http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" /></h6>
    <h4 id= "descriptionWeek">${forecastDay.weather[0].description}</h4> 
    ${Math.round(forecastDay.temp.min)}<span class ="units">°C</span>
    <i class="fa-solid fa-temperature-arrow-down"></i>  
    </p>            
    </div>
    </div>
    </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
  let weathUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  console.log(coordinates);
  axios.get(weathUrl).then(displayForecast);
}
function showUser(response) {
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#results");
  let tempElement = document.querySelector("#temp-icon");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#pic-icon");
  let sunriseElement = document.querySelector("#Sunrise");
  let sunsetElement = document.querySelector("#Sunset");
  console.log(response);

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
  sunriseElement.innerHTML = formatTime(response.data.sys.sunrise * 1000);
  sunsetElement.innerHTML = formatTime(response.data.sys.sunset * 1000);
  getForecast(response.data.coord);
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

search("london");
