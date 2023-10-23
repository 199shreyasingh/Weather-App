import React, { useState,useEffect } from 'react'
import './WeatherApp.css'
import GoogleButton from 'react-google-button'
import { auth,signOut,signInWithPopup,googleAuthProvider,setPersistence,browserLocalPersistence } from '../Firebase'
import { Button } from '@mui/material'


import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'

export const WeatherApp = () => {

  let api_key = "9f2d8ab5973dcd8b04e235adf471f1c6";

  const [wicon,setWicon] = useState(cloud_icon);

  const [user, setUser] = useState(null);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
    .then(() => {
      // Now, configure Firebase for persistent login
      if (auth.currentUser) {
        setUser(auth.currentUser);
      }
      
    })
    .catch((error) => {
      console.error(error.message);
    });
}, []);


  const search = async () => {
      const element = document.getElementsByClassName("cityInput")[0];
      if(element.value==="")
      {
        alert('Kuch bhi');
        return ;
      }
      if (user){
      
      if (element.value)
      {

      let city= element.value ;
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;

      let response = await fetch(url);
      let data = await response.json();
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = data.main.humidity+" %";
      wind[0].innerHTML = Math.floor(data.wind.speed)+" km/hr";
      temperature[0].innerHTML = Math.floor(data.main.temp)+" °C";
      location[0].innerHTML = data.name;

      if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
      {
        setWicon(clear_icon);
      }
      else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
      {
        setWicon(cloud_icon);
      }
      else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
      {
        setWicon(drizzle_icon);
      }
      else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
      {
        setWicon(drizzle_icon);
      }
      else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
      {
        setWicon(rain_icon);
      }
      else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
      {
        setWicon(rain_icon);
      }
      else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
      {
        setWicon(snow_icon);
      }
      else
      {
        setWicon(clear_icon);
      }
    }
      }
      else{
        alert('Sign In');
      }

  }

  const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };
  
   
  
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const user = result.user;
        
     
        setUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  return (
    <>
            <GoogleButton className='gbtn'  onClick={handleGoogleSignIn} style={{ display: user ? 'none' : 'block' }} />
            <Button className='logout' onClick={handleGoogleSignOut} style={{ display: user ? 'block' : 'none' }}>Logout</Button>
    <div className='container'>
        <div className="top-bar">
        <input type="text" className='cityInput' placeholder='Enter city' onKeyDown={handleKeyPress}/>
            
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">24 °C</div>
        <div className="weather-location">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">18 km/hr</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
