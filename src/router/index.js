import Vue from 'vue'
import Router from 'vue-router'
import Monitor from 'components/home/monitor/monitor'
import Heatmap from 'components/locationinfo/heatmap/heatmap';
import TrackQuery from 'components/locationinfo/trackquery/trackquery'
import UserManage from 'components/usermanage/usermanage'
import UserGroup from 'components/usermanage/usergroup/usergroup'
import Fence from 'components/fence/fence'
import OverallRecord from 'components/alarminfo/overallrecord/overallrecord';
import QueryPeople from 'components/alarminfo/querypeople/querypeople';



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Monitor
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: Monitor
    },
    {
      path: '/heatmap',
      name: 'heatmap',
      component: Heatmap
    },
    {
      path: '/trackquery',
      name: 'trackquery',
      component: TrackQuery
    },
    {
      path: '/usermanage',
      name: 'usermanage',
      component: UserManage
    },
    {
      path: '/fence',
      name: 'fence',
      component: Fence
    },
    {
      path: '/querypeople',
      name: 'querypeople',
      component: QueryPeople
    },
    {
      path: '/overallrecord',
      name: 'overallrecord',
      component: OverallRecord
    },
    {
      path:'/usergroup',
      name:'/usergroup',
      component:UserGroup
    }
  ]
})
