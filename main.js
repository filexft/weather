

const api = {
    key: "957c527c0ba25bd76c45ae82d6a2caac",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', (evt) => {
    if(evt.keyCode == 13)
    {
        getResults(searchBox.value);
    }
});

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {return weather.json();}) .then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector('.city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)} <span> °c </span>`;

    let weather_el = document.querySelector(".weather");
    weather_el.innerHTML = weather.weather[0].main;

    let icon_v = "https://openweathermap.org/img/w/" + weather.weather[0].icon +".png";
    let icon = document.querySelector('.icon');
    icon.setAttribute("src", icon_v);

    let min_max = document.querySelector(".min-max");
    min_max.innerHTML = `${Math.round(weather.main.temp_min)} °c / ${Math.round(weather.main.temp_max)} °c`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April",
        "May", "June", "July", "August", "September", "October", 
        "November", "December"];
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}