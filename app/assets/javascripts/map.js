$(document).ready(function(){
  // Provide your access token
  L.mapbox.accessToken = 'pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImJkN2FkOTFjNDM4OGQzNWUyYzY3NjU4ODM4ZDYwNDJmIn0.FLniij4ORShXSqRe6pcw-A';
  // Create a map in the div #map
  var map = L.mapbox.map('map', 'mattficke.6b6c9269');
  var marker

  map.on("click", function(e) {
    console.log(e.latlng);
    map.setView(e.latlng, 14);
    setMarker(e.latlng)
  })

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function setMarker(latlng) {
    // window.location.replace('/feeds/new/?lat='+ crd.latitude + '&lng=' + crd.longitude)
    map.setZoom(14).panTo(latlng)
    if (!marker) {
      marker = L.marker(latlng).addTo(map);
    } else {
      marker.setLatLng(latlng);
    }
  }

  function success(pos) {
    var crd = pos.coords;
    var latlng = L.latLng(crd.latitude, crd.longitude)
    console.log(crd.latitude);
    console.log(crd.longitude);
    setMarker(latlng);
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  $("#get").on("click", function() {
    navigator.geolocation.getCurrentPosition(success, error, options);
  })
})
