<template>
  <el-container id="admin-home">
    <el-header class="home-header common-clearpadding" height="40px">
      <cus-floor></cus-floor>
    </el-header>
    <el-container>
      <el-aside width="450px" class="home-aside">
        <el-container class="home-info-show">
          <el-header height="120px" class="common-clearpadding">
            <el-card>
              <el-input
                placeholder="请输入内容"
                v-model="keyword" size="small">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <div class="home-search">
                <span class="span">状态:</span>
                <el-button class="normal" size="small" @click="markerState(1)">正常</el-button>
                <el-button class="" size="small" @click="markerState(2)">消失</el-button>
                <el-button class="" size="small" @click="markerState(3)">越界</el-button>
                <el-button class="" size="small" @click="markerState(0)">全部</el-button>
              </div>
            </el-card>
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
        <el-main>
          <cus-canvas></cus-canvas>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        keyword:''
      }
    },
    methods: {
      markerState(state){
        this.$store.table.userState = state;
        this.$store.dispatch('get_user_all');
      }
    },
    mounted(){

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/common.styl"
  #admin-home
    width 100%
    height 100%
    .home-header
      .home-select
        width 328px
      .zoom-small
        margin 0
      .zoom-show
        margin-left 50px
    .home-aside
      border-right 1px solid #e6e6e6
      .home-info-show
        height 100%
        .home-page
          margin-top 20px
      .home-search
        margin-top 14px
        .span
          line-height 32px
        .normal
          margin-left 20px


</style>

