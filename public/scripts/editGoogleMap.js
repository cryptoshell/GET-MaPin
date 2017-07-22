$(() => {

  // Initializes map and centers to lat-long
  const initMap = () => {
    const location = { lat: 49.2827, lng: -123.1088 };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: location
    });

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', (event) => {
      addMarkerPopUp(event.latLng, map);
      // console.log(event.latLng.lat());
      // console.log(event.latLng.lng());
    });
  }

  // Adds a marker with a pop-up to the map.
  const addMarkerPopUp = (location, map) => {

    // Create a new marker
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      draggable: true
    });

    function getDraggedCoord(){
      let coord =
        `<input type="hidden" name="lat" value=${marker.getPosition().lat()} />
        <input type="hidden" name="long" value=${marker.getPosition().lng()} />`
        console.log(coord);
      return coord;
    }

    // Set pop-up content
   const popUpContent = `
    <div id="content">
      <form method="POST" action="/marker" id="new-marker">
        <textarea name="title" placeholder="eg. my fave spot"></textarea>
        <textarea name="description" placeholder="Description"></textarea>
        ${google.maps.event.addListener(marker, 'dragend', getDraggedCoord)}
        <input type="submit" value="Submit" name="Submit" />
      </form>
    </div>`;

// input type="file" name="image" id="fileToUpload" />

    // Initialize new pop-up
    const popUp = new google.maps.InfoWindow({
      content: popUpContent
    });

    // Click on marker for pop-up
    google.maps.event.addListener(marker, 'click', (event) => {
      popUp.open(map, marker);
    });
  }

  initMap();

});
