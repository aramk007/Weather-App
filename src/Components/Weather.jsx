export default function Weather() {
  return (
    <div className="main-container">
      <div className="header">
        <button>Weater</button>
        <button>Forecast</button>
      </div>
      <div className="weather-container">
        <div className="left">
          <div className="top-left">
            <h1>Lee Acres</h1>
            <h5>US</h5>
          </div>
          <div className="bottom-left">
            <h1>
              02:30:47 <br />
              <h1 id="date">Thu Feb 15 2024</h1>
            </h1>
            <h1>40°F</h1>
          </div>
        </div>
        <div className="right">
          <div className="logo">
            <img id="logo" src="/sun.webp" alt="" />
          </div>

          <div className="search-div">
            <h1>Clear</h1>

            <input
              type="search"
              placeholder="Search City"
              name=""
              id="search"
            />
          </div>
          <h3 id="clearSky">Clear Sky</h3>
          <hr />
          <div id="feelsLike">
            <h5>Feels Like</h5>
            <h5>34°F</h5>
          </div>
          <hr />
          <div id="humidity">
            <h5>Humidity</h5>
            <h5>48%</h5>
          </div>
          <hr />
          <div id="visibility">
            <h5>Visibility</h5>
            <h5>10000</h5>
          </div>
          <hr />
          <div id="windSpeed">
            <h5>Wind Speed</h5>
            <h5>5 Mph</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
