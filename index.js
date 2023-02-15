function showUser(response) {
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#results");
  let tempElement = document.querySelector("#temp-icon");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  console.log(response.data);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
}

function search(city) {
  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
  let units = "metric";
  let weathUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${apiKey}&units=${units}`;
  axios.get(`${weathUrl}&appid=${apiKey}`).then(showUser);
}
function search1(event) {
  event.preventDefault();
  let city = document.querySelector("#data-input").value;
  search(city);
}

let form = document.querySelector("#user-input");
form.addEventListener("submit", search1);

search("hawaii");
