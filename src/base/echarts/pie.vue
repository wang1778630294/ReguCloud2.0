<template>
    <div id="cus-pie">
      <div id="pieCharts"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {}
        },
        methods:{
          initPie:function () {
            let pieCharts = this.$echarts.init(document.getElementById('pieCharts'));
            let option = {
              title: {
                text: '异常情况分布',
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                data:['超出范围','断开连接']
              },
              series: [
                {
                  name:'异常情况',
                  type:'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data:[
                    {value:305, name:'超出范围'},
                    {value:310, name:'断开连接'},
                  ]
                }
              ]
            };
            pieCharts.setOption(option);
          }
        },
        mounted(){
          this.initPie();
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
#cus-pie
  width 100%
  height 100%
  padding 20px
  #pieCharts
    width 400px
    height 300px
    margin 0 auto

</style>

