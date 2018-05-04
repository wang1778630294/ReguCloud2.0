<template>
  <el-container class="admin-container">
    <el-header class="admin-header">
      <cus-header></cus-header>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <cus-nav></cus-nav>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!--<el-footer>Footer</el-footer>-->
  </el-container>

</template>

<script type="text/ecmascript-6">
export default {
  name: 'App',
  data() {
    return {

    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .admin-container
    width 100%
    height 100%
    .admin-header
      padding 0
</style>
