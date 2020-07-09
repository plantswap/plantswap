
//center the map on search city or user's City
let cityQuery = document.querySelector("input.center").value;
console.log(cityQuery);
let mapCenter = [0,0]
            mapboxClient.geocoding
        .forwardGeocode({
            query: cityQuery,
            autocomplete: false,
            limit: 1
        })
        .send()
        .then(function(response) {
            if (
                response &&
                response.body &&
                response.body.features &&
                response.body.features.length
            ) {
                var feature = response.body.features[0];
                mapCenter = feature.center
            }
        });
  