<template>
    <div id="floor">
      <el-select class="home-select" v-model="$store.state.floor.selectValue" placeholder="请选择楼层" size="small">
        <el-option
          v-for="item in $store.state.floor.floordata.floors"
          :key="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button class="zoom-big" type="primary" size="small">放大</el-button>
      <el-button class="zoom-small" type="primary" size="small">缩小</el-button>
      <el-tag class="zoom-show">当前场景: {{$store.state.floor.floordata.buildingName}}</el-tag>
      <el-tag class="zoom-show">当前显示楼层: {{$store.state.floor.selectValue}}</el-tag>
    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import {localurl} from "common/js/global";
  export default {
    data() {
        return {

        }
    },
    methods:{
      getBuilding:function () {
        axios.get(
          localurl+ 'building/getBuilding'
        ).then(
          (res) => {
            this.$store.state.floor.floordata = res.data.data;
          }
        ).catch(

        )
      }
    },
    mounted(){
      this.getBuilding();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

