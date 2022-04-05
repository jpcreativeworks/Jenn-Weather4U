
function doSearch(searchVal) {
        let cityLocation;
        if (searchVal === undefined) {
            cityLocation = document.getElementById("city-input").value;
        } else {
            cityLocation = searchVal;
        }
        console.log(cityLocation);
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                'X-RapidAPI-Key': '35ab0c20c2msh09b757063fe5943p1774f6jsn6adb7f071aa1'
            }
        };
        
        fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityLocation}%20&days=5`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                document.getElementById("weather-results").innerHTML = "Temp: " + response.current.feelslike_f + "°F";
                document.getElementById("humidity-results").innerHTML = "Humidity: " + response.current.humidity + "%";
                document.getElementById("wind-mph").innerHTML = "Wind: " + response.current.wind_mph + "mph";
                document.getElementById("uv-index").innerHTML = "UV Index: " + response.current.uv;
                document.getElementById("city-name").innerHTML = response.location.name + ", " + response.location.region;
                document.getElementById("local-date").innerHTML = response.forecast.forecastday[0].date;
                
                
            
                fiveDayForecast(response.location.lat, response.location.lon);
                
                
            })
            .catch(err => console.error(err));

}


document.getElementsByClassName('history')[0].addEventListener("click",function(event) {
    event.preventDefault();
    var splitRecall = localStorage.getItem('search-history').split(',');
    document.getElementById("history-listed").innerHTML = '';
    
    for (var i = 0; i < splitRecall.length; i++) {
        console.log(splitRecall[i]);
        document.getElementById("history-listed").innerHTML += '<li>' + splitRecall[i] + '</li>';
        
    }

    // console.log(event);
    // console.log(event.srcElement.innerText);
    // doSearch(event.srcElement.innerText);
})
//search
document.getElementById("search-click").addEventListener("click", function(event) {
    event.preventDefault();
    doSearch(undefined);
    //localStorage.setItem("searchCity", cityLocation);
    var cityLocation = document.getElementById("city-input").value;

    if(localStorage.getItem("search-history")) {
        var previousSearches = localStorage.getItem('search-history');
        
         localStorage.setItem("search-history", previousSearches + ',' + cityLocation);
    } else {
        localStorage.setItem("search-history", cityLocation);        
     };
});


function fiveDayForecast(lat, lon) {
    fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&APPID=7a05364dc885a8a74ed9af73a8a2d7fc&units=imperial`).then(result => {
        return result.json();
    }).then(response => {
        console.log(response);
        response.daily.forEach((day,index)=> {
            let date = new Date(day.dt * 1000);
            console.log(day.dt)
            console.log(index);
            if (index < 5) {
                document.getElementById(`day-${index+1}-date`).innerHTML = date.toDateString();//date.getFullYear()+'/'+date.getMonth()+'/'+date.getDay();
                document.getElementById(`day-${index+1}-uv`).innerHTML = "UV Index: " + day.uvi;
                document.getElementById(`day-${index+1}-wind`).innerHTML = "Wind: " + day.wind_speed;
                document.getElementById(`day-${index+1}-temp`).innerHTML = "Temp: " + day.temp.day + "°F";
                document.getElementById(`day-${index+1}-icon`).innerHTML = "<img src='http://openweathermap.org/img/wn/"+day.weather[0].icon+"@2x.png'>";
            }
        });
    });

}


// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
// 		'X-RapidAPI-Key': '35ab0c20c2msh09b757063fe5943p1774f6jsn6adb7f071aa1'
// 	}
// };

// fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityLocation}%20&days=5', options)
// 	.then(response => response.json())
// 	.then(response => {
//         console.log(response)

//     })

// localStorage.setItem('mailbox-1', 'paper');
// undefined
// localStorage.getItem('mailbox-1')
// 'paper'
// localStorage.setItem('mailbox-1', localStorage.getItem('mailbox-1') + ',paper');
// undefined
// localStorage.getItem('mailbox-1')
// 'paper,paper'
// localStorage.getItem('mailbox-1').split(',')
// (2) ['paper', 'paper']
// for (var i = 0; i < localStorage.getItem('mailbox-1').split(',').length; i++) {
//     document.getElementById("id").innerHTML += <p>ocalStorage.getItem('mailbox-1').split(',')[i]</p>
// VM1432:2 Uncaught SyntaxError: Unexpected token '<'
// 	.catch(err => console.error(err));