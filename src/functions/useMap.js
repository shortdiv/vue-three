export default function useMap(mapInstance, options) {
  const { sourceId, mapId, data, color } = options;
  mapInstance.addSource(sourceId, {
    type: "geojson",
    data: data
  });
  mapInstance.addLayer({
    id: mapId,
    source: sourceId,
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": color
    }
  });
}
