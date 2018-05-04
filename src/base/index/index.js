import CusHeader from 'base/header/header.vue';
import CusNav from 'base/nav/nav.vue';
import CusCanvas from 'base/canvas/canvas';
import CusHeatCanvas from 'base/canvas/heatcanvas';
import CusLineCanvas from 'base/canvas/linecanvas';
import CusFloor from 'base/floor/floor';
import CusTable from 'base/table/table';
import CusAdminTable from 'base/admintable/admintable';
import CusAdminTableDialog from 'base/admintable/admintabledialog';
import CusGauge from 'base/echarts/gauge';
import CusLine from 'base/echarts/line';
import CusBar from 'base/echarts/bar';
import CusPie from 'base/echarts/pie';

export default {
  install: function (Vue) {
    Vue.component('cus-header',CusHeader);
    Vue.component('cus-nav',CusNav);
    Vue.component('cus-canvas',CusCanvas);
    Vue.component('cus-heat-canvas',CusHeatCanvas);
    Vue.component('cus-floor',CusFloor);
    Vue.component('cus-table',CusTable);
    Vue.component('cus-admin-table',CusAdminTable);
    Vue.component('cus-admin-table-dialog',CusAdminTableDialog);
    Vue.component('cus-gauge',CusGauge);
    Vue.component('cus-line',CusLine);
    Vue.component('cus-bar',CusBar);
    Vue.component('cus-pie',CusPie);
    Vue.component('cus-line-canvas',CusLineCanvas);
  }
}
