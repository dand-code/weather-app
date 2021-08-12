import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/App.scss";
import "../style/_weatherState.scss";

function App() {
// data
const [location, setLocation] = useState(false);
const [weather, setWeather] = useState(false);
  
//service worker  

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      console.log('Worker registration successful', registration.scope);
    }, function(err) {
      console.log('Worker registration failed', err);
    }).catch(function(err) {
      console.log(err);
    });
  });
} else {
  console.log('Service Worker is not supported by browser.');
}
  
window.addEventListener("beforeinstallprompt", function(e) {
  // log the platforms provided as options in an install prompt
  console.log(e.platforms); // e.g., ["web", "android", "windows"]
  e.userChoice.then(function(choiceResult) {
    console.log(choiceResult.outcome); // either "accepted" or "dismissed"
  });
});
  
/* HANDLE DATA: */

//get user geolocation
  useEffect(() => {
    const geo = navigator.geolocation;
    geo.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  }, []);

// get API information
  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'en',
        units: 'metric'
      }
    });
    console.log(res.data);
    setWeather(res.data);
  }

//reload page
  const updateWeatherPage = () => {
    window.location.reload();
  }

/* RENDER APLICATION */
 
  if(location === false){
    return (
      <div className="page page-loading">
        <h2 className="page-loading_title">We are trying to access your location</h2>
      </div>
    )
  } else if (weather === false) {
    return (
      <div className="page page-loading">
        <h2 className="page-loading_title">Load the weather...</h2>
      </div>
    )
  } else {
    return (
        <div className="page sun">
          <div className="page-status"></div>
          <header className="header">
            <h1>The weather in your location</h1>
          </header>
        
          <main className="main">
          <ul className="main-list">
              <li>Today: <span className="main-list_data">{weather['weather'][0]['description']}</span></li>
              <li>Feels Like:<span className="main-list_data">{weather['main']['feels_like']}°</span></li>
              <li>Actual temperature: <span className="main-list_data">{weather['main']['temp']}°</span></li>
              <li>Max temperature: <span className="main-list_data">{weather['main']['temp_max']}°</span></li>
              <li>Min Temperature: <span className="main-list_data">{weather['main']['temp_min']}°</span></li>
              <li>Pressure: <span className="main-list_data">{weather['main']['pressure']} hpa</span></li>
              <li>Air humidity: <span className="main-list_data">{weather['main']['humidity']}%</span></li>
            </ul>
            <button className="main-btn"onClick={updateWeatherPage}>How's the weather now?</button>
          </main>
          <footer className="footer">
            <p>Made with <i className="fa fa-heart" aria-hidden="true"></i> by <a href="https://github.com/dand-code" target="_blank" rel="noreferrer">dand-code</a></p>
          </footer>
        </div>
    );
  }
};
export default App;