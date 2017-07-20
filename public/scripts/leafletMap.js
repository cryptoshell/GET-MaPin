$().ready(function(accessKey){
  // this function sets up the base map tile layer and hardcodes the public access token.

  let map = L.map('mapid').setView([49.2827, -123.1088], 15);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FpMTkiLCJhIjoiY2o1Yml4a204MDA5ODJxbXIyM3NvYXh1NCJ9.PJ53vssI0g2s8F-8-nA6qQ'
  }).addTo(map);

  // // initialize the map on the "map" div with a given center and zoom
  // let map = L.map('mapid').setView([49.2827, -123.1088], 15).addlayer(osm);

  // map.on('click', onMapClick);

  // // Script for adding marker on map click
  // function onMapClick(e) {
  //   let geojsonFeature = {
  //       "type": "Feature",
  //           "properties": {},
  //           "geometry": {
  //               "type": "Point",
  //               "coordinates": [e.latlng.lat, e.latlng.lng]
  //       }
  //   }

  //   let marker;

  //   L.geoJson(geojsonFeature, {

  //       pointToLayer: function(feature, latlng){

  //           marker = L.marker(e.latlng, {

  //               title: "Resource Location",
  //               alt: "Resource Location",
  //               riseOnHover: true,
  //               draggable: true,

  //           }).bindPopup("<input type='button' value='Delete this marker' class='marker-delete-button'/>");

  //           marker.on("popupopen", onPopupOpen);

  //           return marker;
  //       }
  //   }).addTo(map);
  // }

  // // Function to handle delete as well as other events on marker popup open
  // function onPopupOpen() {
  //   let tempMarker = this;

  //   // To remove marker on click of delete
  //   $(".marker-delete-button:visible").click(function () {
  //       map.removeLayer(tempMarker);
  //   });
  // }

  // // getting all the markers at once
  // function getAllMarkers() {
  //   let allMarkersObjArray = [];//new Array();
  //   let allMarkersGeoJsonArray = [];//new Array();

  //   $.each(map._layers, function (ml) {
  //     //console.log(map._layers)
  //     if (map._layers[ml].feature) {
  //       allMarkersObjArray.push(this)
  //       allMarkersGeoJsonArray.push(JSON.stringify(this.toGeoJSON()))
  //     }
  //   })

  //   console.log(allMarkersObjArray);
  //   alert("total Markers : " + allMarkersGeoJsonArray.length + "\n\n" + allMarkersGeoJsonArray + "\n\n Also see your console for object view of this array" );
  // }

  // $(".get-markers").on("click", getAllMarkers);
});