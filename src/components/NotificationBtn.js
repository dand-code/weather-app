import React from 'react';
import iconImage from '../image/logo512.png'
import "../style/App.scss";
import "../style/_weatherState.scss";

function NotificationBtn(props) {

    const actualWeather = props.dataWeather;

//btn event
   const handleNotification = () => {
    Notification.requestPermission().then((result) => {
        if (result === 'granted') {
            sendNotification();
        }
    });
   }
   
    function sendNotification(props) {
        const notifTitle = 'How is the weather now?';
        const notifFeels = `Feels Like: ${actualWeather.main.feels_like}°`;
        const notifActualTemp = `Actual temperature: ${actualWeather.main.temp}°`;
        const notifImg = iconImage;
        const options = {
            body: `${notifFeels} and ${notifActualTemp}`,
            icon: notifImg,
        };
        
        new Notification(notifTitle, options);
        setTimeout(sendNotification, 60000);
    }

  return (
    <button className="main-btn"onClick={handleNotification}>Weather alert</button>
  );
}

export default NotificationBtn;