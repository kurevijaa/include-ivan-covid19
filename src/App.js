import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "./images/corona.png";
import Datatable from "./datatable";

function App() {
  const [summaryData, setSummaryData] = useState();
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountryData, setSelectedCountryData] = useState();

  const fetchData = async () => {
    const gottenData = await axios.get("https://api.covid19api.com/summary");
    console.log("data", gottenData.data);
    setSummaryData(gottenData.data);
  };

  const fetchCountries = async () => {
    const gottenCountries = await axios.get(
      "https://api.covid19api.com/countries"
    );
    console.log(gottenCountries.data);
    setAllCountries(gottenCountries.data);
  };

  useEffect(() => {
    fetchData();
    fetchCountries();
  }, []);

  const setCountry = (clickedCountry) => {
    setSelectedCountryData(
      summaryData.Countries.find(
        (country) => country.Country === clickedCountry
      )
    );
  };

  return (
    <div className="App">
      <div class="logo">
        <img id="slika" src={logo} alt="logo" />
      </div>
      <div class="drop">
        <select
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        >
          {allCountries.map((country, key) => (
            <option value={country.Country} key={key}>
              {country.Country}
            </option>
          ))}
        </select>
      </div>

      <div class="podaciwrap">
        <div class="slucajevi" style={{backgroundColor: 'red'}}>
          Ukupan broj slučajeva: {selectedCountryData?.TotalConfirmed}
        </div>
        <div class="slucajevi">
          Ukupan broj smrtnih slučajeva: {selectedCountryData?.TotalDeaths}
        </div>
        <div class="slucajevi">
          Oporavljeni: {selectedCountryData?.TotalRecovered}
        </div>
        <div class="slucajevi">Aktivni: {selectedCountryData?.NewConfirmed}</div>
      </div>

      <div>
        <Datatable summaryData={summaryData} />
      </div>
    </div>
  );
}

export default App;
