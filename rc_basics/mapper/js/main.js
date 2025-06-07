const map = L.map('map').setView([42.3555, -71.0565], 19);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const locations = [
  [42.3555, -71.0565],
  [42.3555, -71.0586],
  [42.3555, -71.0537],
  [42.3555, -71.0508],
  [42.3575, -71.0569],
  [42.3535, -71.0508],
  [42.3595, -71.0569],
]

locations.forEach((location, index, locations) => {
  if (index / 2 > 0) { // 0, 1, 2
    const marker = L.marker(location).addTo(map);
  } else if (index / 3 > 0) { // 3, 4, 5
    const circle = L.circle(location, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 300
    }).addTo(map);
  } else {
    const polygon = L.polygon([
      location,
      [location[0] - 0.00001, location[1] - 0.00001],
      [location[0] + 0.00001, location[1] + 0.00001],
    ]).addTo(map);
  }
});

// map.locate({setView: true, maxZoom: 16});

// function onLocationFound(e) {
//   const radius = e.accuracy;

//   L.marker(e.latlng)
//     .addTo(map)
//     .bindPopup("You are within " + radius + " meters from this point").openPopup();

//   L.circle(e.latlng, radius).addTo(map);
// }

// map.on('locationfound', onLocationFound);
