import { value, state } from "vue-function-api";
var turf = require("turf");

export default function useWaypoint(route, timeperiod) {
  const waypointVal = value({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: route.geometry.coordinates[0]
    }
  });
  var from = turf.point(route.geometry.coordinates[0]);
  var to = turf.point(
    route.geometry.coordinates[route.geometry.coordinates.length - 1]
  );
  var distance = turf.distance(from, to) * 1000;
  const movePoint = () => {
    const waypointState = state({
      timestamp: performance.now(),
      raf: null
    });
    const animateMarker = () => {
      let time = performance.now(); //ms
      const duration = timeperiod * 1000; // 6000ms or 6s
      let speed = distance / duration; //in m
      const path = turf.lineString(route.geometry.coordinates);
      const timeElapsed = time - waypointState.timestamp;
      if (timeElapsed * speed >= distance) {
        cancelAnimationFrame(waypointState.raf);
      } else {
        var distTravelled = timeElapsed * speed;
        waypointVal.value = turf.along(path, distTravelled, "meters");
        waypointState.raf = requestAnimationFrame(animateMarker.bind(this));
      }
    };
    //move to outside func//
    waypointState.raf = requestAnimationFrame(animateMarker.bind(this));
  };
  movePoint();
  return waypointVal;
}
