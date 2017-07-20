$(() => {

  function initMap() {
    var uluru = {lat: 49.2827, lng: -123.1088};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }
  initMap();
});