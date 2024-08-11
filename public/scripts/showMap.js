maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
    container: 'map',   // container's id or the HTML element to render the map
    style: maptilersdk.MapStyle.BRIGHT,
    center: camp.geometry.coordinates,
    zoom: 4
});

const marker = new maptilersdk.Marker()
    .setLngLat(camp.geometry.coordinates)
    .setPopup(
        new maptilersdk.Popup({ offset: 25 })
            .setHTML(
                `<h3>${camp.title}</h3><p>${camp.location}</p>`
            ))
    .addTo(map)

const nav = new maptilersdk.MaptilerNavigationControl();
map.addControl(nav, 'top-left');

// new maptilersdk.Marker()
//     .setLngLat(campground.geometry.coordinates)
//     .setPopup(
//         new maptilersdk.Popup({ offset: 25 })
//             .setHTML(
//                 `<h3>${campground.title}</h3><p>${campground.location}</p>`
//             )
//     )
//     .addTo(map)