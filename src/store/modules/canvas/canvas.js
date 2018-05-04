import {localurl} from "common/js/global";
import axios from 'axios'
let timer;
const state = {
  markerData : [],
  heatmapData: [],
}
export default {
  state,
  mutations:{
    get_marker_data(state){
      axios.get(localurl+'devicemanage/getUserRealStatus').then(res=>{
        state.markerData = res.data.data;
      })
    }
  },
  actions:{
    get_marker_data(context){
      context.commit('get_marker_data');
    }
  }
}
