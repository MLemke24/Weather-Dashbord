var apiKey = `10dcb627b6bb5b017373a42c98319858` 

let setHistory;

if(!JSON.parse(localStorage.getItem("city"))){
    setHistory = [];
} else {
    setHistory = JSON.parse(localStorage.getItem("city"))
}

for (i = 0; i < setHistory.length; i++) {
    console.log(setHistory[i].City)
        let savedCities = document.querySelector("#searched")
        let setCities = document.createElement("li")
        setCities.setAttribute("class", "history list-group list-group-flush")
        setCities.setAttribute("style", "border-solid")
        setCities.innerHTML = setHistory[i].City
        savedCities.appendChild(setCities)
}


let  handleSearch = () => {

    let inputBox = document.querySelector("#City")
    let city_name = inputBox.value;
    inputBox.value = ""
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=imperial&appid=${apiKey}`
    fetch(apiUrl).then(function(response){
        if (!response.ok){
            alert("City name not found! You suck")
        } else {
        return response.json();
    }
    }).then(function(data){
        // Set Variables for Data
        let dailyWeatherContainer = document.querySelector("#daily-weather")
        let date = new Date().toLocaleDateString();
        let main = data.main;
        let temp = Math.floor(main.temp);
        let humidity = main.humidity;
        let windSpeed = data.wind.speed;
        let icon = data.weather[0].icon
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        
        let getUv = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`
        fetch(getUv).then(function(response){
          
            response.json().then(function(data){
            setUv = data.value

        let todayWeather = `
        <h4>${city_name} ${date} <img src="https://openweathermap.org/img/wn/${icon}.png"/> </h4>
    
         <p class="container">Tempature: ${temp}</p>
         <p class="container">Humidity: ${humidity}</p>
         <p class="container">Wind Speed: ${windSpeed}</p>
         <p class="container">UV Index: ${setUv}</p>
        `
        dailyWeatherContainer.innerHTML = todayWeather;
        
        let savedCities = document.querySelector("#searched")
        let setCities = document.createElement("li")
        setCities.setAttribute("class", "history list-group list-group-flush")
        setCities.setAttribute("style", "border-solid")
        setCities.innerHTML = city_name
      
        savedCities.appendChild(setCities)

       fiveDay(city_name, todayWeather)

     })
   })  
  }).catch(err => console.log(err))

}


function fiveDay(city_name, todayWeather) {
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&units=imperial&appid=${apiKey}`
    fetch(apiURL).then(function(response){
    response.json().then(function(data){
       
        document.getElementById("cards").style.display = "flex"
     let boxes = document.querySelectorAll(".weather")
     for (i = 0; i < boxes.length; i++) {
       
         boxes[i].innerHTML = ""
         
      let weatherMain = i * 8 + 3;
    
      let dates = new Date(data.list[weatherMain].dt * 1000)
      let weatherMonth = dates.getMonth() + 1;
      let weatherDays = dates.getDate();
      let weatherYear = dates.getFullYear();
      let fiveTemp = data.list[weatherMain].main.temp;
    
      let setTemp = Math.floor(fiveTemp)
      let fiveHumid = data.list[weatherMain].main.humidity;
      let setHumid = Math.floor(fiveHumid);
    
    //   Append Five Day Information Into Boxes
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


     let history = {City: city_name, DailyWeather: todayWeather, fiveDay: boxes}
    //  console.log(history)

   
    let newHistory = [...setHistory, history]
    
    localStorage.setItem('city', JSON.stringify(newHistory))
      
  })
 })

}

    document.getElementById("search").addEventListener("click", handleSearch)

   