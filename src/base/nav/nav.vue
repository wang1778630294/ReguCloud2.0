<template>
    <div id="" style="height: 100%;">
      <el-row class="tac" style="height: 100%;">
        <el-col :span="24" style="height: 100%;">
          <el-menu
            style="height: 100%;"
            default-active="2"
            class="el-menu-vertical-demo"
            :default-active="active"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>主界面</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="monitor" @click="reouterTo('/monitor')">
                  实时监控
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">位置信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="heatmap" @click="reouterTo('/heatmap')">热力图</el-menu-item>
                <el-menu-item index="trackquery" @click="reouterTo('/trackquery')">轨迹查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="usermanage" @click="reouterTo('/usermanage')">用户管理</el-menu-item>
                <el-menu-item index="usergroup" @click="reouterTo('/usergroup')">用户组管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>


            <el-menu-item index="fence" @click="reouterTo('/fence')">
              <i class="el-icon-news"></i>
              <span slot="title">电子围栏</span>
            </el-menu-item>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-warning"></i>
                <span slot="title">报警信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="querypeople" @click="reouterTo('/querypeople')">个人查询</el-menu-item>
                <!--<el-menu-item index="5-2" @click="reouterTo('/overallrecord')">总体记录</el-menu-item>-->
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
              active:''
            }
        },
        methods:{
          handleOpen:function () {

          },
          handleClose:function () {

          },
          reouterTo: function (pth) {
            this.$router.push({path:pth});
          },
          activeEle:function () {
            let localurl = (window.location.href).split('/');
            if(localurl[localurl.length-1]){
              this.active = localurl[localurl.length-1];
            }else {
              this.active = 'monitor';
            }

          }
        },
        mounted(){
          this.activeEle();
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

