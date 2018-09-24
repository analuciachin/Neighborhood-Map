# Neighborhood Map Project

Neighborhood Map is a project from the Front-end Web Development Nanodegree program. The goal of this project is to develop a single page application featuring a map of a neighborhood using React. The map will have functionalities including highlighted locations, third-party data about those locations and various ways to browse the content.

## Application Setup

The project uses Node.js, if you do not have it installed, you can download it here: [Node.js](https://nodejs.org/en/)

* run `git clone https://github.com/analuciachin/My_Reads.git` to clone this repository 
* go into the application folder and install all modules listed as dependencies in package `package.json` by running the command `npm install`
* install the additional packages by running the commands `npm install --save google-maps-react` and `npm install --save escape-string-regexp sort-by`
* run the app in the development mode with `npm start`

A new browser window should automatically open displaying the app. If it does not, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.


##Features
1. Type into the search box to filter the shown locations on the map.
2. 
3. Click on any marker to see the location details fetched from the Wikipedia API.


## Resources and Documentation:
* [Create-react-app Documentation](https://github.com/facebookincubator/create-react-app)
* [React API](https://facebook.github.io/react/docs/react-api.html)
* [MediaWikiAPI for Wikipedia] (https://www.mediawiki.org/wiki/API:Main_page)
* [google-maps-react package] (https://www.npmjs.com/package/google-maps-react)
* [Build a realtime PWA with React](https://medium.com/front-end-hacking/build-a-realtime-pwa-with-react-99e7b0fd3270)

## Udacity Resources:
* [Project Rubric](https://review.udacity.com/#!/rubrics/1351/view)


***NOTE:*** *The service workers for this app will only cache the site when it is in production mode.*

## How to run the project in Production Mode

1. Build the production ready optimised code. `npm run build`
2. Install `serve npm` package with the command line `npm i serve -g`
3. Setup a static server for the app with the command line `serve -s build`
4. Your application should be running at [http://localhost:5000/](http://localhost:5000) in your browser 