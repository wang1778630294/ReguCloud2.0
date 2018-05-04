<template>

  <el-container id="admin-usermanage">
    <el-header height="40px">
      <el-form :inline="true" :model="filters" style="margin-top: 5px;">
        <el-form-item>
          <el-input size="small" v-model="filters.name" placeholder="搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-header>

    <el-main>
      <cus-admin-table></cus-admin-table>
    </el-main>

    <el-footer height="30px">
      <div class="page" style="width: 400px;margin: 0 auto;">
        <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </el-footer>

    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <cus-admin-table-dialog></cus-admin-table-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>


</template>

<script type="text/ecmascript-6">
  import {localurl} from "common/js/global";
  import axios from 'axios';
    export default {
        data() {
            return {
              filters: {
                name: ''
              },
              dialogVisible: false
            }
        },
      methods: {
        getUsers:function () {
          console.log('查询');
        },
        handleAdd:function () {
          this.dialogVisible = true;
        },
        handleClose(done) {
          done();
        },
        addUser:function () {
          this.dialogVisible = false;
          let parm = {
            deviceId: this.$store.state.table.formCode,
            userName: this.$store.state.table.formName,
            userGroup:this.$store.state.table.formGroup,
            fenceIds: this.$store.state.table.formValue
          }
          axios.defaults.headers['Content-Type'] = 'application/json'
          axios.post(localurl+'devicemanage/addUser',parm).then(res=>{
            this.$message('添加用户成功');
            this.$store.dispatch('get_user');
          })
        }
      },
      mounted(){
        this.$store.dispatch('get_user');
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

#admin-usermanage
  width 100%
  height 100%
  #page
    width 450px
    margin 0 auto
</style>

