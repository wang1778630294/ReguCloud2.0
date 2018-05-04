<template>
    <div id="cus-table">
      <el-table
        :data="$store.state.table.userAllData"
        border>
        <el-table-column
          prop="user.deviceId"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="user.userName"
          label="姓名"
          width="80">
        </el-table-column>
        <el-table-column
          width="80"
          label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.user.currentStatus==1" size="medium">{{ scope.row.user.currentStatus | currentStatus}}</el-tag>
            <el-tag v-if="scope.row.user.currentStatus==2" type="warning" size="medium">{{ scope.row.user.currentStatus | currentStatus}}</el-tag>
            <el-tag v-if="scope.row.user.currentStatus==3" type="danger" size="medium">{{ scope.row.user.currentStatus | currentStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="操作"
          width="60">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="share(scope.$index, scope.row)"
              type="text"
              size="small">
              &nbsp; <i class="el-icon-share"></i>
            </el-button>
            &nbsp;
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {

            }
        },
        filters: {
          currentStatus: function (val) {
            return val == 1 ? '正常' : val == 2 ? '消失' : '越界';
          },
        },
        computed: {
          userAllData() {
            // 這樣就是根據 type 來過濾
            return this.$store.state.table.userAllData.filter( (item) => {
              if (item.user.currentStatus == 1) {
                item.user.currentStatus = '正常'
              }else if (item.user.currentStatus == 2) {
                item.user.currentStatus = '消失'
              }else if (item.user.currentStatus == 3) {
                item.user.currentStatus = '越界'
              }
            } )
          }
        },
        methods: {
          share: function (index,data) {

          }
        },
        mounted(){
          this.$store.dispatch('get_user');
          this.$store.dispatch('get_user_all');
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

