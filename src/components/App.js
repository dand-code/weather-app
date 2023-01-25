import React, { useState } from 'react';
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
  e.preventDefault();
  e.userChoice.then(function(choiceResult) {
    console.log(choiceResult.outcome); // "accepted" or "dismissed"
  });
});
  
/* HANDLE DATA: */

//get user geolocation

if ('geolocation' in navigator) {
  console.log('geolocation IS available');
  let geo = navigator.geolocation;
  geo.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude, longitude);
    setLocation(true);
  })
}

// get API information
  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: "a1ef9cde27b16473c17b639a11f5ef65",
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

//notification
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
  });

  // function displayNotification() {
  //   if (Notification.permission === 'granted') {
  //     navigator.serviceWorker.getRegistration().then(function(reg) {
  //       let options = {
  //         body: 'Here is a notification body!',
  //         icon: 'images/example.png',
  //         vibrate: [100, 50, 100],
  //         data: {
  //           dateOfArrival: Date.now(),
  //           primaryKey: 1
  //         },
  //         actions: [
  //           {action: 'explore', title: 'Go to the site',
  //             icon: 'images/checkmark.png'},
  //           {action: 'close', title: 'Close notification',
  //             icon: 'images/xmark.png'},
  //         ]
  //       };
  //       reg.showNotification('Keep an eye on the weather today', options);
  //     });
  //   }
  // }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(reg) {
      console.log('Service Worker Registered!', reg);
  
      reg.pushManager.getSubscription().then(function(sub) {
        if (sub === null) {
          // Update UI to ask user to register for Push
          console.log('Not subscribed to push service!');
        } else {
          // We have a subscription, update the database
          console.log('Subscription object: ', sub);
        }
      });
    })
     .catch(function(err) {
      console.log('Service Worker registration failed: ', err);
    });
  }

  // function subscribeUser() {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.ready.then(function(reg) {
  
  //       reg.pushManager.subscribe({
  //         userVisibleOnly: true
  //       }).then(function(sub) {
  //         console.log('Endpoint URL: ', sub.endpoint);
  //       }).catch(function(e) {
  //         if (Notification.permission === 'denied') {
  //           console.warn('Permission for notifications was denied');
  //         } else {
  //           console.error('Unable to subscribe to push', e);
  //         }
  //       });
  //     })
  //   }
  // }

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