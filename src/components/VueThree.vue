<template>
  <div>
    <BaseMap v-if="dataLoaded" :data="point" :dataTwo="pointTwo">
      <template v-slot:default="slotProps">
        <PointLayer
          v-if="slotProps.mapContext !== null && point !== null"
          :map="slotProps.mapContext"
          :data="point"
          :time="time"
          sourceId="point"
        />
        <PointLayer
          v-if="slotProps.mapContext !== null && pointTwo !== null"
          :map="slotProps.mapContext"
          :data="pointTwo"
          :time="time2"
          sourceId="pointTwo"
        />
      </template>
    </BaseMap>
  </div>
</template>

<script>
import { value, onCreated } from "vue-function-api";
const mapboxgl = require("mapbox-gl");
import PointLayer from "../components/PointLayer.vue";

import BaseMap from "./BaseMap.vue";

export default {
  name: "VueThree",
  components: {
    BaseMap,
    PointLayer
  },
  setup() {
    const point = value(null);
    const pointTwo = value(null);
    const dataLoaded = value(false);
    const getMarathonRoute = () =>
      fetch(
        "https://gist.githubusercontent.com/shortdiv/cc38c54c49e153493835827e9fb05c6d/raw/a561954794bf303a9275a6c03f6f930f105767ba/boston_marathon.geojson"
      )
        .then(response => response.json())
        .then(data => {
          pointTwo.value = data;
        });
    const get5ksegment = () =>
      fetch(
        "https://gist.githubusercontent.com/shortdiv/97d74e464a8900853bc89048a8244c84/raw/e9bbb80410f798e82171dfdf453e232ef251a4fc/BostonMarathon_firstsegment.geojson"
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          point.value = data;
        });
    onCreated(() => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiYWxscnlkZXIiLCJhIjoidWs5cUFfRSJ9.t8kxvO3nIhCaAl07-4lkNw";
      Promise.all([get5ksegment(), getMarathonRoute()]).then(() => {
        dataLoaded.value = true;
      });
    });
    return {
      point,
      pointTwo,
      dataLoaded,
      time: 6,
      time2: 100
    };
  }
};
</script>
