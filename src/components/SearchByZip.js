import React, { useState } from 'react';
import SearchResults from './SearchResults';
import classes from '../css/weather.module.css';
import countries from '../Countries';
import axios from 'axios';



const SearchByZip = () => {

    let [zip, setZip] = useState('');
    let [country, setCountry] = useState('United States,US');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState([]);
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const API_KEY = 'YOUR OPENWEATHERMAP API KEY';

    function getWeather(e) {
        e.preventDefault();

        setError(false);
        setResponseObj({});
        setLoading(true);
        
        const countryCode = country.split(",")[1];

        // call OpenWeatherMap API to get data
        axios.get(`http://api.openweathermap.org/data/2.5/weather?units=${unit}&zip=${zip},${countryCode}&appid=${API_KEY}`)
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
            <h2>Current Weather Conditions by Zip Code</h2>
            <form onSubmit={getWeather}>
                <span>
                <input
                    type="text"
                    placeholder="Zip Code"
                    maxLength="50"
                    className={classes.textInput}
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    />
                <select value={country} onChange={(e) => setCountry(e.target.value)} className={classes.dropdown} >
                        {countries.map((country, index) => (
    
                        <option key={country} value={country} defaultValue>
                                    {country.split(",")[0]}, {country.split(",")[1] } 
                        </option>))
                    }  
                </select>
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
               country={country}
               />
            <hr></hr>
        </div>
    )
}

export default SearchByZip;