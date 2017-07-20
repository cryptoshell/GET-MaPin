$(() => {

  // Initializes map and centers to lat-long
  function initialize() {
    const location = { lat: 49.2827, lng: -123.1088 };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: location
    });

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', (event) => {
      addMarkerPopUp(event.latLng, map);
      alert(event.latLng);
    });
  }

  // Adds a marker with a pop-up to the map.
  function addMarkerPopUp(location, map) {

    // Create a new marker
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      draggable: true
    });

    // Set pop-up content
    const popUpContent = `
    <div id="content">
      <form method="POST" action="/tweets/" id="make-tweet">
        <textarea name="text" placeholder="title"></textarea>
        <input id="submit description" type="submit" value="Add title" />
      </form>
      <form method="POST" action="/tweets/" id="make-tweet">
        <textarea name="text" placeholder="describe your marker"></textarea>
        <input id="submit description" type="submit" value="Describe" />
      </form>
      <form action="upload.php" method="post" enctype="multipart/form-data"> ...
        <input type="file" name="fileToUpload" id="fileToUpload" />
        <input type="submit" value="Upload Image" name="submit" />
      </form>
      <input type="submit" value="Delete pin" />
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

  initialize();

});
