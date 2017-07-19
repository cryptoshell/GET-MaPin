$().ready(function(accessKey){
  // this function sets up the base map tile layer and hardcodes the public access token.
  let map = L.map('mapid').setView([49, 123], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FpMTkiLCJhIjoiY2o1Yml4a204MDA5ODJxbXIyM3NvYXh1NCJ9.PJ53vssI0g2s8F-8-nA6qQ'
  }).addTo(map);
  // this adds a marker to specfic lat-long and puts an example popup.
  // L.marker([51.5, -0.09]).addTo(map)
  // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  // .openPopup();
});
