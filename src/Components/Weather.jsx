import { useEffect, useState } from "react";
import Clock from "react-live-clock";
import { WeatherSvg } from "weather-icons-animated";

export default function Weather() {
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState(""); // Create useState for icon
  const [error, setError] = useState(false);
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);

  const handleSearch = async (e) => {
    if (e.code === "Enter") {
      // setCityName(e.target.value);
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${e.target.value}&appid=ca8c2c7970a09dc296d9b3cfc4d06940`
      );
      const data = await response.json();
      console.log(data);
      console.log(e.target.value);
      console.log(data[0].lat);
      setLat(data?.[0]?.lat);
      setLon(data[0].lon);
    }
  };

  useEffect(() => {
    const getData = async () => {
      if (lat === 0 && lon === 0) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lon=${position.coords.longitude}&lat=${position.coords.latitude}&units=imperial&appid=ca8c2c7970a09dc296d9b3cfc4d06940`
              );
              console.log(response);
              const data = await response.json();
              console.log(data);

              if (data.cod === 200) {
                setWeather(data);
                const main = data.weather[0].main;
                if (main === "Clouds" || main === "broken clouds") {
                  setIcon("cloudy");
                } else if (main === "Rain" || main === "Drizzle") {
                  setIcon("rainy");
                } else if (main === "Thunderstorm") {
                  setIcon("lightning-rainy");
                } else if (
                  main === "Haze" ||
                  main === "Fog" ||
                  main === "Dust" ||
                  main === "Smoke"
                ) {
                  setIcon("fog");
                } else {
                  setIcon("sunny");
                }
                setError(false);
              } else {
                setError(true);
              }
              console.log(position);
            },
            (error) => {
              alert("too bad so sad");
            }
          );
        }
      } else {
        const fetchCity = async () => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&units=imperial&appid=ca8c2c7970a09dc296d9b3cfc4d06940`
          );
          console.log(response);
          const data = await response.json();
          console.log(data);

          if (data.cod === 200) {
            setWeather(data);
            const main = data.weather[0].main;
            if (main === "Clouds" || main === "broken clouds") {
              setIcon("cloudy");
            } else if (main === "Rain" || main === "Drizzle") {
              setIcon("rainy");
            } else if (main === "Thunderstorm") {
              setIcon("lightning-rainy");
            } else if (
              main === "Haze" ||
              main === "Fog" ||
              main === "Dust" ||
              main === "Smoke"
            ) {
              setIcon("fog");
            } else {
              setIcon("sunny");
            }
            setError(false);
          } else {
            setError(true);
          }
        };
        fetchCity();
        // (error) => {
        //   alert("too bad so sad");
        // };
      }
    };
    getData();

    sessionStorage.setItem("lat", lat);
    sessionStorage.setItem("lon", lon);
  }, [lon, lat]);

  // checking to see if state is being updated for lat and lon to diagnose why
  // api isn't
  useEffect(() => {
    console.log(lat, lon);
  }, [lat, lon]);

  if (Object.keys(weather).length === 0) {
    // console.log("weather is null");
    return <></>;
  }

  return (
    <div className="main-container">
      <div className="weather-container">
        <div className="left">
          <div className="top-left">
            {!error ? (
              <>
                <h1>{weather.name}</h1>
                <h5>{weather.sys.country}</h5>
              </>
            ) : (
              <>
                <h1>No City Found</h1>
              </>
            )}
          </div>
          <div className="bottom-left">
            <h1>
              <Clock
                format={"hh:mm:A"}
                ticking={true}
                timezone={"US/Mountain"}
              />{" "}
              <br />
              <span id="date">{new Date().toDateString()}</span>
            </h1>
            <h1>{Math.round(weather.main.temp)}°F</h1>
          </div>
        </div>
        <div className="right">
          <div className="logo">
            <div id="logo">
              <WeatherSvg state={icon} width={100} height={100} />
            </div>
          </div>

          <div className="search-div">
            <h1>{weather.weather[0].main}</h1>

            <input
              type="search"
              placeholder="Search City"
              name=""
              id="search"
              onKeyPress={(e) => handleSearch(e)}
            />
          </div>
          <div id="skyAndClouds">
            <h3 id="clearSky">{weather.weather[0].description}</h3>
            <img
              id="icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
          {!error ? (
            <>
              <hr />
              <div id="feelsLike">
                <h5>Feels Like</h5>
                <h5>{Math.round(weather.main.feels_like)}°F</h5>
              </div>
              <hr />
              <div id="humidity">
                <h5>Humidity</h5>
                <h5>{weather.main.humidity}%</h5>
              </div>
              <hr />
              <div id="visibility">
                <h5>Visibility</h5>
                <h5>{weather.visibility}</h5>
              </div>
              <hr />
              <div id="windSpeed">
                <h5>Wind Speed</h5>
                <h5>{Math.round(weather.wind.speed)} Mph</h5>
              </div>
            </>
          ) : (
            <>
              <h1>No City Found</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
