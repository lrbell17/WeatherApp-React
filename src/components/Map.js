import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import classes from '../css/map.module.css';
import axios from 'axios';

export class MapContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: true,
      markers: [],
      activeMarker: {},  
      responseObj: {},
      message: ""
    }

  }

  // adds markers when user clicks on map
  handleMapClick = (map, maps, e) => {
    const { latLng } = e;

    this.setState(prevState => ({
      markers: [...prevState.markers, latLng]
    }));


  }

  // expand info window w/ weather data when you click on marker
  onMarkerClick = (props, marker, e) => {
    
    const latitude = marker.position.lat();
    const longitude = marker.position.lng();
    
    this.getWeatherByCoords(latitude, longitude).then((response) => {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        responseObj: response.data,
        message: this.getMessage(response.data)
      });
    })
  }

  // close info window for marker
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  
  // Call OpenWeatherMap API to get weather based on coordinates
  getWeatherByCoords(lat, lng){

    const API_KEY = 'YOUR OPENWEATHERMAP API KEY';

    return axios.get(`http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lng}&appid=${API_KEY}`);

  }


  // Gets readable message from JSON response
  getMessage(responseObj){
  
      const temp = Math.round(responseObj.main.temp);
      const description = responseObj.weather[0].description;

      const message = `It is currently ${temp} degrees out with ${description}`;

      return message;

  }

  render() {

    const mapStyles = {
        width: '70%',
        height: '70%',
    };

    // this.get();
    return (
      <div>
      <h2>Current Weather Conditions by Location</h2>
  
        <div className={classes.Map}>
            <Map 
                google={this.props.google}
                zoom={10}
                style={mapStyles}
                initialCenter={{
                  lat: 37.773972,
                  lng: -122.4194,
                }}         
                onClick = {this.handleMapClick}
            >
             {this.state.markers.map((location, i) => {
              return (
                <Marker
                 key={i}
                  position={{ lat: location.lat(), lng: location.lng() }}
                  onClick = {this.onMarkerClick}
               />
              );
            })}
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <p><strong>{this.state.responseObj.name}</strong></p>
                  <p>{this.state.message}</p>
                </div>
              
            </InfoWindow>
          </Map>
          </div>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'YOUR GOOGLE MAPS API KEY'
})(MapContainer);