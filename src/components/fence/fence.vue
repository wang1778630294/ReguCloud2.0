<template>
    <el-container id="admin-fence">
      <el-header class="trackquery-header common-clearpadding" height="40px">
        <cus-floor></cus-floor>
      </el-header>
      <el-container>
        <el-aside width="450px">
          <el-container class="fence-table">
            <el-header height="80px" class="common-clearpadding">
              <el-button class="button" type="primary" size="small" @click="drawFence()">新增围栏</el-button>
              <el-button class="button" type="primary" size="small" @click="drawCom()">绘制完成</el-button>
              <el-button class="button" type="danger" size="small" @click="clearCan()">清空画布</el-button>
            </el-header>
            <el-main class="common-clearpadding">
              <el-table
                :data="fenceData"
                @row-click="selectRow"
                border>
                <el-table-column
                  prop="fenceId"
                  label="围栏ID">
                </el-table-column>
                <el-table-column
                  prop="fenceName"
                  label="围栏名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="floor"
                  width="80"
                  label="楼层">
                </el-table-column>
                <el-table-column
                  prop="tag"
                  label="删除"
                  width="80">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="del(scope.$index, scope.row)"
                      type="text"
                      size="small">
                      &nbsp; <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
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
        <el-main style="width: 100%;height: 100%;">
          <div id="main">
            <canvas id="imgcanvas" width="877" height="410"></canvas>
            <canvas id="fencecanvas" width="877" height="410"></canvas>
          </div>
        </el-main>
      </el-container>

      <el-dialog
        title="新增"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <el-form label-width="80px" ref="addForm">
          <el-form-item label="围栏ID" prop="code">
            <el-input v-model="fenceld" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="围栏名称" prop="name">
            <el-input v-model="fenceName"></el-input>
          </el-form-item>
          <el-form-item label="楼层" prop="group">
            <el-select v-model="floor" filterable placeholder="请选择">
              <el-option
                v-for="item in $store.state.floor.floordata.floors"
                :key="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
      </el-dialog>

    </el-container>
</template>

<script type="text/ecmascript-6">
  import {localurl} from "common/js/global";
  import axios from 'axios';
  import fence from "../../store/modules/fence/fence";
  let linecanvas = null;
  let linectx = null;
  let fenceArr = [];
  export default {
    data() {
      return {
        selectvalue:'',
        isDraw:false,
        ctx:null,
        fenceData: [],
        dialogVisible: false,
        addFormRules: {
          code: [
            { required: true, message: '请输入围栏ID', trigger: 'blur' }
          ],
          name: [
            {required: true,  message: '请输入围栏名称', trigger: 'blur'}
          ],
          group: [
            {required: true, message: '请输入楼层', trigger: 'blur'}
          ]
        },
        fenceName:'',
        fenceld:'',
        floor:'',
        options: []
      }
    },
    methods:{
      selectRow(row){
        this.clearCan();
        let cvs = document.getElementById('fencecanvas'); //画布
        let ctx = cvs.getContext('2d'); // 画笔
        ctx.beginPath();
        let resdata = row.fenceData.split(',');
        let statLine = resdata[0].split('/');
        ctx.moveTo(Number(statLine[0]),Number(statLine[1]));
        for (let i = 1; i < resdata.length-1; i++){
            let linedata = resdata[i].split('/');
            ctx.lineTo(Number(linedata[0]), Number(linedata[1]));
            if (i == resdata.length-2) {
              ctx.lineTo(Number(statLine[0]), Number(statLine[1]));
            }
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }
      },
      del(index,item){
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(localurl+'fenceManager/deletefence?fenceId='+item.fenceId).then(res=>{
            this.$message(res.data.msg);
            this.getFence();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      add(){
        let stry = ""
        for(var i in fenceArr) {
          for (var j in fenceArr[i]){
            if (j == 'y'){
              stry += "/"+fenceArr[i][j];
            }else{
              stry += fenceArr[i][j];
            }
          }
          stry += ","
        }
        let parm = JSON.stringify({
          floor: this.floor,
          fenceId: this.fenceld,
          fenceName: this.fenceName,
          fenceData: stry
        })
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.post(localurl+'fenceManager/addFence',parm).then(res=>{
          this.$message('提交成功');
          this.getFence();
        })
        fenceArr = [];
        this.dialogVisible = false;
      },
      handleClose(done) {
        done();
      },
      createCanvas(){
        setTimeout(()=>{
          let canvas = document.getElementById('imgcanvas');
          let con = document.getElementById('main');
          let ctx = canvas.getContext('2d');
          let canimg = new Image();
          let code = this.$store.state.floor.floordata.buildingCode;
          let floor = this.$store.state.floor.selectValue;
          let mapsrc =require('@/common/img/home/'+ code + floor +'.jpg');
          canimg.src = mapsrc;
          canimg.onload = function () {
            let base = con.clientWidth / canimg.width;
            ctx.drawImage(canimg,0,0,canimg.width*base,canimg.height*base);
          }
        },500);
      },
      drawFence(){
        this.isDraw = true;
        linecanvas = null;
        linectx = null;
        linecanvas = document.getElementById('fencecanvas');
        linectx = linecanvas.getContext('2d');
        let _that = this;
        fenceArr = [];
        linectx.beginPath();
        linecanvas.onclick = function (event) {
          if (_that.isDraw){
            let x = event.offsetX-linecanvas.offsetLeft;
            let y = event.offsetY-linecanvas.offsetTop;
            if (!fenceArr.length) {
              linectx.moveTo(x,y);
            }else {
              linectx.lineTo(x,y);
            }
            linectx.lineWidth = 1;
            linectx.strokeStyle = 'red';
            linectx.stroke();
            fenceArr.push({
              x:x,
              y:y
            })
          }
        }
      },
      clearCan(){
        if (fenceArr.length>0) {
          linectx.clearRect(0,0,linecanvas.width,linecanvas.height);
          fenceArr = [];
        }
      },
      drawCom(){
        if (fenceArr.length>0) {
          this.dialogVisible = true;
          linectx.closePath();
          linectx.stroke();
        }else {
          this.$message('请在右侧图中绘制围栏');
        }
      },
      getFence: function () {
        axios.get(localurl+'fenceManager/getallfence').then(res=>{
          this.fenceData = res.data.data;
        });
      }
    },
    mounted(){
      this.createCanvas();
      this.$store.dispatch('get_user');
      this.getFence();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/common.styl"
#admin-fence
  widows 100%
  height 100%
  .button
    margin-top 20px
  .fence-table
    width 100%
    height 100%
  #main
    width 877px
    height 410px
    position relative
    #fencecanvas
      position absolute
      left 0
      top 0
</style>

