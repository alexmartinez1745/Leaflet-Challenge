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

// Endpoint of geoJson data (Earthquakes in past 7 days)
var url =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab data with d3
d3.json(url).then(function(data) {
  // Look through data for proper loading in console
  console.log(data);

  // Create markers size by magnitude
  function markers(mag){
    return mag * 5
  }

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

  // Load in the geojson
  L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, 
        // Set the style of the markers using functions above
        {
          radius: markers(feature.properties.mag),
          fillColor: colorSelect(feature.geometry.coordinates[2]),
          fillOpacity: 0.7,
          color: "black",
          weight: 0.6
        }
      );
    },
    
    // Create a popup for each earthquake marker on click
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h4> Site: " + feature.properties.place + "</h4> <hr> <h4> Magnitude: "
      + feature.properties.mag + "</h4> <hr> <h4> Time: " + new Date(feature.properties.time) + "</h4>");
    }
  }).addTo(myMap);
});