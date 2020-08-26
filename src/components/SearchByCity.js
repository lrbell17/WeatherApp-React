import React, { useState } from 'react';
import SearchResults from './SearchResults';
import classes from '../css/weather.module.css';
import axios from 'axios';



const SearchByCity = () => {

    let [city, setCity] = useState('');
    let [stateUS, setStateUS] = useState('');
    let [country, setCountry] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState([]);
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const API_KEY = 'YOUR OPENWEATHERMAP API KEY';

    function getWeather(e) {
        e.preventDefault();

        if (city.length === 0 || country.length === 0) {
            return setError(true);
        }
        if (stateUS.length !== 0 && country !== 'us') {
            return setError(true);
        }
        if (stateUS.length === 0 && country === 'us') {
            return setError(true);
        }


        setError(false);
        setResponseObj({});
        
        setLoading(true);
        
        const uriEncodedCity = encodeURIComponent(city);
        const uriEncodedState = encodeURIComponent(stateUS);
        const uriEncodedCountry = encodeURIComponent(country);

        axios.get(`http://api.openweathermap.org/data/2.5/weather?units=${unit}&q=${uriEncodedCity}, ${uriEncodedState}, 
                ${uriEncodedCountry}&appid=${API_KEY}`)
        .then(response => response.data)
        .then(response => {
            if (response.cod !== 200) {
                throw new Error()
            }

            setResponseObj(response);
            setLoading(false);
        })
        .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err.message);
        });

    }
    return (
        <div>
            <h2>Current Weather Conditions by City</h2>
            <form onSubmit={getWeather}>
                <span>
                <input
                    type="text"
                    placeholder="City"
                    maxLength="50"
                    className={classes.textInput}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                <input
                    type="text"
                    placeholder="State (U.S. only)"
                    maxLength="50"
                    className={classes.textInput}
                    value={stateUS}
                    onChange={(e) => setStateUS(e.target.value)}
                    />
                <input
                    type="text"
                    placeholder="Country"
                    maxLength="50"
                    className={classes.textInput}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    />
                </span>
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celcius
                </label>
                <span>  </span>
                <button className={classes.Button} type="submit">Submit</button>
            </form>
            <SearchResults
               responseObj={responseObj}
               error={error}
               loading={loading}
               />
            <hr></hr>
        </div>
    )
}

export default SearchByCity;