import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
//import FineArtsMuseum from "./images/fine_arts.png";


export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      wikiData: []
    }  
  }

/*
  componentDidMount() {
    
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=extracts&exsentences=1&explaintext&titles=pizza';
    fetch(proxyurl + url)
    .then(response => response.json())
    //.then(body => console.log(body.query.pages[0].extract))
    .then(body => this.setState({ wikiData: body.query.pages[0].extract }))
    .catch(err => console.log(err))
    
  }
*/

  fetchData = (title) => {
    const url = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=extracts&exsentences=1&explaintext&exintro=1&titles=${title}`;
    fetch(url)
    .then(response => response.json())
    .then(body => this.setState({ wikiData: body.query.pages[0].extract }))
    .catch(err => console.log(err))
  }


  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    
    this.fetchData(this.state.selectedPlace.title);
  }



  render() {
    
    let showingMarkers
    if (this.props.query) {
      const match = new RegExp(escapeRegExp(this.props.query), 'i')
      showingMarkers = this.props.locations.filter((location) => match.test(location.title))
    }
    else {
      showingMarkers = this.props.locations
    }

    showingMarkers.sort(sortBy('title'))
 
 
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
      <div className="map-container">
        <Map
          style={{
            width: "80%",
            height: "100%"
          }}
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: 45.493627,
            lng: -73.584002
          }}
        >
          
          {showingMarkers.map((location) => (
            <Marker key={location.title}
              onClick={this.onMarkerClick}
              position={location.position} 
              title={location.title}
              name={location.name}/>
          ))}
          
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
      {/*     <h1>{this.state.wikiData}</h1>*/}
              <img src={this.props.locations[4].img} alt="fine arts museum" style={{float: "left", width: "20%", height: "30%", padding: "0 10px 0 0"}} />
              <p style={{fontFamily: "arial", fontSize: "1.5em"}}>{this.state.wikiData}</p> 
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
