
mapboxgl.accessToken = mapToken;

// Get coordinates with better validation
const coords = (listing && listing.geometry && Array.isArray(listing.geometry.coordinates) && listing.geometry.coordinates.length === 2) 
    ? listing.geometry.coordinates 
    : [0, 0];

// Validate coordinates are not default values
const isValidCoords = coords[0] !== 0 || coords[1] !== 0;

const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/mapbox/streets-v11",
    center: isValidCoords ? coords : [0, 0],
    zoom: isValidCoords ? 10 : 2
});

const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coords)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(`<h4>${listing.title}</h4><h6><i>${listing.location}</i></h6> <p><b>Exact location will be provided after booking...</b></p>`))
    .addTo(map);

// center the map on marker just in case tiles load after
map.on('load', () => {
    if (isValidCoords) {
        map.flyTo({ center: coords, zoom: 11 });
    } else {
        console.warn('Invalid or default coordinates detected. Map centered at [0,0]');
    }
});