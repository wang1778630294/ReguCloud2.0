import {localurl} from "common/js/global";
import axios from 'axios'
const state = {
  fence : []
};

export default {
  state,
  mutations:{
    get_fence(state){
      axios.get(localurl+'fenceManager/getfloorfence').then((res)=>{
        if (res.status == 200){
          state.fence = res.data.data;
        }
      })
    }
  },
  actions:{
    get_fence(context){
      context.commit('get_fence');
    }
  }
}
