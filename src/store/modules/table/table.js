import {localurl} from "common/js/global";
import axios from 'axios'
const state = {
  userData : [],
  fromName: '',
  fromCode: '',
  fromValue: '',
  formGroup: '',
  userAllData: [],
  userState: 0
};

export default {
  state,
  mutations:{
    get_user(state){
      axios.get(localurl+'devicemanage/getAllUser').then((res)=>{
        if (res.status == 200){
          state.userData = res.data.data;
        }
      })
    },
    get_user_all(state){
      axios.get(localurl+'devicemanage/getUserRealStatus').then(res=>{
        if (res.status == 200) {
          if (state.userState === 0) {
            state.userAllData = res.data.data;
          }else {
            state.userAllData = res.data.data.filter(function (user) {
              return user.user.state == state.userState;
            })
          }
        }
      })
    }
  },
  actions:{
    get_user(context){
      context.commit('get_user');
    },
    get_user_all(context){
      context.commit('get_user_all')
    }
  }
}
