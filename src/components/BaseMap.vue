<template>
  <div class="map--wrapper">
    <div id="map" ref="map">
      <slot v-bind:mapContext="mapInstance" />
    </div>
  </div>
</template>

<script>
import { value, onMounted } from "vue-function-api";
const mapboxgl = require("mapbox-gl");

import useMap from "../functions/useMap";

export default {
  name: "BaseMap",
  props: {
    data: Object,
    dataTwo: Object
  },
  setup(props, context) {
    console.log(props.dataTwo);
    const mapInstance = value(null);
    const constructPoint = data => {
      return {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: data.geometry.coordinates[0]
        }
      };
    };
    onMounted(() => {
      var map = new mapboxgl.Map({
        container: context.refs.map, // container id
        style: "mapbox://styles/mapbox/dark-v10", //hosted style id
        center: [-71.46933442476096, 42.25342191415163], // starting position
        zoom: 12 // starting zoom
      });
      mapInstance.value = map;
      map.on("load", () => {
        useMap(map, {
          mapId: "point",
          sourceId: "point",
          data: constructPoint(props.data),
          color: "#007cbf"
        });
        useMap(map, {
          mapId: "pointTwo",
          sourceId: "pointTwo",
          data: constructPoint(props.dataTwo),
          color: "#6c22f5"
        });
        // map.addSource('pointTwo', {
        //   "type": "geojson",
        //   "data": {"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-71.51794373989105,42.23001485466201]}}
        // });
        // map.addLayer({
        //   "id": "pointTwo",
        //   "source": "pointTwo",
        //   "type": "circle",
        //   "paint": {
        //     "circle-radius": 10,
        //     "circle-color": "#6c22f5"
        //   }
        // });
      });
    });
    return {
      mapInstance
    };
  }
};
</script>

<style lang="scss" scoped></style>
