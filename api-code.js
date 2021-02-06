// practice of api call and data load in several ways

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
        countryInfo(data.sys.country);

        //  country info will return a promise that can be used in another way
        //     countryInfo(data.sys.country).then((res) => console.log(res));
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    cityName.innerText = "Please enter a valid name of city";
  }
}

//code for country details....   comparatively shorter than previous one
async function countryInfo(countryName) {
  const response = await fetch(
    `https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`
  );
  const data = await response.json();
  const { name, capital, subregion, flag } = data[0];
  const countryDetails = document.getElementById("country-details");

  var detailsInfo = `
   <img  alt="" / src="${flag}" class="w-25 img-fluid">
            <h2 id="country">Country Name : ${name}</h2>
            <h2 id="capital">CApital : ${capital}</h2>
            <h2 id="sub-region">Sub-region : ${subregion}</h2> `;

  countryDetails.innerHTML = detailsInfo;

  //  return data;
  // return data can be used with line no 34
}
