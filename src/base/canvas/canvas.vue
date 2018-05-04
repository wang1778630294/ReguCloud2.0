<template>
    <div id="canvas_container">
      <canvas id="canvas" width="877" height="410"></canvas>
    </div>
</template>

<script type="text/ecmascript-6">
  import drawCanvas from 'common/js/createmap.js';
  import {localurl} from "common/js/global";
  export default {
    data() {
        return {
          timer: null
        }
    },
    computed:{
      getMarkerData(){
        return this.$store.state.canvas.markerData;
      }
    },
    watch:{
      getMarkerData(val){
        this.initMap();
      }
    },
    methods: {
      getMarker:function () {
        if (this.timer) {
          clearInterval(this.timer);
        }
      },
      initMap:function () {
          let code = this.$store.state.floor.floordata.buildingCode;
          let floor = this.$store.state.floor.selectValue;
          let mapsrc = 'common/img/home/'+ code + floor +'.jpg';

          drawCanvas.initCanvas("canvas","canvas_container",mapsrc);
          drawCanvas.createMarker(this.$store.state.canvas.markerData);

          window.onresize = () => {
            drawCanvas.initCanvas("canvas","canvas_container",mapsrc);
            drawCanvas.createMarker(this.$store.state.canvas.markerData);
          }
      }
    },
    mounted() {
      this.getMarker();
      this.timer = setInterval(()=>{
        this.$store.dispatch('get_marker_data');
      },2000)
    },
    beforeDestroy: function () {
      clearInterval(this.timer);
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
#canvas_container
  width 877px
  height 410px

</style>

