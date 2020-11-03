var myMap = L.map("map", {
  center: [27.876714, -52.285434],
  zoom: 3
});

// tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/outdoors-v11",
  accessToken: API_KEY
}).addTo(myMap);

// url
var queryurl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab the data with d3
d3.json(queryurl, function(response) {

  // Conditionals for the depth of the quake
  function setColor(feature) {
      
      switch (true) {

          case feature >= 90: return "#008000";
          case feature >= 70: return "#FF4500";
          case feature >= 50: return "#FFA500";
          case feature >= 30: return "#ffff00";
          case feature >= 10: return "#b4cd32";

          default: return "#73cd32" 
      };
  }

  // magnitude multiplier
  function getRadius(feature) {
      return feature * 3.5
  }

  // Add circles to map
  L.geoJson(response, {

      pointToLayer: function(feature, coordinates) {
          return L.circleMarker(coordinates)
      },

      style: function(feature) {
          return {
              opacity: 1,
              fillColor: setColor(feature.geometry.coordinates[2]),
              radius: getRadius(feature.properties.mag),
              fillOpacity: 0.75
          }
      },
      onEachFeature: function(feature, layer) {
          layer.bindPopup("<h3>Magnitude: " +
           feature.properties.mag +
            "</h3> <h3>Location: " +
             feature.properties.place +
              "</h3>" + "<h3>Quake Depth: " +
               feature.geometry.coordinates[2] + "</h3>")
      }
  }).addTo(myMap)
  
  // Create legend
  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function (feature) {
      
    // start-up values
      var div = L.DomUtil.create("div", "depth legend");
      var color = ["#008000", "#73cd32", "#b4cd32", "#ffff00", "#FFA500", "#FF4500"];
      var depths = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];

      // add title
      div.innerHTML += "<h4>Earthquake Depth</h4>"   
      
      // populate legend div elements
      for (var i = 0; i < depths.length; i++) {
          div.innerHTML += "<div><span style='background-color: " + color[i] + "'></span>" + depths[i] + "</div>"
      }

      return div;
  };
  // Add legend to map
  legend.addTo(myMap);

});