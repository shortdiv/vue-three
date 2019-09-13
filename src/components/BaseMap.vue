<template>
  <div class="map--wrapper">
    <div id="map" ref="map">
      <slot v-bind:mapContext="state.mapInstance" />
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";
const mapboxgl = require("mapbox-gl");

import useMap from "../functions/useMap";

export default {
  name: "BaseMap",
  props: {
    data: Object,
    dataTwo: Object
  },
  setup(props, context) {
    const state = reactive({
      mapInstance: null
    });
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
      state.mapInstance = map;
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
      });
    });
    return {
      state
    };
  }
};
</script>

<style lang="scss" scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
