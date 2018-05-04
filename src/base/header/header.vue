<template>
  <div>
    <el-menu
      class="el-menu"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item class="el-logo" index="5">中科劲点定位监控平台</el-menu-item>
      <el-menu-item class="el-item" index="1"> <i class="el-icon-upload"></i> Welcome,Admin!</el-menu-item>
      <el-menu-item class="el-item" index="2"> <i class="el-icon-message"></i> </el-menu-item>
      <el-menu-item class="el-item" index="3"> <i class="el-icon-warning"></i> </el-menu-item>
      <el-menu-item class="el-item" index="4"><i class="el-icon-setting"></i></el-menu-item>

    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-menu
    .el-item
      float right
    .el-logo
      font-size 20px;
      font-weight bold
</style>

