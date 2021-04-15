// Creating map object
var myMap = L.map("map", {
  center: [34.0522, -118.2437],
  zoom: 5,
});

// Adding tile layer
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
  }
).addTo(myMap);

// Load in GeoJson data
var url =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab data with d3
// d3.json(url).then(function(data) {
//     console.log(data);

//     // Create a new marker cluster group
//   var markers = L.markerClusterGroup();
//   data.forEach(eq => {
//     if (eq.location) {
//       markers.addLayer(L.marker([eq.feautures.geometry.coordinates[1], eq.feautures.geometry.coordinates[0]]))
//     }
// });
// })

d3.json(url).then(function (data) {
    console.log(data);
    data.forEach(data => {
      var lat = data.features.geometry.coordinates[0];
      var long = data.features.geometry.coordinates[1];
      L.marker([long, lat]).addTo(myMap);
    }
)
  });