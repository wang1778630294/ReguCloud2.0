<template>
  <div id="cus_heat">
    <canvas id="line_canvas" width="877" height="410"></canvas>
  </div>
</template>

<script type="text/ecmascript-6">


  import {localurl} from "common/js/global";
  export default {
    data() {
      return {
        heatData: [],
        base: null
      }
    },
    methods: {
      initCanvas: function (id, container,mapsrc) {
        let con = document.getElementById(container);
        let canvas = document.getElementById(id);
        let ctx = canvas.getContext('2d');
        let img = new Image();
        canvas.width = con.clientWidth;
        canvas.height = con.clientHeight;
        img.src = require('@/'+mapsrc);
        img.onload = function () {
          this.base = con.clientWidth / img.width;
          ctx.drawImage(img, 0, 0,img.width*this.base,img.height*this.base);
        };
      }
    },
    mounted() {
      setTimeout(()=>{
        let code = this.$store.state.floor.floordata.buildingCode;
        let floor = this.$store.state.floor.selectValue;
        let mapsrc = 'common/img/home/'+ code + floor +'.jpg';

        this.initCanvas("line_canvas","cus_heat",mapsrc);

        // window.onresize = () => {
        //   this.initCanvas("line_canvas","cus_heat",mapsrc);
        // }

      },500)

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #cus_heat
    width 877px
    height 410px

</style>

