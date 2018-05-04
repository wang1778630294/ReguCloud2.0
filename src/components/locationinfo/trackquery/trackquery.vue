<template>
  <el-container id="admin-trackquery">
    <el-header class="trackquery-header common-clearpadding" height="40px">
      <cus-floor></cus-floor>
    </el-header>
    <el-container>
      <el-aside width="450px" class="trackquery-aside">
        <el-container class="trackquery-table">
          <el-header height="160px" class="common-clearpadding" style="padding: 0;">
            <div style="margin-top: 10px">
            <el-date-picker
              v-model="startTimer"
              type="datetime"
              placeholder="开始ss日期"
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
            </div>
            <div style="margin-top: 10px">
            <el-select v-model="deviceId" clearable placeholder="请选择用户">
              <el-option
                v-for="user in $store.state.table.userData"
                :key="user.deviceId"
                :label="user.deviceId"
                :value="user.deviceId">
              </el-option>
            </el-select>
            <el-select v-model="duration" placeholder="选择时间范围">
              <el-option
                v-for="item in timeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
            <el-button size="small" style="margin-top: 10px;" type="primary" @click="getHistoryLinemap()">查询个人轨迹图</el-button>
          </el-header>
          <el-main class="common-clearpadding">
            <cus-table></cus-table>
          </el-main>
          <el-footer>
            <div class="home-page">
              <el-pagination
                layout="prev, pager, next"
                :total="1000">
              </el-pagination>
            </div>
          </el-footer>
        </el-container>
      </el-aside>
      <el-container>
        <el-main style="position: relative">
          <canvas id="line_can" width="877" height="410"></canvas>
          <cus-line-canvas></cus-line-canvas>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import {localurl} from "common/js/global";
  import axios from 'axios';
  export default {
    data() {
      return {
        timeoptions: [{
          value: '600',
          label: '十分钟'
        }, {
          value: '1800',
          label: '三十分钟'
        }, {
          value: '3600',
          label: '一小时'
        }, {
          value: '21600',
          label: '六小时'
        }, {
          value: '86400',
          label: '一天'
        }, {
          value: '604800',
          label: '一周'
        }],
        useroptions:[],
        buildingName: '',
        deviceId:'',
        duration:'',
        startTimer:'',
        isEnd:true,
        endTimer:'',
        pickerBeginDateEnd:{
          disabledDate: (time) => {
            let beginDateVal = this.startTimer;
            if (beginDateVal) {
              return time.getTime() < (beginDateVal-86300000) || time.getTime()>beginDateVal;
            }
          }
        },
        cas:null,
        ctx:null
      }
    },
    computed:{
      getUserData(){
        return this.$store.state.table.userData;
      }
    },
    watch:{
      startTimer:function (val, oldVal) {
        this.isEnd = false;
      },
      getUserData:function (val) {

      }
    },
    methods: {
      getBuilding(){
        axios.get(localurl + 'building/getBuilding').then((res)=>{
          this.buildingName = res.data.data.buildingName;
        })
      },
      getHistoryLinemap: function () {
        let params = {
          deviceId: this.deviceId,
          startTime:this.startTimer,
          endTime:this.endTimer,
          duration:this.duration
        };
        let odata = JSON.stringify(params);

        axios.post(localurl+'devicemanage/getUserTrack',params).then(res=>{
          if (res.data){
            let cvs = document.getElementById('line_can'); //画布
            this.ctx = cvs.getContext('2d'); // 画笔
            this.ctx.beginPath();
            let resdata = res.data.data.traceResults[0].floorLocations;
            for (let i = 1; i < resdata.length; i++){
              setTimeout(()=>{
                this.ctx.moveTo(Number(resdata[i-1].x),Number(resdata[i-1].y));
                this.ctx.lineTo(Number(resdata[i].x), Number(resdata[i].y));
                this.ctx.lineWidth = 1;
                this.ctx.strokeStyle = 'red';
                this.ctx.stroke();
                if (i == resdata.length-1) {
                  this.$message('绘制完毕');
                }
              },20*i)
            }
          }
        })
      }
    },
    mounted(){

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/common.styl"
  #admin-trackquery
    width 100%
    height 100%
    #line_can
      position absolute;
      left 20px
      top 20px
    .trackquery-aside
      border-right 1px solid #e6e6e6
      .trackquery-table
        height 100%
        .trackquery-page
          margin-top 20px



</style>

