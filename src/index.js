
import React from 'react';
import ReactDOM from 'react-dom';
import MapContainer from './MapComponent';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import registerMyServiceWorker from './registerMyServiceWorker';


ReactDOM.render(
	<App />, 
	document.getElementById('root')
);
registerServiceWorker();
//registerMyServiceWorker();