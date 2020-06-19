const renderMap = (latitude, longitude, zoom, apiKey) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script
        type="text/javascript"
        src="https://js.api.here.com/v3/3.1/mapsjs-core.js"
      ></script>
      <script
        type="text/javascript"
        src="https://js.api.here.com/v3/3.1/mapsjs-service.js"
      ></script>
      <script
        type="text/javascript"
        src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"
      ></script>
      <script
        type="text/javascript"
        src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"
      ></script>
      <title>Map</title>
    </head>
    <body>
      <div
        style="height: 440px; border-radius: 5px; overflow: hidden;"
        id="mapContainer"
      ></div>
      <script>
        const platform = new H.service.Platform({
          apikey: "${apiKey}",
        });
  
        const maptypes = platform.createDefaultLayers();
  
        const map = new H.Map(
          document.getElementById("mapContainer"),
          maptypes.vector.normal.map,
          {
            zoom: ${zoom},
            center: { lng: ${longitude}, lat: ${latitude} },
          }
        );
        map.addObject(
          new H.map.Marker({
            lat: ${latitude},
            lng: ${longitude},
          })
        );
  
        const behavior = new H.mapevents.Behavior(
          new H.mapevents.MapEvents(map)
        );
        const ui = H.ui.UI.createDefault(map, maptypes);
      </script>
    </body>
  </html>
        `;
};

module.exports = { renderMap };
