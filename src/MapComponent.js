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
    //console.log(props);
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
      showingMarkers = this.props.locations.filter((location) => match.test(location.name))
    }
    else {
      showingMarkers = this.props.locations
    }

    showingMarkers.sort(sortBy('name'))
 
 
  let bounds = new this.props.google.maps.LatLngBounds();
  for (let i=0; i < this.props.locations.length; i++) {
    bounds.extend(this.props.locations[i].position);
    //console.log(bounds.extend(this.props.locations[i].position));
  }
  
 
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
      <div className="map-container">
        <Map
          style={{
            width: "70%",
            height: "80%"
          }}
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: 45.493627,
            lng: -73.584002
          }}
      bounds={bounds}
        >
          
          {showingMarkers.map((location) => (
            <Marker key={location.title}
              onClick={this.onMarkerClick}
              position={location.position} 
              title={location.title}
              name={location.name}
        img={location.img} 
        articleUrl={location.articleUrl} />
          ))}
          
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1 style={{textAlign: "center", fontSize: "1.5em"}}>{this.state.selectedPlace.name}</h1>
              <img src={this.state.selectedPlace.img} alt="fine arts museum" style={{float: "left", width: "25%", height: "50%", padding: "0 10px 0 0"}} />
              <p style={{fontFamily: "arial", fontSize: "1.2em"}}>{this.state.wikiData}</p> 
              <div style={{textAlign: "right", marginRight: "1em"}}>
                <p style={{fontStyle: "italic", marginTop: "1em"}}>See full article: <a href={this.state.selectedPlace.articleUrl} target="_blank">Wikipedia</a></p>
              </div>
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
