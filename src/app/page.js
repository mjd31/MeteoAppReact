'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Select from "./components/Select/Select";
import styles from "./page.module.css";
import global from "./globals.css";
import UrlBuilder from "./components/UrlBuilder/UrlBuilder";
import Offcanvas from "./components/Offcanvas/Offcanvas";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cookies from "js-cookie";

export default function Home() {
  const [coord, setCoord] = useState("45.5017/-73.5673");
  const [meteoData, setMeteoData] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherCode, setWeatherCode] = useState(null);
  const [optionsEnabled, setOptionsEnabled] = useState(false);
  const [showDate, setShowDate] = useState(true);
  const [showPrecipitation, setShowPrecipitation] = useState(true);
  const [showMinTemperature, setShowMinTemperature] = useState(true);
  const [showMaxTemperature, setShowMaxTemperature] = useState(true);
  const [showTemperature, setShowTemperature] = useState(true);

  useEffect(() => {
    if (coord) {
      const latLong = coord.split("/");
      const url = UrlBuilder.getUrl("https://api.open-meteo.com/v1/forecast", {
        latitude: latLong[0],
        longitude: latLong[1],
        hourly: ["temperature_2m", "precipitation"],
        daily: ["temperature_2m_min", "temperature_2m_max", "weathercode"],
        timezone: "America/New_York",
      });

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setMeteoData(data);
          const weatherCode = data.daily.weathercode[0];
          setWeatherCode(weatherCode);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }

    // Récupérer les valeurs des cookies
    const optionsEnabledCookie = Cookies.get("optionsEnabled");
    const showDateCookie = Cookies.get("showDate");
    const showPrecipitationCookie = Cookies.get("showPrecipitation");
    const showMinTemperatureCookie = Cookies.get("showMinTemperature");
    const showMaxTemperatureCookie = Cookies.get("showMaxTemperature");
    const showTemperatureCookie = Cookies.get("showTemperature");

    // Initialiser les variables d'état à partir des cookies
    setOptionsEnabled(optionsEnabledCookie === "true");
    setShowDate(showDateCookie === "true");
    setShowPrecipitation(showPrecipitationCookie === "true");
    setShowMinTemperature(showMinTemperatureCookie === "true");
    setShowMaxTemperature(showMaxTemperatureCookie === "true");
    setShowTemperature(showTemperatureCookie === "true");
  }, [coord]);

  //recuperation de la valeur de la ville + label puis mise a jour de l'etat et des coordonnees
  const handleSelectChange = (event) => {
    const cityValue = event.target.value;
    const cityLabel = event.target.options[event.target.selectedIndex].text;
    setSelectedCity(cityLabel);
    setCoord(cityValue);
  };

  //fonction qui permet l'affichage de l'icone correspondant au weatherCode
  function getImage() {
    switch (weatherCode) {
      case 0:
        return "/sun.svg";
      case 1:
      case 2:
      case 3:
        return "/sunCloud.svg";
      case 51:
      case 53:
      case 55:
        return "/cloud.svg";
      case 56:
      case 57:
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
      case 80:
      case 81:
      case 82:
        return "/rain.svg";
      case 95:
      case 96:
        return "/eclair.png";
      default:
        return "/sun.svg";
    }
  }
  //gestion des cookies selon le checkbox coche par l'utilisateur
  const handleOptionsCheckboxChange = (event) => {
    const checked = event.target.checked;
    setOptionsEnabled(checked);
    Cookies.set("optionsEnabled", checked);
  };

  const handleDateCheckboxChange = (event) => {
    const checked = event.target.checked;
    setShowDate(checked);
    Cookies.set("showDate", checked);
  };

  const handlePrecipitationCheckboxChange = (event) => {
    const checked = event.target.checked;
    setShowPrecipitation(checked);
    Cookies.set("showPrecipitation", checked);
  };

  const handleMinTemperatureCheckboxChange = (event) => {
    const checked = event.target.checked;
    setShowMinTemperature(checked);
    Cookies.set("showMinTemperature", checked);
  };

  const handleMaxTemperatureCheckboxChange = (event) => {
    const checked = event.target.checked;
    setShowMaxTemperature(checked);
    Cookies.set("showMaxTemperature", checked);
  };

  const handleTemperatureCheckboxChange = (event) => {
    const checked = event.target.checked;
    setShowTemperature(checked);
    Cookies.set("showTemperature", checked);
  };

  return (
    <main className={styles.main}>
      <Header />

      <div className={styles.param}>
        <Select
          label="Ville"
          options={[
            { label: "Montréal", value: "45.5017/-73.5673" },
            { label: "Québec", value: "46.8139/-71.2080" },
            { label: "Matane", value: "48.8390/-67.5200" },
            { label: "Sherbrooke", value: "45.4000/-71.9000" },
          ]}
          selected={coord}
          onSelectChange={handleSelectChange}
        />

        <Offcanvas title="Configuration des paramètres" btnLabel="">
          <form className={styles.Offcanvas}>
            <ul>
              <li>
                <label>
                  <input
                    type="checkbox"
                    checked={optionsEnabled}
                    onChange={handleOptionsCheckboxChange}
                  />
                  Activer les options
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    checked={showDate}
                    disabled={!optionsEnabled}
                    onChange={handleDateCheckboxChange}
                  />
                  Date
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    checked={showPrecipitation}
                    disabled={!optionsEnabled}
                    onChange={handlePrecipitationCheckboxChange}
                  />
                  Chance de précipitation
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    checked={showMinTemperature}
                    disabled={!optionsEnabled}
                    onChange={handleMinTemperatureCheckboxChange}
                  />
                  Température minimum
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    checked={showMaxTemperature}
                    disabled={!optionsEnabled}
                    onChange={handleMaxTemperatureCheckboxChange}
                  />
                  Température maximum
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    checked={showTemperature}
                    disabled={!optionsEnabled}
                    onChange={handleTemperatureCheckboxChange}
                  />
                  Température actuelle                
                </label>
              </li>
            </ul>
          </form>
        </Offcanvas>
      </div>

      <div className={styles.tempSettings}>
        <Image src={getImage()} alt="Weather Icon" width={100} height={100} />
        <h2>{selectedCity}</h2>
        {showMaxTemperature && (
          <p>Température maximale : {meteoData?.daily.temperature_2m_max[0]} °C</p>
        )}
        {showMinTemperature && (
          <p>Température minimale : {meteoData?.daily.temperature_2m_min[0]} °C</p>
        )}
        {showDate && <p>Date : {meteoData?.daily.time[0]}</p>}
        {showPrecipitation && (
          <p>Précipitations : {meteoData?.hourly.precipitation[0]} mm</p>
        )}
        {showTemperature && (
          <p>Température actuelle: {meteoData?.hourly.temperature_2m[0]} °C</p>
        )}
      </div>

      <Footer></Footer>
    </main>
  );
}



