import { useEffect, useState } from "react";
export default function Forecast() {
  const [forecast, setForecast] = useState({});
  useEffect(() => {
    const forecastApi = async () => {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=albuquerque&units=imperial&appid=ca8c2c7970a09dc296d9b3cfc4d06940"
      );
      const data = await response.json();
      setForecast(data);
    };
    forecastApi();
  }, []);
  console.log(forecast);
  if (Object.keys(forecast).length === 0) {
    // console.log("weather is null");
    return <>...loading</>;
  }

  return (
    <div id="topContainer">
      <div id="forecast-container">
        {forecast?.list?.map((item, index) => {
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
                <h1>{Math.round(item.main.temp)}°F</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
