<template>
    <div id="">
      <el-form label-width="80px" ref="addForm">
        <el-form-item label="编号" prop="code">
          <el-input v-model="formCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formName"></el-input>
        </el-form-item>
        <el-form-item label="用户分组" prop="group">
          <el-select v-model="formValue" filterable placeholder="请选择">
            <el-option
              v-for="item in userGroupData"
              :key="item.fenceIds"
              :label="item.userGroup"
              :value="item.fenceIds">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
  import {localurl} from "common/js/global";
  import axios from 'axios';
    export default {
        data() {
            return {
              addFormRules: {
                code: [
                  { required: true, message: '请输编号', trigger: 'blur' }
                ],
                name: [
                  {required: true,  message: '请输入名称', trigger: 'blur'}
                ],
                group: [
                  {required: true, message: '请选择围栏分组', trigger: 'blur'}
                ]
              },
              formName:'',
              formCode:'',
              formValue:'',
              fenceData: [],
              userGroupData:[]
            }
        },
        computed: {
          getformName(){
            return this.formName;
          },
          getformCode(){
            return this.formCode;
          },
          getformValue(){
            return this.formValue;
          }
        },
        watch:{
          getformName:function (val) {
            this.$store.state.table.formName = val;
            console.log(this.$store.state.table.formName)
          },
          getformCode:function (val) {
            this.$store.state.table.formCode = val;
          },
          getformValue:function (val) {
            this.$store.state.table.formValue = val;

            this.userGroupData.forEach((item)=>{
              if (item.fenceIds == val) {
                this.$store.state.table.formGroup = item.userGroup;
              }
            })

          }
        },
        methods:{
          getUserGroup:function () {
            axios.post(localurl+'usergroupmanager/getallusergroup').then(res=>{
              this.userGroupData = res.data.data;
            })
          },
        },
        mounted(){
          this.$store.dispatch('get_fence');
          this.getUserGroup();
        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

