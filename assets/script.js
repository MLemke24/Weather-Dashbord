// global variables and query selectors
// api key 

var apiKey = `10dcb627b6bb5b017373a42c98319858` 


// ready function for page load 
    // load styles
    // load search bar
    // load searches from local storage
    


// on click function for search

let  handleSearch = () => {

    let inputBox = document.querySelector("#City")
    let city_name = inputBox.value;
    fiveDay(city_name)
    inputBox.value = ""
    var apiUrl = `HTTPS://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=imperial&appid=${apiKey}`
    fetch(apiUrl).then(function(response){
        if (!response.ok){
            alert("City name not found! You suck")
        } else {
        return response.json();
    }
    }).then(function(data){
        // console.log(data)
        let dailyWeatherContainer = document.querySelector("#daily-weather")
        let date = new Date().toLocaleDateString();
        let main = data.main;
        let temp = Math.floor(main.temp);
        let humidity = main.humidity;
        let windSpeed = data.wind.speed;
        let icon = data.weather[0].icon
        let lat = data.coord.lat;
        console.log(lat)
        let lon = data.coord.lon;
        console.log(lon)
        let getUv = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`
        fetch(getUv).then(function(response){
            console.log(getUv)
            response.json().then(function(data){
            setUv = data.value
            console.log(setUv)
         
        console.log(icon)
        let todayWeather = `
        <h4>${city_name} ${date} </h4>
        <img src="https://openweathermap.org/img/wn/${icon}.png"/>
         <p class="container">Tempature: ${temp}</p>
         <p class="container">Humidity: ${humidity}</p>
         <p class="container">Wind Speed: ${windSpeed}</p>
         <p class="container">UV Index: ${setUv}</p>
        `
        dailyWeatherContainer.innerHTML = todayWeather;

        let savedSearched = document.querySelector("#searched")
        let appendSearches = `
        <li id="cities" class="list-group-item">${city_name}</li>
        `
        savedSearched.innerHTML = appendSearches;
    })
   })  
  }).catch(err => console.log(err))
}

// function to get conditions
    // pass in information from on click
    // parse information and grab key information
    // create and append information to html with variables passed in 

function fiveDay(city_name) {
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&units=imperial&appid=${apiKey}`
    fetch(apiURL).then(function(response){
    response.json().then(function(data){
        // console.log(data)
        document.getElementById("cards").style.display = "flex"
     let boxes = document.querySelectorAll(".weather")
     for (i = 0; i < boxes.length; i++) {
        //  console.log(boxes[i])
         boxes[i].innerHTML = ""
         
      let weatherMain = i * 8 + 3;
    //   console.log(weatherMain)
      let dates = new Date(data.list[weatherMain].dt * 1000)
      let weatherMonth = dates.getMonth() + 1;
      let weatherDays = dates.getDate();
      let weatherYear = dates.getFullYear();
      let fiveTemp = data.list[weatherMain].main.temp;
    //   console.log(fiveTemp)
      let setTemp = Math.floor(fiveTemp)
      let fiveHumid = data.list[weatherMain].main.humidity;
      let setHumid = Math.floor(fiveHumid);
    //   console.log(setTemp)
    //   console.log(weatherMonth, weatherDays, weatherYear)
      let displayDate = document.createElement("h4")
      displayDate.setAttribute("class", "text-dark")
      displayDate.innerHTML = weatherMonth + "/" + weatherDays + "/" + weatherYear;
      boxes[i].appendChild(displayDate)
      let weatherIMG = document.createElement("img")
      weatherIMG.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[weatherMain].weather[0].icon + ".png")
      boxes[i].appendChild(weatherIMG)
      let temp = document.createElement("p")
      temp.setAttribute("class", "text-dark")
      temp.innerHTML = "Temperature: " + setTemp;
      boxes[i].appendChild(temp)
      let humid = document.createElement("p")
      humid.setAttribute("class", "text-dark")
      humid.innerHTML = "Humidity: " + setHumid + "%";
      boxes[i].appendChild(humid)
      
      
     }
        
  })
 })

}
// 5 day forcast function 
    // fetch for that info 
    // parse it 
    // get date, temp and humidity 
    // append that info with bootstrap cards
   

// get current forcast function 
    // set to local storage 
    // hold clear history button

    document.getElementById("search").addEventListener("click", handleSearch)

    // list[1].dt_txt