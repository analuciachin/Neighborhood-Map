import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
/*import logo from './logo.svg';*/
import './App.css';
import './styleGrid.css';
import ListLocations from './ListLocations';
import MapContainer from './MapComponent';
import SearchLocationsHeader from './SearchLocationsHeader';
import MapHeader from './MapHeader';

class App extends Component {
  
  state = {
    query:'',
    locations: [
      {title: 'Montreal Museum of Fine Arts', name: 'Fine Arts Marker', img: require('./images/fine_arts.png'), position: {lat: 45.498511, lng: -73.579365}},
      {title: 'Notre-Dame Basilica (Montreal)', name: 'Notre Dame Marker', img: require('./images/notre_dame.jpg'), position: {lat: 45.504487, lng: -73.556781}},
      {title: 'Montreal Botanical Garden', name: 'Botanical Marker', img: require('./images/botanical_garden.jpg'), position: {lat: 45.557619, lng: -73.556947}},
      {title: 'Old Port of Montreal', name: 'Old Port Marker', img: require('./images/no_image.png'), position: {lat: 45.499981, lng: -73.553378}},
      {title: 'Saint Joseph\'s Oratory', name: 'Oratory Marker', img: require('./images/no_image.png'), position: {lat: 45.492172, lng: -73.616944}},
      {title: 'Mount Royal', name: 'Mount Royal Marker', img: require('./images/no_image.png'), position: {lat: 45.501598, lng: -73.593234}},
      {title: 'Olympic Stadium (Montreal)', name: 'Olympic Marker', img: require('./images/no_image.png'), position: {lat: 45.559774, lng: -73.551483}}            
    ]
  }
  
  
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  
  render() {
      
    
    return (
      <div className="app">
        <div className="grid-container">
          <div className="search-location-header-component">
            <SearchLocationsHeader />
          </div>
          <div className="map-header-component">
            <MapHeader />
          </div>
          <div className="list-location-component">
            <ListLocations locations={this.state.locations} query={this.state.query} onUpdateQuery={this.updateQuery} />
          </div>
          <div className="map-container-component">
            <MapContainer locations={this.state.locations} query={this.state.query} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
