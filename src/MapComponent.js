import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


// Handling invalid Google Maps API key
window.gm_authFailure = () => {
  alert("We can't access Google Maps API, please check you API key.");
}

// Handling when Google Maps API fails
// To simulate an unhandledrejection event: http://2ality.com/2016/04/unhandled-rejections.html
window.addEventListener("unhandledrejection", function (event) {
  alert("Unable to load Google Maps. Reason: " + event.reason);
  event.preventDefault();
});


export class MapContainer extends Component {


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
      <div className="map-container" role="application">
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
          bounds={bounds}
        >
          
          {showingMarkers.map((location) => (
            <Marker key={location.title}
              onClick={() => this.props.onLocationClick(location)}
              position={location.position} 
              title={location.title}
              name={location.name}
              img={location.img} 
              articleUrl={location.articleUrl} 
              icon={this.props.selectedPlace.name !== location.name ?
                'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                : 
                'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              } />
          ))}


          <InfoWindow
            visible={this.props.showingInfoWindow}
            position={this.props.selectedPlace.position}   
          >
            <div className="infowindow-data">
              <h1>{this.props.selectedPlace.name}</h1>
              <img src={this.props.selectedPlace.img} alt={this.props.name} />
              <p>{this.props.wikiData}</p> 
              <div className="infowindow-link">
                <p>See full article: <a href={this.props.selectedPlace.articleUrl} target="_blank">Wikipedia</a></p>
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
