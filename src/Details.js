import React from 'react'
import { useParams } from 'react-router-dom';
import { BsFillMoonFill } from "react-icons/bs"
import { BsArrowLeft } from "react-icons/bs"
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Details({ fetchData, countries }) {

    const params = useParams();

    useEffect(() => {
        fetchData();
    }, [])


    let converted;
    let flag;
    let name;
    let official;
    let population;
    let region;
    let sub;
    let capital;
    let domain;
    let curr = [];
    let lang = [];
    let borders = [];

    countries.forEach(country => {
        if (country.cca3 === params.id) {
            flag = country.flags.png;
            name = country.name.common;
            official = country.name.official;
            population = country.population;
            region = country.region;
            sub = country.subregion;
            capital = country.capital;
            domain = country.tld[0];
            curr = Object.keys(country.currencies);
            lang = Object.values(country.languages);
            borders = country.borders;
        }
    });


    return (
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
            <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/">
                <div className='back-btn'>
                    <BsArrowLeft></BsArrowLeft>
                    Back
                </div>
            </Link>
            <div className='details-container'>
                <img src={flag} alt="flag"></img>
                <div className='right'>
                    <h1>{name}</h1><br></br>
                    <div className='infos'>
                        <div>
                            <p><b>Official Name: </b>{official}</p>
                            <p><b>Popultion: </b>{population}</p>
                            <p><b>Region: </b>{region}</p>
                            <p><b>Sub Region: </b>{sub}</p>
                            <p><b>Capital: </b>{capital}</p>
                        </div>
                        <div>
                            <p><b>Top Level Domain: </b>{domain}</p>
                            <p><b>Currencies: </b>{curr.join(', ')}</p>
                            <p><b>Languages: </b>{lang.join(', ')}</p>
                        </div>
                    </div>
                    <div className='border-container'>
                        <b>Border Countries:</b>
                        {
                            typeof borders !== 'undefined' ? (borders.map((key, id) => {
                                return <Link style={{ color: 'inherit', textDecoration: 'inherit' }} key={id} to={'/' + key}><div className='border-country'>
                                    {
                                        countries.forEach(country => {
                                            if (country.cca3 === key) converted = country.name.common;
                                        })
                                    }
                                    {converted}
                                </div></Link>
                            })) : (
                                <div>No Border Countries...</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details