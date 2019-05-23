function HERERoute (map, platform, routeOptions) {
  var router = platform.getRoutingService();

  var onSuccess = function(result) {

 if (result.response.route) {
   if (result.response.route) {
    var routeLineGroup = new H.map.Group();

    var routes = result.response.route.map(function(route) {
      var routeLine = drawRoute(route);
      routeLineGroup.addObject(routeLine);

      return {
        route: route,
        routeLine: routeLine
      };
    });

    map.addObject(routeLineGroup);
    map.setViewBounds(routeLineGroup.getBounds());
  }

onRouteSelection(routes[0]);
this.routePanel = new HERERoutesPanel(routes,
{ onRouteSelection: onRouteSelection }
);
};


  var onError = function(error) {
    console.error('Oh no! There was some communication error!', error);
  }
  var drawRoute = function(route){
   var routeShape = route.shape;

    var strip = new H.geo.Strip();

    routeShape.forEach(function(point) {
      var parts = point.split(',');
      strip.pushLatLngAlt(parts[0], parts[1]);
    });

    var routeLine = new H.map.Polyline(strip, {
      style: { strokeColor: 'blue', lineWidth: 3}
    });



    //map.addObject(routeLine);  //removed

   // map.setViewBounds(routeLine.getBounds());
  return routeLine;
};

  router.calculateRoute(routeOptions, onSuccess, onError);
}

function locationToWaypointString(coordinates) {
  return 'geo!' + coordinates.lat + ',' + coordinates.lng;
}




// HERE HQ in Berlin, Germany:
var HEREHQcoordinates = {
  lat: 52.530974,
  lng: 13.384944
};

var routeRendered = false;

function updatePosition (event) {
  var coordinates = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  };

  var marker = new H.map.Marker(coordinates);
  map.addObject(marker);

  // If the route has not been rendered yet, 
  // calculate and render it
  if (!routeRendered) {
    var route = new HERERoute(map, platform, {
      mode: 'fastest;car',
      representation: 'display',
      waypoint0: locationToWaypointString(coordinates),
      waypoint1: locationToWaypointString(HEREHQcoordinates)
    });

    routeRendered = true;
  }
}

navigator.geolocation.watchPosition(updatePosition);

var selectedRoute;

var routeLineStyles = {
normal: { strokeColor: 'rgba(0, 85, 170, 0.5)', lineWidth: 3 },
selected: { strokeColor: 'rgba(255, 0, 0, 0.7)', lineWidth: 7 }
};

var onRouteSelection = function(route) {
  console.log('A route has been selected.', route);
  if (selectedRoute) {
    selectedRoute.routeLine.setStyle(routeLineStyles.normal).setZIndex(1);
  }

  route.routeLine.setStyle(routeLineStyles.selected).setZIndex(10);
  selectedRoute = route;
};
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
};
*/



/*var HEREHQcoordinates = {
  lat: 52.530974,
  lng: 13.384944
};

var routeRendered = false;

function updatePosition (event) {
  var coordinates = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  };

  var marker = new H.map.Marker(coordinates);
  map.addObject(marker);

  // If the route has not been rendered yet, 
  // calculate and render it
  if (!routeRendered) {
    var route = new HERERoute(map, platform, {
      mode: 'fastest;car',
      representation: 'display',
      waypoint0: locationToWaypointString(coordinates),
      waypoint1: locationToWaypointString(HEREHQcoordinates)
    });

    routeRendered = true;
  }
}

navigator.geolocation.watchPosition(updatePosition);
*/