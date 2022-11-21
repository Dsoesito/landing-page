var searchBox: any;

const api = {
  key: "874655141695e4442b46c8613926581d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function localWeather() {
  navigator.geolocation.getCurrentPosition(success, error);
  searchBox.value = "";
}

function success(pos: any) {
  const location = pos.coords;

  fetch(
    `${api.base}weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${api.key}`
  )
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function error(err: any) {
  alert(`${err.message}`);
}

function displayResults(weather: any) {
  const city: HTMLElement = document.querySelector(".location .city") as HTMLElement;
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  const now: Date = new Date();
  const date = document.querySelector(".location .date") as HTMLElement;
  date.innerText = dateBuilder(now);

  const temp = document.querySelector(".current .temp") as HTMLElement;
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  const weatherEl = document.querySelector(".current .weather") as HTMLElement;
  weatherEl.innerText = weather.weather[0].main;

  const locationIcon = document.querySelector(".current .weather-icon") as HTMLElement;
  const { icon } = weather.weather[0];
  locationIcon.innerHTML = `<img src="icons/${icon}.png" />`;

  const hiLow = document.querySelector(".hi-low") as HTMLElement;
  hiLow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
    weather.main.temp_max
  )}°C`;
  searchBox.value = "";
}

function dateBuilder(d: Date) {
  const months = [
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
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

localWeather();
