<template>
  <MapboxMap
    :style="{
      height: height + 'px'
    }"
    :access-token="MAPBOX_API"
    map-style="mapbox://styles/mapbox/streets-v11"
    :center="latLong"
    :zoom="zoom"
  >
    <MapboxMarker :lng-lat="latLong" />
  </MapboxMap>
</template>

<script>
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
  components: {
    MapboxMap,
    MapboxMarker
  },
  props: {
    latLong: {
      type: Array,
      default: [0, 0]
    },
    height: {
      type: Number,
      default: 0
    },
    zoom: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      MAPBOX_API: import.meta.env.VITE_MAPBOX_API
    }
  }
}
</script>
