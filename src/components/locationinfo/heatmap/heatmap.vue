<template>
  <el-container id="admin-heatmap">
    <el-header class="heatmap-header common-clearpadding" height="40px">
      <cus-floor></cus-floor>
    </el-header>
    <el-container>
      <el-aside width="450px" class="heatmap-aside">
        <div class="heatmap-switch">
          <el-switch
            style="display: block"
            v-model="realOrHistory"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="历史记录"
            inactive-text="实时查询">
          </el-switch>
        </div>
        <div v-if="realOrHistory"  style="margin-top: 20px">
          <el-date-picker
            v-model="startTimer"
            type="datetime"
            placeholder="开始日期"
            value-format="timestamp">
          </el-date-picker>
          <el-date-picker
            v-model="endTimer"
            type="datetime"
            :disabled="isEnd"
            :picker-options="pickerBeginDateEnd"
            placeholder="结束日期"
            value-format="timestamp">
          </el-date-picker>
          <el-select style="margin-top: 20px;width: 220px;" v-model="minutes" placeholder="间隔时长">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button size="small" type="primary" @click="getHistoryHeatmap()">查询历史热力图</el-button>
          <el-button size="small" type="primary">取消播放</el-button>
        </div>
      </el-aside>
      <el-container>
        <el-main
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.3)">

          <cus-heat-canvas v-if="realOrHistory"></cus-heat-canvas>
          <div v-if="!realOrHistory" id="realheatmap" style="width: 877px;height: 410px;">
            <canvas id="realheat_canvas" width="877" height="410"></canvas>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
    import {localurl} from "common/js/global";
    import axios from 'axios';
    import Heatmap from 'heatmap.js'
    export default {
        data() {
            return {
              loading:false,
              realOrHistory:false,
              startTimer:'',
              endTimer:'',
              isEnd:true,
              pickerBeginDateEnd:{
                disabledDate: (time) => {
                  let beginDateVal = this.startTimer;
                  if (beginDateVal) {
                    return time.getTime() < (beginDateVal-86300000) || time.getTime()>beginDateVal;
                  }
                }
              },
              minutes:'',
              options: [{
                value: '10',
                label: '十分钟'
              }, {
                value: '20',
                label: '二十分钟'
              }, {
                value: '30',
                label: '三十分钟'
              }],
              heatmapData:[],
              timer:null,
              heatmapInstance:null
            }
        },
        computed:{
          getMarkerData(){
            return this.$store.state.canvas.markerData;
          }
        },
        watch:{
          startTimer:function (val, oldVal) {
            this.isEnd = false;
          },
          realOrHistory:function (val) {
            if (!val) {
              setTimeout(()=>{
                let code = this.$store.state.floor.floordata.buildingCode;
                let floor = this.$store.state.floor.selectValue;
                let mapsrc = 'common/img/home/'+ code + floor +'.jpg';

                this.initCanvas("realheat_canvas","realheatmap",mapsrc);
              },500)

              this.timer = setInterval(()=>{
                this.$store.dispatch('get_marker_data');
              },2000)
            }
            if (val) {
              clearInterval(this.timer);
            }
          },
          getMarkerData:function (val) {
            this.realtimeHeat(val);
          }
        },
        methods: {
          getHistoryHeatmap:function () {
            // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            if (this.$store.state.floor.selectValue && this.startTimer && this.endTimer && this.minutes) {
              this.loading = true;

              let params = '?floor='+this.$store.state.floor.selectValue+'&startTime='+this.startTimer+'&endTime='+this.endTimer+'&minutes='+this.minutes;

              axios.post(localurl+'building/getHistoryHeatmap'+params).then((res)=>{
                this.loading = false;
                this.$store.state.canvas.heatmapData = res.data.data;
              });

            }else {
              this.$message('您需要输入开始日期,结束日期,间隔时长');
            }
          },
          realtimeHeat:function (value) {
            if (this.heatmapInstance==null) {
              this.heatmapInstance = Heatmap.create({
                container: document.getElementById('realheatmap'),
              });
            }
            let points = [];
            let len = value.length;
            while (len--) {
              if (value[len].position) {
                let point = {
                  x: Math.floor(value[len].position.corx),
                  y: Math.floor(value[len].position.cory),
                  value: 10
                };
                points.push(point);
              }
            }
            let data = {
              max: 50,
              data: points
            };
            this.heatmapInstance.setData(data);
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
        mounted(){
          this.timer = setInterval(()=>{
            this.$store.dispatch('get_marker_data');
          },2000)
          setTimeout(()=>{
            let code = this.$store.state.floor.floordata.buildingCode;
            let floor = this.$store.state.floor.selectValue;
            let mapsrc = 'common/img/home/'+ code + floor +'.jpg';

            this.initCanvas("realheat_canvas","realheatmap",mapsrc);


          },500)
        },
        beforeDestroy(){
          clearInterval(this.timer);
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/common.styl"
  #admin-heatmap
    width 100%
    height 100%
    .heatmap-aside
      border-right 1px solid #e6e6e6
      .heatmap-switch
        margin-top 20px
        padding 10px

</style>

