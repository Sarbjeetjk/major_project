
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/mapbox/streets-v11",
    center: listing && listing.geometry && Array.isArray(listing.geometry.coordinates) ? listing.geometry.coordinates : [0,0],
    zoom: 10
});

const coords = (listing && listing.geometry && Array.isArray(listing.geometry.coordinates)) ? listing.geometry.coordinates : [0,0];
const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coords)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(`<h4>${listing.title}</h4><h6><i>${listing.location}</i></h6> <p><b> exact loation will be provided after booking...</b></p>`))
    .addTo(map);

// center the map on marker just in case tiles load after
map.on('load', () => {
    map.flyTo({ center: coords, zoom: 11 });
});