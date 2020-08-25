import React, { useState } from 'react';
import Results from './Results';
import classes from '../css/weather.css';
import axios from 'axios';

const Weather = () => {

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState([]);
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const API_KEY = 'd67d06df24c92f2c394ddc864f842b94';

    function getWeather(e) {
        e.preventDefault();

        if (city.length === 0) {
            return setError(true);
        }
     
        setError(false);
        setResponseObj({});
        
        setLoading(true);
        
        const uriEncodedCity = encodeURIComponent(city);

        axios.get(`http://api.openweathermap.org/data/2.5/weather?units=${unit}&q=${uriEncodedCity}
                &appid=${API_KEY}`)
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
            <h2>Find Current Weather Conditions</h2>
            <form onSubmit={getWeather}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    className={classes.textInput}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
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
            <Results
               responseObj={responseObj}
               error={error}
               loading={loading}
               />
        </div>
    )
}

export default Weather;