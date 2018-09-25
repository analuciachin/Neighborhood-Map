import React, { Component } from 'react';
import './App.css';
import './styleGrid.css';
import ListLocations from './ListLocations';
import MapContainer from './MapComponent';
import SearchLocationsHeader from './SearchLocationsHeader';
import MapHeader from './MapHeader';

class App extends Component {

  constructor(props) {
    super(props);
    this.locationClick = this.locationClick.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.state = {
      query:'',
      locations: [
        {title: 'Montreal Museum of Fine Arts', name: 'Museum of Fine Arts', img: require('./images/fine_arts.png'), articleUrl: 'https://en.wikipedia.org/wiki/Montreal_Museum_of_Fine_Arts', position: {lat: 45.498511, lng: -73.579365}},
        {title: 'Notre-Dame Basilica (Montreal)', name: 'Notre-Dame Basilica', img: require('./images/notre_dame.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Notre-Dame_Basilica_(Montreal)', position: {lat: 45.504487, lng: -73.556781}},
        {title: 'Montreal Botanical Garden', name: 'Botanical Garden', img: require('./images/botanical_garden.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Montreal_Botanical_Garden', position: {lat: 45.557619, lng: -73.556947}},
        {title: 'Old Port of Montreal', name: 'Old Port of Montreal', img: require('./images/old_port.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Old_Port_of_Montreal', position: {lat: 45.499981, lng: -73.553378}},
        {title: 'Saint Joseph\'s Oratory', name: 'Saint Joseph\'s Oratory', img: require('./images/oratory.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Saint_Joseph%27s_Oratory', position: {lat: 45.492172, lng: -73.616944}},
        {title: 'Mount Royal', name: 'Mount Royal Park', img: require('./images/mount_royal.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Mount_Royal', position: {lat: 45.501598, lng: -73.593234}},
        {title: 'Olympic Stadium (Montreal)', name: 'Olympic Stadium', img: require('./images/olympic_stadium.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Olympic_Stadium_(Montreal)', position: {lat: 45.559774, lng: -73.551483}},            
        {title: 'Parc Jean-Drapeau', name: 'Parc Jean-Drapeau', img: require('./images/jean_drapeau.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Parc_Jean-Drapeau', position: {lat: 45.503691, lng: -73.529104}},
        {title: 'Montreal Biosphere', name: 'Biosphere', img: require('./images/biosphere.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Montreal_Biosphere', position: {lat: 45.514229, lng: -73.531342}},
        {title: 'Montreal Biodome', name: 'Biodome', img: require('./images/biodome.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Montreal_Biodome', position: {lat: 45.559602, lng: -73.54971}},
        {title: 'Montreal Science Centre', name: 'Science Centre', img: require('./images/science_centre.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Montreal_Science_Centre', position: {lat: 45.505106, lng: -73.553282}},
        {title: 'Musée d\'art contemporain de Montréal', name: 'Musée d\'art contemporain', img: require('./images/mac.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Mus%C3%A9e_d%27art_contemporain_de_Montr%C3%A9al', position: {lat: 45.507828, lng: -73.56679}},
        {title: 'Montreal Casino', name: 'Casino', img: require('./images/casino.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Montreal_Casino', position: {lat: 45.50547, lng: -73.525632}},
        {title: 'Rio Tinto Alcan Planetarium', name: 'Rio Tinto Alcan Planetarium', img: require('./images/planetarium.jpg'), articleUrl: 'https://en.wikipedia.org/wiki/Rio_Tinto_Alcan_Planetarium', position: {lat: 45.560676, lng: -73.55055}},
        {title: 'Montreal Clock Tower', name: 'Clock Tower', img: require('./images/clock_tower.png'), articleUrl: 'https://en.wikipedia.org/wiki/Montreal_Clock_Tower', position: {lat: 45.510044, lng: -73.548185}}    
      ],
      showingInfoWindow: false,
      selectedPlace: {},
      wikiData: [],
      showingLocations: []      
    }
  }

  // Fetch data from Wikipedia
  fetchData = (title) => {
    const url = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=extracts&exsentences=1&explaintext&exintro=1&titles=${title}`;

    fetch(url)
      .then(response => {
        if(!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(body => this.setState({ 
        wikiData: body.query.pages[0].extract, 
        showingInfoWindow: true
      }))
      .catch(error => {
        alert("Unable to fetch data from Wikipedia. Network connection issue or HTTP error."); //fetch error handling
      })
  };
  
  //Function called when user changes input in the search bar
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  };

  // Function called when user clicks a marker or list item - opens infowindow
  locationClick = (location) => {
    //console.log(location.name);
    this.setState({
      selectedPlace: location,
      showingInfoWindow: false     
    }); 
    this.fetchData(location.title);
  };


  render() {
      
    
    return (
      <div className="app">
        <div className="grid-container">
          <header className="search-location-header-component">
            <SearchLocationsHeader />
          </header>
          <section className="map-header-component">
            <MapHeader />
          </section>
          <aside className="list-location-component">
            <ListLocations locations={this.state.locations} query={this.state.query} 
              onUpdateQuery={this.updateQuery} onLocationClick={this.locationClick}   />
          </aside>
          <main className="map-container-component">
            <MapContainer locations={this.state.locations} query={this.state.query} 
              onLocationClick={this.locationClick} showingInfoWindow={this.state.showingInfoWindow}  
              selectedPlace={this.state.selectedPlace} wikiData={this.state.wikiData}  />
          </main>
        </div>
      </div>
    )
  }
}

export default App;
