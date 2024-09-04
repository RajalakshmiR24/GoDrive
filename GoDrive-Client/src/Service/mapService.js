// Example of map service integration

export const initializeMap = (mapElement, location) => {
    // Initialize the map with given location
    const map = new window.google.maps.Map(mapElement, {
      center: location,
      zoom: 13,
    });
    return map;
  };
  
  export const plotRoute = (map, start, end) => {
    // Plot route between start and end locations on the map
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
  
    const request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING',
    };
  
    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };
  