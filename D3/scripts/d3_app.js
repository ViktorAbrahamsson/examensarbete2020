// Function to load JSON-dataset asynchronously.
function loadJSON(callback) {
  // Create new instance of XMLHttpRequest
  let obj = new XMLHttpRequest();
  // Specifies type of data.
  obj.overrideMimeType("application/json");
  // Get the JSON-file.
  obj.open("GET", "./dataset.json", true);
  // EventHandler for readystatechange.
  obj.onreadystatechange = function() {
    // Defining the error.
    if (obj.readyState == 4 && obj.status == "200") {
      // Throw an "InvalidStateError".
      callback(obj.responseText);
    }
  };
  // Initiates request.
  obj.send(null);
}

function render() {
  loadJSON(function(response) {
    // Parse the response in JSON-format.
    let jsonResponse = JSON.parse(response);

    // Store the parsed JSON-data.
    let jsonData = {
      data: jsonResponse
    };

    // Create Map with Leaflet.js and set view & zoom.
    let map = L.map("map").setView([20, 20], 3);

    // Create a layer and get the actual map.
    L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
      {
        attribution: "D3.js",
        maxZoom: 12
      }
      // Add to the map-variable
    ).addTo(map);

    // Add Leaflet-SVG to the map.
    L.svg().addTo(map);

    // Select element "map" and "svg".
    d3.select("#map")
      .select("svg")
      // Select all elements that will be drawn.
      .selectAll("dataPoints")
      // Add dataset as data() parameter.
      .data(jsonResponse)
      // Create empty elements for the data.
      .enter()
      // Append new element "circle" depending on size of the dataset.
      .append("circle")
      // Linking coordinates from dataset to D3.js.
      .attr("cx", function(d) {
        return map.latLngToLayerPoint([d.latitude, d.longitude]).x;
      })
      .attr("cy", function(d) {
        return map.latLngToLayerPoint([d.latitude, d.longitude]).y;
      })
      // Add radius & style.
      .attr("r", function(d) {
        return d.brightness * 0.01;
      })
      // Depending on brightness, give according fill-color.
      .style("fill", function(d) {
        if (d.brightness <= 310) {
          return "#C4D60A";
        } else if (d.brightness <= 320) {
          return "#FFA500";
        } else {
          return "#D60C0A";
        }
      })
      // Depending on brightness, give according stroke-color.
      // .attr("stroke", function(d) {
      //   if (d.brightness <= 310) {
      //     return "#C4D60A";
      //   } else if (d.brightness <= 320) {
      //     return "#FFA500";
      //   } else {
      //     return "#D60C0A";
      //   }
      // })
      // .attr("stroke-width", 0.5)
      .attr("fill-opacity", 0.7);

    // Update function to render everything and update when the map changes.
    function Update() {
      // Select all d3-circles
      d3.selectAll("circle")
        // Update the coordniates depending on pan & zoom.
        .attr("cx", function(d) {
          return map.latLngToLayerPoint([d.latitude, d.longitude]).x;
        })
        .attr("cy", function(d) {
          return map.latLngToLayerPoint([d.latitude, d.longitude]).y;
        });
    }

    // Fire "Update()" when a move has ended on the map.
    map.on("moveend", Update);
  });
}

// Run script.
render();