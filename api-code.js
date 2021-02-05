function getWeatherInfo() {
  const city = document.getElementById("city-name-input").value;
  const imgIcon = document.getElementById("icon");
  const cityName = document.getElementById("city-name");
  const weatherCondition = document.getElementById("weather-condition");
  const temperature = document.getElementById("temperature");
  const feltTemperature = document.getElementById("felt-temperature");
  if (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ef53c93ce82e17b8339e5cf153dc16b7`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.cod === "404") {
          cityName.innerText = data.message;
          weatherCondition.innerText = "";
          feltTemperature.innerText = "";
          temperature.innerText = "";
          return;
        }
        cityName.innerText = data.name;
        weatherCondition.innerText = data.weather[0].main;
        feltTemperature.innerText = data.main.feels_like;
        temperature.innerText = data.main.temp;
        imgIcon.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    cityName.innerText = "Please enter a valid name of city";
  }
}
