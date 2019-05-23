function HERERoute (map, platform, routeOptions) {
  var router = platform.getRoutingService();

  var onSuccess = function(result) {
    console.log('Route found!', result);
  };

  var onError = function(error) {
    console.error('Oh no! There was some communication error!', error);
  }

  router.calculateRoute(routeOptions, onSuccess, onError);
}