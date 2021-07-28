import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';


function App() {
// data
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);


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
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
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

// render aplication
  if(location === false){
    return (
      <Fragment>
        <h2>You need habilit the browser location</h2>
      </Fragment>
    )
  } else if (weather === false) {
    return (
      <Fragment>
        <h2>Load the weather...</h2>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <header>
          <h1>The weather in your location</h1>
        </header>
        
        <main>
          <ul>
            <li>Today: {weather['weather'][0]['description']}</li>
            <li>Feels Like: {weather['main']['feels_like']}°</li>
            <li>Actual temperature: {weather['main']['temp']}°</li>
            <li>Max temperature: {weather['main']['temp_max']}°</li>
            <li>Min Temperature: {weather['main']['temp_min']}°</li>
            <li>Pressure: {weather['main']['pressure']} hpa</li>
            <li>Air humidity: {weather['main']['humidity']}%</li>
          </ul>
          <button onClick={updateWeatherPage}>What's the weather today?</button>
        </main>

      </Fragment>
    );
  }
}
export default App;