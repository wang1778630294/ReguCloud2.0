<template>
    <div id="cus-line">
      <div id="lineChart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {}
        },
        methods:{
          initLine:function () {
            let lineChart = this.$echarts.init(document.getElementById('lineChart'));
            let option = {
              title: {
                text: '历史异常统计',
                subtext: ''
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross'
                }
              },
              toolbox: {
                show: true,
                feature: {
                  saveAsImage: {}
                }
              },
              xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: ['12/14', '12/15', '12/16', '12/17', '12/18', '12/19', '12/20']
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value}个'
                },
                axisPointer: {
                  snap: true
                }
              },
              visualMap: {
                show: false,
                dimension: 0,
                pieces: [{
                  lte: 6,
                  color: 'green'
                }, {
                  gt: 5,
                  lte: 8,
                  color: 'red'
                }]
              },
              series: [
                {
                  name:'异常记录',
                  type:'line',
                  smooth: true,
                  data: [0, 8, 3, 2, 8, 5, 2],
                }
              ]
            };

            lineChart.setOption(option);
          }
        },
        mounted(){
          this.initLine();
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #cus-line
    width 100%
    height 100%
    #lineChart
      width 500px
      height 300px
      margin 0 auto
</style>

