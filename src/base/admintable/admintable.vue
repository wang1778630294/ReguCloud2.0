<template>
  <div id="cus-admintable">
    <el-table
      :data="$store.state.table.userData">
      <el-table-column
        prop="deviceId"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="userGroup"
        label="用户组">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


  </div>
</template>

<script type="text/ecmascript-6">
  import {localurl} from "common/js/global";
  import axios from 'axios';
  export default {
    data() {
      return {

      }
    },
    methods: {
      handleEdit: function (index,data) {
        console.log('bianji ');
        console.log(this.$store.state.table.userData)
        // devicemanage/deleteuser



      },
      handleDelete: function (index,value) {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(localurl+'devicemanage/deleteuser?deviceId='+value.deviceId).then(res=>{
            this.$message(res.data.msg);
            this.$store.dispatch('get_user');
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

