import { useEffect, useState } from "react";
export default function Forecast() {
  const [forecast, setForecast] = useState({});

  const forecastApi = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${lat}&lon=${lon}&exclude=current,hourly,minutely&appid=ca8c2c7970a09dc296d9b3cfc4d06940`
    );
    const data = await response.json();
    setForecast(data);
  };

  useEffect(() => {
    const lattitude = sessionStorage.getItem("lat");
    const longitude = sessionStorage.getItem("lon");
    forecastApi(lattitude, longitude);
  }, []);
  console.log(forecast);
  if (Object.keys(forecast).length === 0) {
    // console.log("weather is null");
    return <>...loading</>;
  }

  return (
    <div id="topContainer">
      <div id="forecast-container">
        {forecast?.daily?.map((item, index) => {
          const forecastDate = new Date(item.dt * 1000);
          return (
            <div key={index} id="forecastDays">
              <h1>{forecastDate.toDateString()}</h1>
              <div id="forecastDetails">
                <img
                  id="icon-forecast"
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt=""
                />
                <h3 id="skysForecast">{item.weather[0].description}</h3>
                <h2>Low: {Math.round(item.temp.min)}°F</h2>
                <h2>High: {Math.round(item.temp.max)}°F</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
