import "./App.css";
import Weather from "./Components/Weather";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Forecast from "./Components/Forecast";
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Weather />
              </>
            }
          />
          <Route path="/forecast" element={<Forecast />} />
        </Routes>
        <div></div>
      </BrowserRouter>
    </div>
  );
}

export default App;
