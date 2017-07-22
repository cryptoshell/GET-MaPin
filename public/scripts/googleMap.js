$(() => {

  // Initializes map and centers to lat-long
  const initMap = () => {
    const location = { lat: 49.2827, lng: -123.1088 };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: location
    });

    // Set pop-up content
    for(let marker in markers){
      var popUpContent = `
      <div id="${marker.id}">
          <h3>${marker.title}</h3>
          <p>${marker.description}</p>
          <p>category: ${marker.categories_id}</p>
      </div>`;

      // Initialize new pop-up
      const popUp = new google.maps.InfoWindow({
        content: popUpContent
      });

      // Create a new marker
      const pin = new google.maps.Marker({
        position: { lat: marker.lat, lng: marker.long },
        map: map,
        title: marker.title
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }
  }
  initMap();
});
