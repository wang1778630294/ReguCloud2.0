<template>

  <el-container id="admin-usergroup">
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

      <el-table
        :data="userGroupData">
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="userGroup"
          label="用户组名称">
        </el-table-column>
        <el-table-column
          prop="fenceIds"
          label="用户分组编号">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">围栏</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>


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

      <el-form label-width="80px" ref="addForm">
        <el-form-item label="编号:" prop="code" label-width="100px">
          <el-input v-model="formCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组名称:" prop="name" label-width="100px">
          <el-input v-model="formName"></el-input>
        </el-form-item>
        <el-form-item label="围栏选择:" prop="group" label-width="100px">
          <el-select v-model="formValue" filterable placeholder="请选择">
            <el-option
              v-for="item in fenceData"
              :key="item.fenceId"
              :label="item.fenceName"
              :value="item.fenceId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserGroup()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="更新围栏"
      :visible.sync="dialogFence"
      width="50%"
      :before-close="handleClose">
      <el-select v-model="formValue" filterable placeholder="请选择围栏" style="width: 100%;">
        <el-option
          v-for="item in fenceData"
          :key="item.fenceId"
          :label="item.fenceName"
          :value="item.fenceId">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFence = false">取 消</el-button>
        <el-button type="primary" @click="updateGroup()">确 定</el-button>
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
        dialogVisible: false,
        addFormRules: {
          code: [
            { required: true, message: '请输编号', trigger: 'blur' }
          ],
          name: [
            {required: true,  message: '请输用户组名称', trigger: 'blur'}
          ],
          group: [
            {required: true, message: '请选择围栏分组', trigger: 'blur'}
          ]
        },
        formName:'',
        formCode:'',
        formValue:'',
        fenceData: [],
        userGroupData:[],
        dialogFence:false,
        fenceIds:'',
        userGroup:'',
        userId:''
      }
    },
    methods: {
      updateGroup:function () {
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        axios.post(localurl+'usergroupmanager/updateusergroup?fenceIds='+this.formValue+'&userGroup='+this.userGroup+'&id='+this.userId).then(res=>{
          this.getUserGroup();
          this.dialogFence = false;
          this.$message(res.data.msg);
        })
      },
      handleEdit:function (index,val) {
        this.dialogFence = true;

        this.userGroup = val.userGroup;
        this.userId = val.id;
      },
      handleDelete:function (index,item) {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(localurl+'usergroupmanager/deleteusergroup?userGroup='+item.userGroup).then(res=>{
            this.$message(res.data.msg);
            this.getUserGroup();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getUsers:function () {
        console.log('查询');
      },
      handleAdd:function () {
        this.dialogVisible = true;
      },
      getUserGroup:function () {
        axios.post(localurl+'usergroupmanager/getallusergroup').then(res=>{
          this.userGroupData = res.data.data;
        })
      },
      handleAdd:function () {
        this.dialogVisible = true;
      },
      handleClose(done) {
        done();
      },
      addUserGroup:function () {
        this.dialogVisible = false;

        let parm = {
          fenceIds: this.formValue,
          userGroup: this.formName,
        }
        let parmae = JSON.stringify(parm);
        // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post(localurl+'usergroupmanager/addusergroup?fenceIds='+this.formValue+'&userGroup='+this.formName).then(res=>{
          this.$message(res.data.msg);
          this.getUserGroup();
        })
      },
      getFence: function () {
        axios.get(localurl+'fenceManager/getallfence').then(res=>{
          this.fenceData = res.data.data;
        });
      }
    },
    mounted(){
      this.getUserGroup();
      this.getFence();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  #admin-usergroup
    width 100%
    height 100%
    #page
      width 450px
      margin 0 auto
</style>

