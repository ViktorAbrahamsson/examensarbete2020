<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: "Heatmap",
  mounted() {
    const leafletStyle = document.createElement("link");
    leafletStyle
      .setAttribute("rel", "stylesheet")
      .setAttribute("href", "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css")
      .setAttribute(
        "integrity",
        "sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
      )
      .setAttribute("crossorigin", "");

    const leafletScript = document.createElement("script");
    leafletScript
      .setAttribute("src", "https://unpkg.com/leaflet@1.6.0/dist/leaflet.js")
      .setAttribute(
        "integrity",
        "sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
      )
      .setAttribute("crossorigin", "");
    leafletScript.async = true;
    document.head.appendChild(leafletScript);

    const d3Script1 = document.createElement("script");
    d3Script1.setAttribute("src", "https://d3js.org/d3.v5.min.js");
    d3Script1.async = true;
    document.head.appendChild(d3Script1);

    const d3Script2 = document.createElement("srcipt");
    d3Script2.setAttribute(
      "src",
      "https://d3js.org/d3-geo-projection.v2.min.js"
    );
    d3Script2.async = true;
    document.head.appendChild(d3Script2);
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>