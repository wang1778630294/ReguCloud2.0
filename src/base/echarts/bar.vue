<template>
    <div id="cus-bar">
      <el-row>
        <el-col :span="6">
          <el-table
            :data="tableData">
            <el-table-column
              prop="date"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="18">
          <div id="barCharts"></div>
        </el-col>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
              tableData: [{
                date: '20170929670',
                name: '张东',
              }, {
                date: '20170929671',
                name: '王华',
              }, {
                date: '20170929672',
                name: '赵明',
              }]
            }
        },
        methods: {
          initBar:function () {
            let barCharts = this.$echarts.init(document.getElementById('barCharts'));
            let option = {
              title: {
                text: '每人每天异常记录',
                subtext: ''
              },
              color: ['#3398DB'],
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis : [
                {
                  type : 'category',
                  data: ['12/14', '12/15', '12/16', '12/17', '12/18', '12/19', '12/20'],
                  axisTick: {
                    alignWithLabel: true
                  }
                }
              ],
              yAxis : [
                {
                  type : 'value'
                }
              ],
              series : [
                {
                  name:'异常记录',
                  type:'bar',
                  barWidth: '60%',
                  data: [1, 8, 3, 2, 8, 5, 2],
                }
              ]
            };
            barCharts.setOption(option);
          }
        },
        mounted(){
          this.initBar();
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
#cus-bar
  width 100%
  height 100%
  #barCharts
    width 650px
    height 300px
</style>

