## Background

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding...) on issues facing our planet.

### Functionality

Project pulls earthquake data from the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) in JSON format which is read and plotted on a map using Leaflet.
All earthquakes from the last 7 days are plotted based on their longitude and latitude. Data markers reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color. Tooltips display specific earthquake info when clicked.
