var tem_col2_row1 = document.getElementById("temperate-col2");
var icon_wea_inday = document.querySelector("weather-icon");
var des_wea_inday = document.getElementById("des-wea");
var cityEl = document.getElementById("city");
var feelEl = document.getElementById("temfeel");
var windEl = document.getElementById("wind");
var sunEl = document.getElementById("sun");
var setEl = document.getElementById("set");
var inputEl = document.getElementById("input");
var loop = document.getElementsByClassName("tem1");
var imgloop = document.getElementsByClassName("img_weather");
var imgicon = document.getElementById("weather-icon");
// var img5 = document.getElementsByClassName("icon");
var t2 = document.getElementsByClassName("weathe");
var imagebg = document.getElementById("image");
var date = new Date();
var y = date.getFullYear();
var m = date.getMonth() + 1;
var d = date.getDate();
var dmy = y + "-" + m + "-" + d;
let longitude = 0.0;
let latitude = 0.0;
var city = "";
var x = document.getElementById("notices");
var desc = "";
inputEl.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    city = inputEl.value;
    getreaschcity(city);

    document.getElementById("input").value = "";
    city = "";
  }
});
let key = "442349339c59a7ecb588f0fbe2fd7961";
const weather = {};
weather.temperature = {
  unit: "celsius",
};
// const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// const currentTime = moment().tz(timezone).format();
// console.log(cuzzz)
const lists = {};
lists.temperature = [];
lists.img = [];
lists.des5 = [];
lists.imageicon = [];
lists.dest2 = [];
lists.tomorrow = [];
lists.gettom = [];
lists.day4 = [];
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showposition);
} else {
  x.innerHTML = "Geolocation is not supported by this browser";
}
var days = "",
  months = "";
var setday = new Date(new Date().setDate(new Date().getDate() + 1));
var day = setday.getDate();
var month = setday.getMonth() + 1;
var year = setday.getFullYear();
if (day < 10) {
  days = "0" + day;
} else days = day;
if (month < 10) {
  months = "0" + month;
} else months = month;
var dmy = year + "-" + months + "-" + days;

var days3 = "",
  months3 = "";
var setday3 = new Date(new Date().setDate(new Date().getDate() + 2));
var day3 = setday3.getDate();
var month3 = setday3.getMonth() + 1;
var year3 = setday3.getFullYear();
if (day3 < 10) {
  days3 = "0" + day3;
} else days3 = day3;
if (months3 < 10) {
  months3 = "0" + month3;
} else months3 = month3;
console.log(months3);

var dmy3 = year + "-" + months3 + "-" + days3;
console.log(dmy3);

var days4 = "",
  months4 = "";
var setday4 = new Date(new Date().setDate(new Date().getDate() + 3));

var day4 = setday4.getDate();
var month4 = setday4.getMonth() + 1;
var year = setday4.getFullYear();
if (day4 < 10) {
  days4 = "0" + day4;
} else days4 = day4;
if (month4 < 10) {
  months4 = "0" + month4;
} else months4 = month4;
var dmy4 = year + "-" + months4 + "-" + days4;
console.log(dmy4);
function showposition(pos) {
  longitude = pos.coords.longitude;
  latitude = pos.coords.latitude;
  getweather(longitude, latitude);
  getweather2(longitude, latitude);
}

