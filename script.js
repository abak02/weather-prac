
showWeatherInfo(23.7644025, 90.389015);
const searchButton = document.getElementById("search-button");
let lat, lon;
searchButton.addEventListener("click", () => {
    const searchBar = document.getElementById("search");
    let cityName = searchBar.value;
    console.log(cityName);
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + `${cityName}` + "&limit=1&appid=a9938709d8b445590d2178e3200fd17c")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            lat = data[0].lat;
            lon = data[0].lon;
            showWeatherInfo(lat, lon);
            console.log(lat, lon);
        })
});

function showWeatherInfo(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a9938709d8b445590d2178e3200fd17c`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const temp = document.getElementById("temperature");
            temp.innerText = ((data.main.temp) - 273.16).toFixed(2);
            const feelsLike = document.getElementById("feels-like");
            feelsLike.innerText = ((data.main.feels_like) - 273.16).toFixed(2);
            const weatherMain = document.getElementById("weather-main");
            weatherMain.innerText = data.weather[0].main;
            const icon = document.getElementById("icon");
            icon.src = "https://openweathermap.org/img/wn/" + `${data.weather[0].icon}` + "@2x.png"
            const country = document.getElementById("country");
            country.innerText = data.name + ", " + data.sys.country;

            const clouds = document.getElementById("clouds");
            clouds.innerText = data.clouds.all;
            const sunrise = document.getElementById("sunrise");
            
            var date = new Date(data.sys.sunrise * 1000);
            var hours = date.getHours();

           
            var minutes = date.getMinutes();

         
            var seconds = date.getSeconds();
            sunrise.innerText = hours + ":"+minutes + ":" + seconds;
            const wind = document.getElementById("wind");
            wind.innerText = data.wind.speed;

            const humidity = document.getElementById("humidity");
            humidity.innerText = data.main.humidity;
        })
}

