import Vue from 'vue'
import Vuex from 'vuex'
import table from './modules/table/table'
import floor from './modules/floor/floor'
import canvas from './modules/canvas/canvas'
import fence from './modules/fence/fence'
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    table,
    floor,
    canvas,
    fence
  }
})
