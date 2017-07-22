$(() => {

  // Initializes map and centers to lat-long
  const initMap = () => {
    const location = { lat: 49.2827, lng: -123.1088 };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: location
    });

    // Create a new marker
    const marker = new google.maps.Marker({
      position: location,
      map: map
    });

    // Set pop-up content
     const popUpContent = `
    <div id="content">
        <h3>Pizza</h3>
        <p>Best Pizza!!</p>
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
