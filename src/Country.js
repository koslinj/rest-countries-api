import React from 'react'

function Country({ country }) {


  return (
    <div className='country-container'>
      <img src={country.flags.png} alt="flag-png"></img>
      <div className='country-main-info'>
        <h3 style={{marginBottom: "30px"}}>{country.name.common}</h3>
        <div style={{marginBottom: "10px"}}><b>Population:</b> {country.population.toLocaleString('en-US')}</div>
        <div style={{marginBottom: "10px"}}><b>Region:</b> {country.region}</div>
        <div style={{marginBottom: "10px"}}><b>Capital:</b> {country.capital}</div>
      </div>
    </div>
  )
}

export default Country