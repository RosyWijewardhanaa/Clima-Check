import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../styles/styles.css";
import img01d from "../../images/01d.png";
import img02d from "../../images/02d.png";
import img03d from "../../images/03d.png";
import img04d from "../../images/04d.png";
import img09d from "../../images/09d.png";
import img10d from "../../images/10d.png";
import img11d from "../../images/11d.png";
import img13d from "../../images/13d.png";
import img50d from "../../images/50d.png";
import img01n from "../../images/01n.png";
import img02n from "../../images/02n.png";
import img10n from "../../images/10n.png";
import imgNA from "../../images/na.png";
import bgR from "../../images/bgr.png";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [fCity, setFCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(imgNA);
  const [temp, setTemp] = useState(0);
  const [bgColor, setBgColor] = useState("#050d32");
  const [validateData, setValidateData] = useState(true);
  const [location, setLocation] = useState({});

  const API_KEY = "Your Key";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=API_KEY`;
    const response = await axios
      .get(url)
      .then(function (resp) {
        console.log("****************** ", resp.data);
        setWeatherData(resp.data);
        setFCity(city);
        setValidateData(true);
      })
      .catch(function (e) {
        setValidateData(false);
        setWeatherIcon(imgNA);
        setBgColor("#050d32");
      });
  };

  useEffect(() => {
    if (weatherData) {
      setTemp(weatherData.main.temp - 273.15);
      let icon = weatherData.weather[0].icon;

      if (icon == "01d") {
        setWeatherIcon(img01d);
        setBgColor("rgb(42 8 59)");
      } else if (icon == "02d") {
        setWeatherIcon(img02d);
        setBgColor("rgb(42 8 59)");
      } else if (icon == "03d" || icon == "03n") {
        setWeatherIcon(img03d);
        setBgColor("rgb(29 10 56)");
      } else if (icon == "04d" || icon == "04n") {
        setWeatherIcon(img04d);
        setBgColor("rgb(29 10 56)");
      } else if (icon == "09d" || icon == "09n") {
        setWeatherIcon(img09d);
        setBgColor("rgb(32 10 56)");
      } else if (icon == "10d") {
        setWeatherIcon(img10d);
        setBgColor("rgb(37 7 57)");
      } else if (icon == "11d" || icon == "11n") {
        setWeatherIcon(img11d);
        setBgColor("rgb(27 10 55)");
      } else if (icon == "13d" || icon == "13n") {
        setWeatherIcon(img13d);
        setBgColor("rgb(15 13 52)");
      } else if (icon == "50d" || icon == "50n") {
        setWeatherIcon(img50d);
        setBgColor("rgb(15 13 52)");
      } else if (icon == "01n") {
        setWeatherIcon(img01n);
        setBgColor("rgb(32 10 56)");
      } else if (icon == "02n") {
        setWeatherIcon(img02n);
        setBgColor("rgb(32 10 56)");
      } else if (icon == "10n") {
        setWeatherIcon(img10n);
        setBgColor("rgb(30 8 54)");
      } else {
        setWeatherIcon(imgNA);
        setBgColor("#050d32");
      }
    } else {
      setWeatherIcon(imgNA);
      setBgColor("#050d32");
    }
  }, [weatherData]);

  const capitalizeWords = (str) => {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  };

  const handleCurrentLocation = async (event) => {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ddd1d91958ea52f6058bc2c7796bcf30`;
          const response = await axios.get(url);
          console.log(response.data.name);
          setWeatherData(response.data);
          setFCity(response.data.name);
          setValidateData(true);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={7} className="wheather-block">
          <Grid className="header">
            <span>
              <span className="gradient-text">CLIMA</span>
              <span className="gradient-text">CHECK</span>
            </span>
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "90px" }}>
            <TextField
              className="search-input"
              id="outlined-basic"
              variant="outlined"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <span className="search-icon-div">
              <SearchIcon onClick={handleSubmit} className="search-icon" />
            </span>
            <span className="search-icon-div">
              <LocationOnIcon
                onClick={handleCurrentLocation}
                className="search-icon"
              />
            </span>
          </Grid>
          <Grid item xs={12}>
            <div>
              <img src={bgR} style={{ width: "480px" }} />
            </div>
          </Grid>
        </Grid>
        <Grid
          item
          xs={5}
          style={{ textAlign: "center" }}
          className="city-wheather-block-grid"
        >
          <Grid
            container
            style={{ backgroundColor: `${bgColor}` }}
            className="city-wheather-block-night gradient-border"
          >
            <Grid item xs={12} style={{ height: "165px" }}>
              <img
                style={{ width: "150px", paddingTop: "50px" }}
                src={weatherIcon}
              />
            </Grid>

            {validateData && (
              <Grid item xs={12} style={{ height: "30px" }}>
                {weatherData && (
                  <span className="temp">{temp.toFixed(1)}&deg;C</span>
                )}
              </Grid>
            )}

            <Grid item xs={12}>
              {!weatherData && (
                <span className="discription">Please Enter a City</span>
              )}
            </Grid>

            <Grid item xs={12}>
              {!validateData && (
                <span className="discription">Invalid City</span>
              )}
            </Grid>

            {validateData && (
              <Grid item xs={12}>
                {weatherData && (
                  <span className="discription">
                    {capitalizeWords(weatherData.weather[0].description)}
                  </span>
                )}
              </Grid>
            )}
            {validateData && (
              <Grid item xs={12}>
                {weatherData && (
                  <span className="city-name">{fCity.toUpperCase()}</span>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Weather;
