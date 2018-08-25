import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
/*
  var location = [
      {title: 'Montreal Museum of Fine Arts', name: 'Fine Arts Museum Marker', position: {lat: 45.498511, lng: -73.579365}}
      {title: 'Notre-Dame Basilica', name: 'Notre Dame Marker', position: {lat: 45.504487, lng: -73.556781}}
      {title: 'Botanical Garden', name: 'Botanical Marker', position: {lat: 45.557619, lng: -73.556947}}
      {title: 'Old Port of Montreal', name: 'Old Port Marker', position: {lat: 45.499981, lng: -73.553378}}
      {title: 'Saint Joseph Oratory', name: 'Oratory Marker', position: {lat: 45.492172, lng: -73.616944}}
      {title: 'Mount Royal Park', name: 'Mount Royal Marker', position={lat: 45.501598, lng: -73.593234}}
      {title: 'Olympic Stadium', name: 'Olympic Marker', position: {lat: 45.559774, lng: -73.551483}}            
  ];
*/
  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Map
          style={{
            width: "100%",
            height: "100%"
          }}
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: 45.493627,
            lng: -73.584002
          }}
        >
          <Marker
            onClick={this.onMarkerClick}
            position={{lat: 45.498511, lng: -73.579365}}
            title={"Montreal Museum of Fine Arts"}  
            name={"Fine Arts Museum Marker"}    />
          <Marker
            onClick={this.onMarkerClick}
            position={{lat: 45.504487, lng: -73.556781}}
            title={"Notre-Dame Basilica (Montreal)"}
            name={"Notre Dame Marker"}   />
          <Marker
            onClick={this.onMarkerClick}
            position={{lat: 45.557619, lng: -73.556947}}
            title={"Montreal Botanical Garden"}
            name={"Botanical Marker"}   />
          <Marker
            onClick={this.onMarkerClick}
            position={{lat: 45.499981, lng: -73.553378}}
            title={"Old Port of Montreal"}
            name={"Old Port Marker"}    />
          <Marker
            onClick={this.onMarkerClick}
            position={{lat: 45.492172, lng: -73.616944}}
            title={"Saint Joseph's Oratory"}
            name={"Oratory Marker"}    />
          <Marker
            onClick={this.onMarkerClick}
            position={{lat: 45.501598, lng: -73.593234}}
            title={"Mount Royal"}
            name={"Mount Royal Marker"}    />
          <Marker
            onClick={this.onMarkerClick}
            position={{lat: 45.559774, lng: -73.551483}}
            title={"Olympic Stadium (Montreal)"}
            name={"Olympic Marker"}    />

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCJNymTOUduBx5DjMwyDouv8S4H8MZkx-E",
  v: "3"
})(MapContainer);
