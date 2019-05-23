// Instantiate a map and platform object:
var platform = new H.service.Platform({
  'app_id': 'WXJQte2xw2mO1jZvrvlp', // // <-- ENTER YOUR APP ID HERE
  'app_code': 'PgYd30bTsNQyUvvVHef3pg', // <-- ENTER YOUR APP CODE HERE
});

// Retrieve the target element for the map:
var mapContainer = document.getElementById('map-container');

// Get the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

var coordinates = {
  lat: 52.530974, // HERE HQ in Berlin, Germany
  lng: 13.384944
};

var mapOptions = {
  center: coordinates,
  zoom: 14
}

// Instantiate the map:
var map = new H.Map(
  document.getElementById('map-container'),
  //mapContainer,
  defaultLayers.normal.map,
  mapOptions);


//window.addEventListener('resize', function () {
//  map.getViewPort().resize();
//});

//var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));




//var marker = new H.map.Marker(coordinates);
//map.addObject(marker);


//icon code

var iconUrl = './images/icream.svg';

var iconOptions = {
  // The icon's size in pixel:
  size: new H.math.Size(26, 34),
  // The anchorage point in pixel, 
  // defaults to bottom-center
  anchor: new H.math.Point(14, 34)
};

var markerOptions = {
   icon: new H.map.Icon(iconUrl, iconOptions)
};

var marker = new H.map.Marker(coordinates, markerOptions);
map.addObject(marker);












//part2(location)
/*
function updatePosition (event) {
  var HEREHQcoordinates = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  };

  var marker = new H.map.Marker(HEREHQcoordinates);
  map.addObject(marker);
  map.setCenter(HEREHQcoordinates);
}

navigator.geolocation.watchPosition(updatePosition);
*/


//part3




// Create the parameters for the routing request:
var route = {
//new H.service.Platform({

  // The routing mode:
  'mode': 'fastest;car',
  // The start point of the route:
  'waypoint0': 'geo!52.530974,13.384944', // HERE HQ in Berlin, Germany,
  // The end point of the route:
  'waypoint1': 'geo!52.5206,13.3862',  // Friedrichstraße Railway Station
// representation mode 'display'
  'representation': 'display'
};

 

// Define a callback function to process the routing response:
var onSuccess = function(result) {
  var route,
    routeShape,
    startPoint,
    endPoint,
    strip;

  if (result.response.route) {
     // Pick the first route from the response:
    route = result.response.route[0];
    // Pick the route's shape:
    routeShape = route.shape;

// Create a strip to use as a point source for the route line
    strip = new H.geo.Strip();
// Push all the points in the shape into the linestring:
    routeShape.forEach(function(point) {
      var parts = point.split(',');
      strip.pushLatLngAlt(parts[0], parts[1]);
    });

// Retrieve the mapped positions of the requested waypoints:
 startPoint = route.waypoint[0].mappedPosition;
  endPoint = route.waypoint[1].mappedPosition;


// Create a polyline to display the route:
    var routeLine = new H.map.Polyline(strip, {
      style: { strokeColor: 'blue', lineWidth: 10 }
    });

// Create a marker for the start point:
  var startMarker = new H.map.Marker({
    lat: startPoint.latitude,
    lng: startPoint.longitude
  });

// Create a marker for the end point:
  var endMarker = new H.map.Marker({
    lat: endPoint.latitude,
    lng: endPoint.longitude
  });

// Add the route polyline and the two markers to the map:
map.addObjects([routeLine,startMarker, endMarker]); 

// Set the map's viewport to make the whole route visible:
map.setViewBounds(routeLine.getBounds());
  }
};


 
 

    
// Get an instance of the routing service:
   
var router = platform.getRoutingService();
router.calculateRoute(route,onSuccess,
   // onSuccess callback
  function(error) {
    alert(error.messsage);
  });

  // onError callback
  //function(error) {
  //  console.error('Oh no! There was some communication error!', error);
  //});