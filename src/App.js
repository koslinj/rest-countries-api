import Country from "./Country.js";
import { useState } from "react";
import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs"
import { useRef } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Details from "./Details.js";

function App() {

  const [countries, setCountries] = useState([]);
  const countriesInputRef = useRef();
  const regionRef = useRef();

  const noCountries = countries.status;


  const fetchData = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    setCountries(data);
  }
  useEffect(() => {
    fetchData();
  }, [])

  const searchCountry = async () => {
    const val = countriesInputRef.current.value;
    if (val.trim()) {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${val}`);
        const data = await response.json();
        setCountries(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      fetchData();
    }
  }

  const filterCountry = async () => {
    const val = regionRef.current.value;
    if (val !== 'All') {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/region/${val}`);
        const data = await response.json();
        setCountries(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      fetchData();
    }
  }


  return (
    <Routes>
      <Route path="/" element={
        <>
          <div className="header">
            <h2>Where in the world?</h2>
            <p onClick={() => {
              document.body.classList.toggle("dark");
            }}>
              <BsFillMoonFill />
              Dark mode
            </p>
          </div>
          <div className="search-container">
            <div>
              <input ref={countriesInputRef} className="input" placeholder="Search for a country" onChange={searchCountry}></input>
              <BsSearch className="icon" />
            </div>
            <select ref={regionRef} placeholder="Filter by region" onChange={filterCountry}>
              <option>All</option>
              <option>Africa</option>
              <option>America</option>
              <option>Asia</option>
              <option>Europe</option>
              <option>Oceania</option>
            </select>
          </div>

          <div className='country-list'>
            {
              !noCountries ? (
                countries.map((key, id) => {
                  return <Link key={id} style={{ color: 'inherit', textDecoration: 'inherit' }} to={key.cca3}><Country country={key}></Country></Link>;
                })
              ) : (
                <p style={{ fontSize: "40px" }}>No countries...</p>
              )
            }
          </div>
        </>
      } />
      <Route path="/:id" element={<Details fetchData={fetchData} countries={countries}></Details>} />
    </Routes>
  );
}

export default App;
