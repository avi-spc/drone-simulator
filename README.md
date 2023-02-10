# drone-simulator

### About

Drone simulator that performs drone motion based on time series data of longitudes and latitudes.

### Creating Mapbox API key

-   Create `.env.local` file in root folder with the following data:

```js
REACT_APP_PUBLIC_MAPBOX_TOKEN = "YOUR_API_KEY_HERE"
```

-   Mapbox account is required for API key which can be created here. [Mapbox](https://www.mapbox.com)

### Running Local Development

-   Clone the repo

```sh
git clone https://github.com/avi-spc/creativekonami-website.git
cd creativekonami-website
```

-   Install Dependencies.

```sh
npm install
```

-   Run Development Server.

```sh
npm start
```

### Technologies Used

##### Back End

-   [Node](https://nodejs.org)
-   [Express](http://expressjs.com)
-   [MongoDB](http://mongodb.com)
-   [Mongoose](http://mongoosejs.com)

##### Front End

-   [React](https://reactjs.org)

##### State Management

-   [React's Context API](https://reactjs.org/docs/context.html)

##### External API for Geolocation data

-   [Mapbox](https://www.mapbox.com)

### How to use

-   Load the data from a .csv file. Sample file is provided in 'public/data' folder.
-   Alternatively we can also load data manually in the same format.

#### Data format
```sh
timstamp(h:m:s), longitude, latitude
```
Be careful with + and - signs of longitudes and latitudes. </br>
```sh
+ + : North and East
+ - : North and West
- - : South and West
- + : South and East
```

-   After the data has been loaded, play/pause simulation as required.
-   Seek bar has been also provided to control the simulation back and forth.   

