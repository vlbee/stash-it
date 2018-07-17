# Find it, Stash it

#### https://find-it-stash-it.netlify.com

#### React-Leaflet SPA mapping luggage storage stashpoints from the Stasher API.

Upon loading, the site requests the user's geolocation and uses this to make a network request to the Stasher API for all luggage storing stashpoints within a 20km radius. All resulting location names and addresses are displayed on the map. 

In addition, the user has an option to filter for stashpoints that are open 24/7.


## To Run Locally:

#### Install: 

```
git clone https://github.com/vlbee/stashit.git
npm i 
```

#### Available scripts: 
```
npm test
npm run start 
npm run build
```

## Tech Stack:

* [React](https://reactjs.org/)
* [Leaflet](https://www.mapbox.com/api-documentation/#maps) with MapBox tile (for mapping)
* [React-Leaflet](https://react-leaflet.js.org/en/) - please note this project uses v1.9.1
* [Jest](https://jestjs.io/) and [jest-fetch-mock](https://www.npmjs.com/package/jest-fetch-mock)
* [Parcel](https://parceljs.org/) (for bundling)
* Hosted on [Netlify](https://www.netlify.com/)
* Built upon my [react-boilerplate](https://github.com/vlbee/react-boilerplate)
* Stasher API: https://shapelabs-uk.github.io/citystasher-api-docs/#introduction
* Mapbox API: https://www.mapbox.com/api-documentation/#maps


This project was an opportunity to develop my React and Rest API skills as well as a great chance to learn how to use an interactive mapping library for the first time. I chose Leaflet because it is open-source, worked with OpenStreetMap and seemed to have straight forward documentation.

## Technical Issues: 

#### Note on React-Leaflet: 
Libary providing an abstraction of Leaflet as React components that makes it easier to use the two together. Unfortunately React-Leaflet's (breaking) v2 release a couple days before I started the project meant several demos, blog posts and how-to's did not function as expected. As a result I opted to downgrade to v1.9.1 to get the Leaflet map rendering without having more time to explore and learn both mapping libraries in more depth. 

#### Web Performance:
To practice Server-Side filtering/sorting and async networks requests with React, I used the Stasher API for pulling data. From a UX perspective however, I think it would make more sense to filter and sort results client-side for a snappier experience, only utilising subsequent network requests if the user needed additional data (ie, "update map as I move" option or sort by city name vs. an initial geolocation-based fetch request)


## Process

#### 1. Investigation of the Stasher API & building flexible fetch query

I used the browser and **[Postman](https://www.getpostman.com/)** to explore various query formats based on the Stasher documentation and acquire dummy data for testing. I used **Jest** and **jest-fetch-mock** to practice TDD and adapt my fetch function so that it would take in a query object to generate query strings OR request all stashpoints if no argument was passed. 

At this point I also decided to ignore any sorting queries as they did not appear to be working and the API documentation did not provide specific sorting query syntax examples. 

E.g. these queries return results in the same order:

`https://api-staging.stasher.com/v1/stashpoints?city=dublin&by_capacity=asc`

`https://api-staging.stasher.com/v1/stashpoints?city=dublin&by_capacity=desc`
 
#### 2. Integration of Leaflet Map

This was particulary challenging due to React-Leaflet's breaking v2 release noted above. It took some time to familiarise myself with the APIs and troubleshoot errors to get the map rendering.

#### 3. Writing async geolocation function and integration with Stasher API fetch request

I used the browser's `navigator.geolocation.getCurrentPosition` API to request latitude/longitude coordinates to pass both into the Stashpoint fetch query and the map render. These are all written as async functions with promises.

All state is held in the main React `App` component. State consists of stashpoint data and a query parameter object.

I added a simple CSS loader to help with perceived performance as the network requests were proving quite slow on my connection.

TODO: I would like to add improved error handling to the async functions provide the user with visual messages such as if there is a request time out, etc. 

#### 4. Displaying Stashpoints on the map

I updated the Stashpoint data in the `App` state and passed this into the `Mapview` component via props. It was straightforward to iterate through the data array with `Array.map()` and generate Leaflet's inbuilt `Markers` and `Popup` components. 

#### 5. Filtering for 24/7 Stashpoints

Lastly, I added a `Button` component to filter for open 24/7 Stashpoints making a followup network request to the Stasher API. I would like to refactor my `onClick` event handler function to be flexible enough to handle multiple filters, such as "open late", "type", and distance radius. 

Because all filtering is executed server-side via the Stasher API, I needed a `componentDidUpdate` React Lifecycle Method to check whether the state had been updated and a new network request was required. The function uses the length of the `state.query` Object to determine this, as toggling the filter adds or removes query parameters to the state. 

```
componentDidUpdate(prevProps, prevState) {
    const query = this.state.query;
    const prevQuery = prevState.query;
    if (Object.keys(query).length !== Object.keys(prevQuery).length) {
      this.fetchRequest(this.state.query).then(data => {
        this.setState({ stashpoints: data });
      })
    }
  }
  ```
  
  #### 6. Next steps: 
  
  There are a number of things I would like to improve upon: 
  
*   Show network request error feedback to the user.
*   Show a different coloured marker of the user's location on the map in relation to stashpoints. 
*   Refactor various components and utility functions out of the main `App` component.
*   Review `onClick` handler and how I am managing the query parameters in State to be able to provide for multiple filter functions.
*   Provide nicer UI for the filter toggles, probably via CSS in JSX with styled-components
*   Review bundling and build set up and fully investigate compile/runtime errors. 
*   Tests for React components.
*   Side bar to display more details for each selected marker.
  
