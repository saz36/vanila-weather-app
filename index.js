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
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = date.getDay();

  return days[day];
}
function displayForecast(response) {
  console.log(response.data.daily[0].time);

  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#week-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-4">
    <div class="card">
    <div class="card-body">
    <h5 class="card-title">${formatDay(forecastDay.time)}</h5>
    <p class="card-text ">
    <i class="fa-solid fa-temperature-arrow-up"></i>
    ${Math.round(forecastDay.temperature.maximum)}<span class ="units">°C</span>
    <h6>TEMPERATURE ${Math.round(forecastDay.temperature.day)}
    <span class ="units">°C<span class ="pipe">|</span>°F</span>
    </h6> 
     ${Math.round(
       forecastDay.temperature.minimum
     )}<span class ="units">°C</span>
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
  let apiKey = "ccedafe30c0o08ea49bb7fb493t06576";
  let weathUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
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

  celciusTemp = response.data.temperature.current;

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  dateElement.innerHTML = formatDate(response.data.time);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "ccedafe30c0o08ea49bb7fb493t06576";
  let units = "metric";
  let weathUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(`${weathUrl}&appid=${apiKey}`).then(showUser);
}
function search1(event) {
  event.preventDefault();
  let city = document.querySelector("#data-input").value;
  search(city);
}
function search2(position) {
  let units = "metric";
  let apiKey = "ccedafe30c0o08ea49bb7fb493t06576";
  let weathUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=${units}`;

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
