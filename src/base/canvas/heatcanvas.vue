<template>
  <div id="cus_heat">
    <div id="heatmap" style="width: 877px;height: 410px;">
      <canvas id="heat_canvas" width="877" height="410"></canvas>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Heatmap from 'heatmap.js'
  import {localurl} from "common/js/global";
  export default {
    data() {
      return {
        heatData: [],
        base: null
      }
    },
    computed: {
      getHeateData(){
        return this.$store.state.canvas.heatmapData;
      }
    },
    watch:{
      getHeateData(val){
        this.initHeate(val);
      }
    },
    methods: {
      initHeate:function (value) {
        let heatmapInstance = Heatmap.create({
          container:  document.getElementById('heatmap'),
        });
        let len = value.length;
        value.forEach((value,index)=>{
          let points =  [];
          setTimeout(()=>{
            value.hetMapPositions.forEach((item)=>{
              let point = {
                x: item.x,
                y: item.y,
                value: item.value
              };
              points.push(point)
            });
            let data = {
              max: 5000,
              data: points
            };
            heatmapInstance.setData(data);
            if (index == len-1) {
              this.$message('绘制完毕');
            }
          },index*2000)
        });
      },
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
      },
    },
    mounted() {
      setTimeout(()=>{
        let code = this.$store.state.floor.floordata.buildingCode;
        let floor = this.$store.state.floor.selectValue;
        let mapsrc = 'common/img/home/'+ code + floor +'.jpg';

        this.initCanvas("heat_canvas","heatmap",mapsrc);

        window.onresize = () => {
          this.initCanvas("heat_canvas","heatmap",mapsrc);
        }
      },500)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #cus_heat
    width 877px
    height 410px

</style>

