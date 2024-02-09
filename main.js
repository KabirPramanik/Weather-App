const apiKey = "f7e311604497b08b5770d2c3b5d8a2a6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


const myAudio =document.querySelector(".myAudio");
// const audioSource=document.querySelector(".audioSource");
const playPauseButton = document.querySelector(".playPauseButton");


function playMusic() {
    playPauseButton.style.display = "block";
    playPauseButton.innerHTML= "⏸️";
    myAudio.currentTime = 0;
    myAudio.play();
}

function pauseMusic() {
    myAudio.pause();
}


async function checkWeather(city) {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display="none";
    }

    var data = await response.json();

    console.log(data);

    // Set the local time
    // const localTime = new Date((data.dt + data.timezone) * 1000);

    // console.log("Local Time:", localTime);
    
    // // Get only the hour from the local time
    // const localHour = localTime.getHours();
    // console.log("Local Hour:", localHour);

    let folderName=  "images";
    let isDay=true;
    // if(localHour>=6 && localHour<=18){
    //     folderName="images";
    //     isDay=true;
    // }
    // else{
    //     folderName="images2";
    //     isDay=false;
    // }




    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".country").innerHTML=data.sys.country;
    document.querySelector(".temparature").innerHTML = data.main.temp + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = `${folderName}/clouds.png`;
        myAudio.src = `sounds/cloudy anuv.mp3`;
    }
    if (data.weather[0].main == "Rain") {
        weatherIcon.src = `${folderName}/rain.png`;
        myAudio.src = `sounds/rain song.mp3`;
    }
    if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = `${folderName}/drizzle.png`;
    }
    if (data.weather[0].main == "Mist") {
        weatherIcon.src = `${folderName}/mist.png`;
    }
    if (data.weather[0].main == "Snow") {
        weatherIcon.src = `${folderName}/snow.png`;
        myAudio.src = `sounds/snow wind.mp3`
    }
    if (data.weather[0].main == "Clear") {
        weatherIcon.src = `${folderName}/clear.png`;
        if(isDay){
            myAudio.src=`sounds/sunny day.mp3`;
        }
        else{
            myAudio.src = `sounds/night clear.mp3`;
        }
            
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    
    playMusic();


}

playPauseButton.addEventListener("click", () => {
    if (myAudio.paused) {
        playPauseButton.innerHTML= "⏸️";
        playMusic();
    } else {
        playPauseButton.innerHTML= "▶️";
        pauseMusic();
    }
});

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);

})
