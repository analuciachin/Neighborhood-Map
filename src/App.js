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
      {title: 'Montreal Museum of Fine Arts', name: 'Museum of Fine Arts', img: require('./images/fine_arts.png'), articleUrl: 'https://en.wikipedia.org/wiki/Montreal_Museum_of_Fine_Arts', position: {lat: 45.498511, lng: -73.579365}},
      {title: 'Notre-Dame Basilica (Montreal)', name: 'Notre-Dame Basilica', img: require('./images/notre_dame.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Notre-Dame_Basilica_(Montreal)', position: {lat: 45.504487, lng: -73.556781}},
      {title: 'Montreal Botanical Garden', name: 'Botanical Garden', img: require('./images/botanical_garden.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Montreal_Botanical_Garden', position: {lat: 45.557619, lng: -73.556947}},
      {title: 'Old Port of Montreal', name: 'Old Port of Montreal', img: require('./images/old_port.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Old_Port_of_Montreal', position: {lat: 45.499981, lng: -73.553378}},
      {title: 'Saint Joseph\'s Oratory', name: 'Saint Joseph\'s Oratory', img: require('./images/oratory.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Saint_Joseph%27s_Oratory', position: {lat: 45.492172, lng: -73.616944}},
      {title: 'Mount Royal', name: 'Mount Royal Park', img: require('./images/mount_royal.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Mount_Royal', position: {lat: 45.501598, lng: -73.593234}},
      {title: 'Olympic Stadium (Montreal)', name: 'Olympic Stadium', img: require('./images/olympic_stadium.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Olympic_Stadium_(Montreal)', position: {lat: 45.559774, lng: -73.551483}},            
      {title: 'Parc Jean-Drapeau', name: 'Parc Jean-Drapeau', img: '', articleUrl: 'https://en.wikipedia.org/wiki/Parc_Jean-Drapeau', position: {lat: 45.503691, lng: -73.529104}},
      {title: 'Montreal Biosphere', name: 'Biosphere', img: '', articleUrl: 'https://en.wikipedia.org/wiki/Montreal_Biosphere', position: {lat: 45.514229, lng: -73.531342}},
      {title: 'Montreal Biodome', name: 'Biodome', img: '', articleUrl: 'https://en.wikipedia.org/wiki/Montreal_Biodome', position: {lat: 45.559602, lng: -73.54971}},
      {title: 'Montreal Science Centre', name: 'Science Centre', img: '', articleUrl: 'https://en.wikipedia.org/wiki/Montreal_Science_Centre', position: {lat: 45.505106, lng: -73.553282}},
      {title: 'Musée d\'art contemporain de Montréal', name: 'Musée d\'art contemporain', img: '', articleUrl: 'https://en.wikipedia.org/wiki/Mus%C3%A9e_d%27art_contemporain_de_Montr%C3%A9al', position: {lat: 45.507828, lng: -73.56679}}
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
