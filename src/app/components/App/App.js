import React, { useState, useEffect } from 'react';
import UrlBuilder from '../UrlBuilder/UrlBuilder';

function App() {
  

  
  return (
    <div>
      <button id="config-close" onClick={handleConfigCloseBtnClick}>
        <img src="./assets/img/x-square-fill.svg" alt="Close" />
      </button>
      <h2>Préférences</h2>
      <select id="ville" onChange={handleSelectChange}>
        {/* Options du dropdown */}
      </select>
  
      {/* Affichage des données de la météo */}
      {meteoData && (
        <div>
          <h3>{selectedCity}</h3>
          <p>Température maximale : {meteoData.daily.temperature_2m_max[0]} °C</p>
          <p>Température minimale : {meteoData.daily.temperature_2m_min[0]} °C</p>
          <p>Date : {meteoData.daily.time[0]}</p>
          <p>Code météo : {meteoData.daily.weathercode[0]}</p>
          <p>Précipitations : {meteoData.hourly.precipitation[0]} mm</p>
          <p>Température : {meteoData.hourly.temperature_2m[0]} °C</p>
          <img src={getWeatherImage(meteoData.daily.weathercode[0])} alt="Weather" />
        </div>
      )}
    </div>
  );
}


export default App();
      
