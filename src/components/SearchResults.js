import React from 'react';
import classes from '../css/results.module.css';

const SearchResults = (props) => {
    return (
        <div className={classes.Wrapper}>

            {props.error && <small className={classes.Small}>Please enter a valid zip code.</small>}

            {props.loading && <div className={classes.Loader} />}


            {props.responseObj.cod === 200 ?
                <div>
                    <p><strong>{props.responseObj.name} ({props.country.split(",")[0]})</strong></p>
                    <p>It is currently {Math.round(props.responseObj.main.temp)} degrees out with {props.responseObj.weather[0].description}.</p>
                </div>
            : null
            }
        </div>
    )
}

export default SearchResults;