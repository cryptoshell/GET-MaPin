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
    });
  }
  // Adds a marker with a pop-up to the map.
  const addMarkerPopUp = (location, map) => {

    // for each query, render the markers using AJAX
    const marker = new google.maps.Marker({
      position: location,
      map: map
    });

    // Set pop-up content
   const popUpContent = `
    <div id="content">
      <form method="POST" action="/marker" id="new-marker">
        <textarea name="title" placeholder="eg. my fave spot"></textarea>
        <textarea name="description" placeholder="Description"></textarea>
         <input type="hidden" name="lat" value=${marker.getPosition().lat()} />
        <input type="hidden" name="long" value=${marker.getPosition().lng()} />
        <input type="submit" value="Post" name="Submit" />
      </form>
    </div>`;

    // Initialize new pop-up
    const popUp = new google.maps.InfoWindow({
      content: popUpContent
    });

    // Click on marker for pop-up
    google.maps.event.addListener(marker, 'click', (event) => {
      popUp.open(map, marker);
    });
  }









    // // Set pop-up content
    // for (let marker in markers) {
    //   var popUpContent = `
    //   <div id="${marker.id}">
    //       <h3>${marker.title}</h3>
    //       <p>${marker.description}</p>
    //       <p>category: ${marker.categories_id}</p>
    //   </div>`;

    //   // Initialize new pop-up
    //   const popUp = new google.maps.InfoWindow({
    //     content: popUpContent
    //   });

    //   // Create a new marker
    //   const pin = new google.maps.Marker({
    //     position: { lat: marker.lat, lng: marker.long },
    //     map: map,
    //     title: marker.title
    //   });

    //   marker.addListener('click', function() {
    //     popUp.open(map, pin);
    //   });
    // }



  initMap();

});