const kelvin = 273;
function getweather(a, b) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${b}&lon=${a}&appid=${key}`
  )
    .then(function (res) {
      let data = res.json();
      return data;
    })
    .then(function getdata(data) {
      console.log(data);
      weather.city = data.name;
      weather.temperature.value = Math.floor(data.main.temp - kelvin);
      weather.feel = Math.floor(data.main.feels_like - kelvin);
      weather.wind = data.wind.speed;
      weather.icon = data.weather[0].icon;
      weather.sun = data.sys.sunrise;
      weather.set = data.sys.sunset;
      // weather.mainn = data.weather[0].main;
      lists.imageicon[0] = data.weather[0].icon;
      lists.des5[0] = data.weather[0].description;
    })
    .then(function show() {
      console.log(desc);

      cityEl.innerHTML = weather.city;
      tem_col2_row1.innerHTML = `${weather.temperature.value}&#176;C`;
      feelEl.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i>Real Feel: <i>${weather.feel}&#176;C</i>`;
      windEl.innerHTML = `<i class="fa-solid fa-wind"></i>Wind: <i>${weather.wind}km/h</i>`;
      sunEl.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i>Sunrise: <i>${weather.sun}</i>`;
      setEl.innerHTML = `<i class="fa-solid fa-wind"></i>Sunset: <i>${weather.set}</i>`;
      imgicon.innerHTML = `<img src="asset/${weather.icon}.png" alt="">`;
    });
}
function getweather2(a, b) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${b}&lon=${a}&appid=${key}`
  )
    .then(function (res) {
      let data1 = res.json();
      return data1;
    })
    .then(function (data1) {
      //get temper and icon in day+4 day
      let k = 0,
        v = 1;
      weather.desc = data1.list[0].weather[0].description;

      for (var i = 0; i < 40; i++) {
        lists.tomorrow[i] = data1.list[i].dt_txt;
        lists.gettom[i] = lists.tomorrow[i].slice(0, -9);
        if (dmy === lists.gettom[i]) {
          lists.temperature[k] = Math.floor(data1.list[i].main.temp - kelvin);
          lists.img[k] = data1.list[i].weather[0].icon;
          k++;
        }
        if (
          dmy === lists.gettom[i] ||
          dmy3 === lists.gettom[i] ||
          dmy4 === lists.gettom[i]
        ) {
          lists.des5[v] = data1.list[i].weather[0].description;
          lists.imageicon[v] = data1.list[i].weather[0].icon;

          v++;
        }
      }

      console.log(lists.imageicon);

      console.log(lists.tomorrow);

      console.log(data1);
    })
    .then(function show() {
      let u = 2,
        t = 0;
      desc = weather.des;
      if (desc === "broken clouds") {
        imagebg.src = `./asset/cloudy.jpeg`;
      }
      if (desc === "overcast clouds") {
        imagebg.src = `./asset/overcastcloudy.jpeg`;
      }
      // if (desc === "Rain") {
      //   imagebg.src = `./asset/rain.jpeg`;
      // }
      if (desc === "Rain" || "moderate rain") {
        imagebg.src = `./asset/rain.jpeg`;
      }
      if (desc === "thunderstorm with light rain") {
        imagebg.src = "./asset/thunderstorm";
      }
      if (desc === "overcast clouds")
        imagebg.src = "./asset/overcastcloudy.jpeg";
      if (desc === "scattered clouds")
        imagebg.src = "./asset/scattedcloud.jpeg";
      if (desc === "moderate rain") imagebg.src = "./asset/moderate rain.jpeg";
      des_wea_inday.innerHTML = weather.desc;

      for (let i = 0; i < 6; i++) {
        loop[i].innerHTML = `${lists.temperature[u]}&#176;C`;
        imgloop[i].innerHTML = `<img src="asset/${lists.img[u]}.png" alt="" />`;
        // imgloop[i].innerHTML = `${lists.img[i]}.png`;
        u++;
      }
      for (let i = 0; i < 4; i++) {
        t2[
          i
        ].innerHTML = `<img class="icon"src="asset/${lists.imageicon[t]}.png" alt="" >  <p class="p">${lists.des5[t]}</p>`;
        t = t + 7;
      }
    });
}
console.log(lists.temperature);

