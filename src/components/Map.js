import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import classes from '../css/map.module.css';

export class MapContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      lat: 37.773972,
      lng: -122.4194,
      showingInfoWindow: true,
      markers: [],
      activeMarker: {},  
      message:""
    }

  }

  handleMapClick = (map, maps, e) => {
    const { latLng } = e;
    const latitude = e.latLng.lat();
    const longitude = e.latLng.lng();

    this.setState({lat: latitude, lng:longitude});

    this.setState(prevState => ({
      markers: [...prevState.markers, latLng]
    }));


  }

  onMarkerClick = (props, marker, e) => {
    
    const lat = marker.position.lat();
    const lng = marker.position.lng();
    const weatherMessage = `The weather for latitude: ${lat}, longitude: ${lng} is: `
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      message: weatherMessage
    });
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {

    const mapStyles = {
        width: '70%',
        height: '70%',
        
    };

    const infoWindowStyle = {
      color: 'black'
    }
    return (
      <div>
      <h2>Current Weather Conditions by Location</h2>
        <div className={classes.Map}>
            <Map 
                google={this.props.google}
                zoom={10}
                style={mapStyles}
                initialCenter={{
                  lat: this.state.lat,
                  lng: this.state.lng,
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
                  <h4 style={infoWindowStyle}>{this.state.message}</h4>
                  {console.log(this.state.message)}
                </div>
              
            </InfoWindow>
          </Map>
          </div>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'YOUR GOOGLE MAP API KEY'
})(MapContainer);