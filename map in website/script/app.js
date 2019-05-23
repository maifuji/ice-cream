var mapContainer = document.getElementById('map-container');
var platform = new H.service.Platform({
  app_id: 'WXJQte2xw2mO1jZvrvlp', // // <-- ENTER YOUR APP ID HERE
  app_code: 'PgYd30bTsNQyUvvVHef3pg', // <-- ENTER YOUR APP CODE HERE
});

var HEREHQcoordinates = {
  lat: 52.530974,
  lng: 13.384944
};

var mapOptions = {
  center: HEREHQcoordinates,
  zoom: 14
};

var map = new HEREMap(mapContainer, platform, mapOptions);




var defaultLayers = platform.createDefaultLayers();


//var map = new H.Map(
//  mapContainer,
//  defaultLayers.normal.map);



window.addEventListener('resize', function () {
  map.getViewPort().resize();
});

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));




//var marker = new H.map.Marker(coordinates);
//map.addObject(marker);

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




//Part 2:



function updatePosition (event) {
var HEREHQcoordinates = {
lat: event.coords.latitude,
lng: event.coords.longitude
};
 
var marker = new H.map.Marker(HEREHQcoordinates);
map.addObject(marker);
map.setCenter(HEREHQcoordinates);
};
 
navigator.geolocation.watchPosition(updatePosition);

var watchID = navigator.geolocation.watchPosition(function(position) {
  // Do something interesting here
});

// … later

navigator.geolocation.clearWatch(watchID);


//Part3:


//router.calculateRoute


var route = new HERERoute(map, platform,{

    // calculateRouteParams object
    mode: 'fastest;car',
    // Start and end point
    'waypoint0': 'geo!52.530974,13.384944', // HERE HQ in Berlin, Germany
    'waypoint1': 'geo!52.5206,13.3862',  // Friedrichstraße Railway Station in Berlin, Germany
    // response formatting 
    representation: 'display'
  },

  // onSuccess callback
  function(result) {
    console.log('Route found!', result);
  },

  // onError callback
  function(error) {
    console.error('Oh no! There was some communication error!', error);
  }
);



var route = new HERERoute(map, platform, {
  mode: 'fastest;car',
  representation: 'display',
  'waypoint0': 'geo!52.530974,13.384944', // HERE HQ in Berlin, Germany,
  'waypoint1': 'geo!52.5206,13.3862'  // Friedrichstraße Railway Station
});



this.addMarker(coordinates, 'destination');

HEREMap.prototype.addMarker = function(coordinates, icon) {
  var markerOptions = {};

  var icons = {
    iceCream: {
      url: './images/marker-gelato.svg',
      options: {
        size: new H.math.Size(26, 34),
        anchor: new H.math.Point(14, 34)
      }
    },
    origin: {
      url: './images/origin.svg',
      options: {
        size: new H.math.Size(30, 36),
        anchor: new H.math.Point(12, 36)
      }
    },
    destination: {
      url: './images/destination.svg',
      options: {
        size: new H.math.Size(30, 36),
        anchor: new H.math.Point(12, 36)
      }
    }
  };

  if (icons[icon]) {
    markerOptions = {
      icon: new H.map.Icon(icons[icon].url, icons[icon].options)
    };
  }

  var marker = new H.map.Marker(coordinates, markerOptions);
  this.map.addObject(marker);

  return marker;
};
var routeLine = new H.map.Polyline(strip, {
  style: { strokeColor: 'rgba(0, 85, 170, 0.5)', lineWidth: 3 }
});


/*var onSuccess = function(result) {
  var route,
    routeShape,
    startPoint,
    endPoint,
    strip;

  if (result.response.route) {
    route = result.response.route[0];
    routeShape = route.shape;

    strip = new H.geo.Strip();

    routeShape.forEach(function(point) {
      var parts = point.split(',');
      strip.pushLatLngAlt(parts[0], parts[1]);
    });

    var routeLine = new H.map.Polyline(strip, {
      style: { strokeColor: 'blue', lineWidth: 10 }
    });

    map.addObject(routeLine);

    map.setViewBounds(routeLine.getBounds());
  }
};*/


/*function locationToWaypointString(coordinates) {
  return 'geo!' + coordinates.lat + ',' + coordinates.lng;
}

*/