function getreaschcity(a) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${a}&appid=${key}`)
    .then(function (res) {
      let data1 = res.json();
      return data1;
    })
    .then(function (data1) {
      let k = 0;
      for (var i = 0; i < 40; i++) {
        lists.tomorrow[i] = data1.list[i].dt_txt;
        lists.gettom[i] = lists.tomorrow[i].slice(0, -9);
        if (dmy === lists.gettom[i]) {
          lists.temperature[k] = Math.floor(data1.list[i].main.temp - kelvin);
          lists.img[k] = data1.list[i].weather[0].icon;

          k++;
        }
      }

      // lay data in day
      let j = 0;
      var m = 0;
      for (let i = 0; i < 5; i++) {
        lists.des5[i] = data1.list[m].weather[0].description;
        lists.imageicon[i] = data1.list[m].weather[0].icon;
        m = m + 8;
      }

      console.log(data1);
    })
    .then(function show() {
      let u = 2;
      for (let i = 0; i < 6; i++) {
        loop[i].innerHTML = `${lists.temperature[u]}&#176;C`;
        imgloop[i].innerHTML = `<img src="asset/${lists.img[u]}.png" alt="" />`;
        // imgloop[i].innerHTML = `${lists.img[i]}.png`;
        u++;
      }
      for (let i = 0; i < 5; i++) {
        t2[
          i
        ].innerHTML = `<img class="icon"src="asset/${lists.imageicon[i]}.png" alt="" >  <p class="p">${lists.des5[i]}</p>`;
      }
    });
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${a}&appid=${key}`)
    .then(function (res) {
      let data = res.json();
      return data;
    })
    .then(function getdata(data) {
      console.log(data);
      weather.city = data.name;
      weather.temperature.value = Math.floor(data.main.temp - kelvin);
      weather.des = data.weather[0].description;
      weather.feel = Math.floor(data.main.feels_like - kelvin);
      weather.wind = data.wind.speed;
      weather.icon = data.weather[0].icon;
      weather.sun = data.sys.sunrise;
      weather.set = data.sys.sunset;
      weather.mainn = data.weather[0].main;
    })
    .then(function show() {
      desc = weather.mainn;
      if (desc === "scattered clouds")
        imagebg.src = "./asset/scattedcloud.jpeg";
      if (desc === "Clouds") {
        imagebg.src = `./asset/cloudy.jpeg`;
      }
      if (desc === "Rain" || "moderate rain") {
        imagebg.src = `./asset/rain.jpeg`;
      }
      if (desc === "thunderstorm with light rain") {
        imagebg.src = "./asset/thunderstorm";
      }
      if (desc === "overcast clouds")
        imagebg.src = "./asset/overcastcloudy.jpeg";
      if (desc === "moderate rain") imagebg.src = "./asset/moderate rain.jpeg";
      console.log(desc);

      cityEl.innerHTML = weather.city;
      tem_col2_row1.innerHTML = `${weather.temperature.value}&#176;C`;
      des_wea_inday.innerHTML = weather.des;
      feelEl.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i>Real Feel: <i>${weather.feel}&#176;C</i>`;
      windEl.innerHTML = `<i class="fa-solid fa-wind"></i>Wind: <i>${weather.wind}km/h</i>`;
      sunEl.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i>Sunrise: <i>${weather.sun}</i>`;
      setEl.innerHTML = `<i class="fa-solid fa-wind"></i>Sunset: <i>${weather.set}</i>`;
      imgicon.innerHTML = `<img src="asset/${weather.icon}.png" alt="">`;
    });
}
setInterval(setfunction, 1000);
const container = document.getElementById("container");
function setfunction() {
  for (var i = 0; i <= 7; i++) {
    const divEl = document.createElement("div");
    if (
      desc === "light rain" ||
      desc === "Rain" ||
      desc === "moderate rain" ||
      desc === "thunderstorm with light rain"
    ) {
      divEl.style.backgroundImage = "url('asset/blur.png')";
    }
    divEl.classList.add("snow");
    let leng = Math.floor(Math.random() * 30);
    let lefts = Math.floor(Math.random() * container.clientWidth);
    let tops = Math.floor(Math.random() * 20);
    var blur = Math.floor(Math.random() * 3);
    let time = Math.floor(Math.random() * 5 + 4);

    divEl.style.left = lefts + "px";
    divEl.style.top = -50 + tops + "px";
    divEl.style.with = leng + "px";
    divEl.style.height = leng + "px";
    divEl.style.animationDuration = time + "s";
    divEl.style.backgroundSize = "cover";
    divEl.style.filter = "(blur" + blur + "px)";

    container.appendChild(divEl);
    setTimeout(function () {
      divEl.remove();
    }, 5500);
  }
  for (var i = 0; i <= 5; i++) {
    const divEl = document.createElement("div");

    desc = weather.des;
    if (desc === "Snow") {
      divEl.style.backgroundImage = "url('asset/blur.png')";
    }
    if (
      desc === "light rain" ||
      desc === "Rain" ||
      desc === "moderate rain" ||
      desc === "thunderstorm with light rain"
    ) {
      divEl.style.backgroundImage = "url('asset/blur.png')";
    }
    divEl.classList.add("snow-blur");
    let lefts = Math.floor(Math.random() * container.clientWidth);
    let tops = Math.floor(Math.random() * 20);
    let time = Math.floor(Math.random() * 5) + 5;
    var blur = Math.floor(Math.random() * 3);

    divEl.style.left = lefts + "px";
    divEl.style.top = -70 + tops + "px";
    divEl.style.filter = "(blur" + blur + "px)";

    divEl.style.animationDuration = time + "s";
    divEl.style.backgroundSize = "cover";
    container.appendChild(divEl);
    setTimeout(function () {
      divEl.remove();
    }, 5000);
  }
  for (var i = 0; i < 1; i++) {
    const divEl = document.createElement("div");

    desc = weather.des;
    if (desc === "Snow") {
      divEl.style.backgroundImage = "url('asset/blur.png')";
    }
    if (
      desc === "light rain" ||
      desc === "Rain" ||
      desc === "moderate rain" ||
      desc === "thunderstorm with light rain"
    ) {
      divEl.style.backgroundImage = "url('asset/blur.png')";
    }
    divEl.classList.add("snow-blur");
    let lefts = Math.floor(Math.random() * container.clientWidth);
    let tops = Math.floor(Math.random() * 20);
    let time = Math.floor(Math.random() * 5) + 5;
    divEl.style.left = lefts + "px";
    divEl.style.top = -70 + tops + "px";

    divEl.style.animationDuration = time + "s";
    divEl.style.backgroundSize = "cover";
    container.appendChild(divEl);
    container.appendChild(divEl);
    setTimeout(function () {
      divEl.remove();
    }, 5000);
  }
}
