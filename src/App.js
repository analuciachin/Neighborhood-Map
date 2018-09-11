import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListLocations from './ListLocations'
import MapContainer from './MapComponent'
import SearchLocationsHeader from './SearchLocationsHeader'

class App extends Component {

  state = {
    locations: [
      {title: 'Montreal Museum of Fine Arts', name: 'Fine Arts Marker', position: {lat: 45.498511, lng: -73.579365}},
      {title: 'Notre-Dame Basilica (Montreal)', name: 'Notre Dame Marker', position: {lat: 45.504487, lng: -73.556781}},
      {title: 'Montreal Botanical Garden', name: 'Botanical Marker', position: {lat: 45.557619, lng: -73.556947}},
      {title: 'Old Port of Montreal', name: 'Old Port Marker', position: {lat: 45.499981, lng: -73.553378}},
      {title: 'Saint Joseph\'s Oratory', name: 'Oratory Marker', position: {lat: 45.492172, lng: -73.616944}},
      {title: 'Mount Royal', name: 'Mount Royal Marker', position: {lat: 45.501598, lng: -73.593234}},
      {title: 'Olympic Stadium (Montreal)', name: 'Olympic Marker', position: {lat: 45.559774, lng: -73.551483}}            
    ]
  }

  render() {
    return (
      <div className="app">
        <div className="grid-container">
          {/*<SearchLocationsHeader />*/}
          <ListLocations locations={this.state.locations} />
          <MapContainer />
        </div>
      </div>
    );
  }
}

export default App;
