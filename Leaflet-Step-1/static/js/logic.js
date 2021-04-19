// Creating map object
  var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 5
  })

// Create tile layer
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY,
  }).addTo(myMap);

// Load in GeoJson data
var url =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab data with d3
d3.json(url).then(function (data) {
  console.log(data);
  function circleMarks(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: colorSelect(feature.geometry[2]),
      color: "black",
      radius: sizeCheck(feature.properties.mag),
    };
  };

  // Select color depending on depth of the earthquake
  function colorSelect(depth) {
    switch (true) {
      case depth > 90:
        return "#F6412D";
        case depth > 70:
          return "#FF5607";
        case depth > 50:
          return "#FF9800";
        case depth > 30:
          return "#FFC100";
        case depth > 10:
          return "#FFEC19";
        default:
          return "#BDDE34";
    }
  }
});

// function createFeatures(eqData) {
//   // Function to run on each feature of the data
//   function onEachFeat(feature) {
//     // Bind extra data to a popup
//     layer.bindPopup(
//       "<h3>" +
//         feature.properties.place +
//         "</h3><hr><p>" +
//         new Date(feature.properties.time) +
//         "</p>"
//     );
//   }

//   // Create a GeoJSON layer with the data found and run the onEachFeat function for each earthquake
//   var earthquake = L.geoJSON(eqData, {
//     onEachFeat: onEachFeat,
//   });

//   // Send earthquake layer to the createMap function
//   createMap(earthquake);
// }

// function createMap(earthquake) {
  
//   );

//   // Add layer to basemap object
//   var baseMaps = {
//     "Street Map": streetMap,
//   };

//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     Earthquakes: earthquake,
//   };

  
//   });

//   // Create layer control and add to maps
//   L.control
//     .layers(baseMaps, overlayMaps, {
//       collapsed: false,
//     })
//     .addTo(myMap);
// }