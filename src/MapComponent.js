import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {

  //let apiUrl = query => 'http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&titles=${title}'

  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      wikiData: []
    }

    this.locations = [
      {title: 'Montreal Museum of Fine Arts', name: 'Fine Arts Museum Marker', position: {lat: 45.498511, lng: -73.579365}},
      {title: 'Notre-Dame Basilica (Montreal)', name: 'Notre Dame Marker', position: {lat: 45.504487, lng: -73.556781}},
      {title: 'Montreal Botanical Garden', name: 'Botanical Marker', position: {lat: 45.557619, lng: -73.556947}},
      {title: 'Old Port of Montreal', name: 'Old Port Marker', position: {lat: 45.499981, lng: -73.553378}},
      {title: 'Saint Joseph\'s Oratory', name: 'Oratory Marker', position: {lat: 45.492172, lng: -73.616944}},
      {title: 'Mount Royal', name: 'Mount Royal Marker', position: {lat: 45.501598, lng: -73.593234}},
      {title: 'Olympic Stadium (Montreal)', name: 'Olympic Marker', position: {lat: 45.559774, lng: -73.551483}}            
    ];    
  }


  componentDidMount() {

    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=pizza&prop=revisions&rvprop=content&format=json&formatversion=2';
    fetch(proxyurl + url)
    .then(response => response.json())
    .then(body => console.log(body.query.pages[0].revisions[0].content))
    .catch(err => console.log(err))
  }


  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }



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
          
          {this.locations.map((location) => (
            <Marker key={location.title}
              onClick={this.onMarkerClick}
              position={location.position} 
              title={location.title}
              name={location.name}/>
          ))}
          
{/*          <Marker
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
*/}
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
