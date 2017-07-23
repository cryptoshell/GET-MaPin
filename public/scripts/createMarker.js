$(() => {

  // Initializes map and centers to lat-long
  const initMap = () => {
    const location = { lat: 49.2827, lng: -123.1188 };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: location
    });

    const searchQuery = window.location.search || '';
    $.ajax({
      url: "/marker" + searchQuery,
      context: document.body
    }).done(function(markers) {
      for (let marker in markers) {
        // Create a new marker
        const pin = new google.maps.Marker({
          position: { lat: markers[marker].lat, lng: markers[marker].long },
          map: map,
          title: markers[marker].title
        });

        var popUpContent = `
        <div id="${markers[marker].id}">
            <p>${markers[marker].id}</p>
            <h3>${markers[marker].title}</h3>
            <p>${markers[marker].description}</p>
            <p>category: ${markers[marker].categories_id}</p>
            <form method="POST" action="/deletemarker" id="delete-marker">
              <input type="hidden" name="lat" value=${markers[marker].lat} />
              <input type="hidden" name="category" value=${markers[marker].categories_id} />
              <input type="hidden" name="id" value=${markers[marker].id} />
              <input type="submit" value="Delete" name="Delete" />
            </form>
        </div>`;

        // Initialize new pop-up
        const popUp = new google.maps.InfoWindow({
          content: popUpContent
        });

        pin.addListener('click', function(event) {
          popUp.open(map, pin);
        });
      }

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
        <input type="hidden" name="category" value=${window.location.search || ''} />
        <input type="submit" value="Save pin" name="Submit" />
      </form>
      <form method="POST" action="/deletemarker" id="delete-marker">
        <input type="hidden" name="lat" value=${marker.getPosition().lat()} />
        <input type="hidden" name="category" value=${window.location.search || ''} />
        <input type="submit" value="Delete" name="Delete" />
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
  initMap();
});