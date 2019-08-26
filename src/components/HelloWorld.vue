<template>
  <div class="map--wrapper">
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
const mapboxgl = require("mapbox-gl");
var turf = require("turf");
export default {
  name: "RunnerMap",
  data() {
    return {
      route: null,
      map: null,
      raf: null,
      timestamp: null,
      loaded: false
    };
  },
  created() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWxscnlkZXIiLCJhIjoidWs5cUFfRSJ9.t8kxvO3nIhCaAl07-4lkNw";
    fetch(
      "https://gist.githubusercontent.com/shortdiv/97d74e464a8900853bc89048a8244c84/raw/e9bbb80410f798e82171dfdf453e232ef251a4fc/BostonMarathon_firstsegment.geojson"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.route = data;
      });
  },
  watch: {
    loaded() {
      this.timestamp = performance.now();
      this.raf = requestAnimationFrame(animateMarker.bind(this));

      function animateMarker() {
        let time = performance.now(); //ms
        const duration = 0.1 * 60 * 1000;
        let speed = 5000 / duration; //in m
        const path = turf.lineString(this.route.geometry.coordinates);
        const timeElapsed = time - this.timestamp;

        console.log((timeElapsed * speed) / (duration * 1000));
        if (timeElapsed * speed >= 5000) {
          cancelAnimationFrame(this.raf);
        } else {
          var distTravelled = timeElapsed * speed;
          var waypoint = turf.along(path, distTravelled, "meters");
          this.map.getSource("point").setData(waypoint);
          this.raf = requestAnimationFrame(animateMarker.bind(this));
        }
      }
    }
  },
  mounted() {
    var map = new mapboxgl.Map({
      container: this.$refs.map, // container id
      style: "mapbox://styles/mapbox/dark-v10", //hosted style id
      center: [-71.46933442476096, 42.25342191415163], // starting position
      zoom: 12 // starting zoom
    });
    this.map = map;
    map.on("load", () => {
      this.loaded = true;
      map.addSource("point", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [-71.51794373989105, 42.23001485466201]
          }
        }
      });
      map.addLayer({
        id: "point",
        source: "point",
        type: "circle",
        paint: {
          "circle-radius": 10,
          "circle-color": "#007cbf"
        }
      });
    });
  }
};
</script>

<style lang="scss">
@import "../../public/map.css";

body {
  margin: 0;
  padding: 0;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.mapboxgl-canvas {
  position: relative !important;
}
</style>
