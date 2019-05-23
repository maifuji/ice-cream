function HEREMap (mapContainer, platform, mapOptions) {
  this.platform = platform;
  this.position = mapOptions.center;

  var defaultLayers = platform.createDefaultLayers();

  // Instantiate wrapped HERE map
  this.map = new H.Map(mapContainer, defaultLayers.normal.map, mapOptions);

  // Basic behavior: Zooming and panning
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

  // Watch the user's geolocation and display it
  navigator.geolocation.watchPosition(this.updateMyPosition.bind(this));

  // Resize the map when the window is resized
  window.addEventListener('resize', this.resizeToFit.bind(this));
}

HEREMap.prototype.updateMyPosition = function(event) {
  this.position = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  };

  // Remove old location marker if it exists
  if (this.myLocationMarker) {
    this.removeMarker(this.myLocationMarker);
  }

  this.myLocationMarker = this.addMarker(this.position);
  this.map.setCenter(this.position);
};

HEREMap.prototype.addMarker = function(coordinates) {
  var marker = new H.map.Marker(coordinates);
  this.map.addObject(marker);

	return marker;
};

HEREMap.prototype.removeMarker = function(marker) {
  this.map.removeObject(marker);
};

HEREMap.prototype.resizeToFit = function() {
  this.map.getViewPort().resize();
};

HEREMap.prototype.drawRoute = function(fromCoordinates, toCoordinates) {
  var routeOptions = {
    mode: 'fastest;car',
    representation: 'display',
    alternatives: 2,
    waypoint0: Utils.locationToWaypointString(fromCoordinates),
    waypoint1: Utils.locationToWaypointString(toCoordinates)
  };

  this.routes = new HERERoute(this.map, this.platform, routeOptions);
};

if (!this.route) {
  this.drawRoute(this.position, HEREHQcoordinates);
}


var routeOptions = {
  mode: 'fastest;car',
  representation: 'display',
  waypoint0: Utils.locationToWaypointString(fromCoordinates),
  waypoint1: Utils.locationToWaypointString(toCoordinates)
};

