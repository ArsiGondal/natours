export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibXVoYW1tYWQtYXJzYWxhbiIsImEiOiJja2J2d2kyZjcwYTl1MzFvYmhia21mYndrIn0.M8_km1PZPC_kgL0Qm9lGPw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/muhammad-arsalan/ckbvwzhjs0ksd1io9scx2vr1v',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  //Cretae marker
  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    //Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //Extends map to include locations
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
