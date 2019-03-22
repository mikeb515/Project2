//------------------------------------------------------------------------
// Visualizing Data with Leaflet
// - See README.md for description of the application. 

// Initialize global constants
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
const magColors = [[0,'#dac292'], [2,'#ada397'], [4,'#622569'], [6,'#c83349']];
const magScales = [[1,.5], [2,1], [3,1.5], [4,2.5], [5,4], [6,7], [7,10]];

var heatp;
//------------------------------------------------------------------------
// Application Entry
// - Perform request for current earthquake data. 
// - When received, process the earthquake data and create the map
//
d3.json('/epdata', function(hurdat) {
  let ephurdat = hurdat['points'];
  console.log("Got EP data ...")

  d3.json('/cpdata', function(hurdat) {
    let cphurdat = hurdat['points'];
    console.log("Got CP data ...")

    d3.json('/aldata', function(hurdat) {
      let alhurdat = hurdat['points'];
      console.log("Got AL data ...")

      // Create map object
      let myMap = L.map("map", {
        center : [37.09, -95.71],
        zoom   : 2,
        maxBounds : [[-90,-180], [90,180]]
      });

      let optionsHeatMap = {radius: 50, blur:35};

      // Create overlay object to hold our overlay layer
      let overlayMaps = {
        EastPacific    : L.heatLayer(ephurdat, optionsHeatMap),
        CentralPacific : L.heatLayer(cphurdat, optionsHeatMap),
        Atlantic       : L.heatLayer(alhurdat, optionsHeatMap)
      };

      // Create the layer control for the map
      baseMaps = createBasemaps();

      // Add primary basemap and earthquake data overlay to the map
      // Add legend for circle colors / magnitude to the map
      // Create the layer control, and add it to the map
      //myMap.addLayer(baseMaps["Street Map"]).addLayer(earthquakes)
      myMap.addLayer(baseMaps["Street Map"])
          .addControl(L.control.layers(baseMaps, overlayMaps, {collapsed: false}));
    });
  });
});


//------------------------------------------------------------------------
// Function : createBasemaps()
// 
// - Create 2 tile layers for the map and return a "base layer" object
//
function createBasemaps() {
    // Initila layer using street maps
    let streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      minZoom: 1,
      id: "mapbox.streets",
      accessToken: API_KEY,
      noWrap: true
    });
  
    // Secondary layer using "dark" map
    let darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      minZoom: 1,
      id: "mapbox.dark",
      accessToken: API_KEY,
      noWrap: true
    });
  
    // Define a baseMaps object to hold our base layers
    return {
      "Street Map" : streetmap,
      "Dark Map"   : darkmap
    };
}
/*
//------------------------------------------------------------------------
// Function : createOverlays(myMap)
// - Create layers for overlay layers and return the "overlay layer" object
// - Additionally a new pane is added to the map with z-index lower than the
//   earthquake data to maintain popups when the overlays are enabled
//
function createOverlays(myMap) {

  // Create an intermediate pane with Z order lower than our circle markers
  // Without this, boundary overlays cover circle markers and popups are not available
  myMap.createPane("boundaries").style.zIndex = 300;

  // Create overlay object to hold our overlay layer
  let overlayMaps = {
    Plates      : L.geoJSON(pb2002Plates,{pane:"boundaries", fillOpacity:0}),
    Orogens     : L.geoJSON(pb2002Orogens, {pane:"boundaries", fillOpacity:0}),
//  Boundaries  : L.geoJSON(pb2002Boundaries, {pane:"boundaries", fillOpacity:0})  // Seems duplicate
  };

  return overlayMaps;
}
*/
