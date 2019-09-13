<script>
import useWaypoint from "../functions/useWaypoint.js";
import { watch } from "@vue/composition-api";

export default {
  name: "PointLayer",
  props: {
    map: Object,
    data: Object,
    sourceId: String,
    time: Number
  },
  setup(props) {
    const waypointVal = useWaypoint(props.data, props.time); // logic inside useLogicA may mutate valueA
    watch(
      () => waypointVal.value,
      val => {
        if (props.map.getSource(props.sourceId) !== undefined) {
          props.map.getSource(props.sourceId).setData(val);
        }
      }
    );
  },
  render() {
    return null;
  }
};
</script>
