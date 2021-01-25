import Vue from "vue"
import Vuex from "vuex"
import router from '../router/index'
import axios from "axios"

axios.defaults.baseURL = process.env.API_URL;
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken:JSON.parse(localStorage.getItem('saveUserToken')),
    userInfo:JSON.parse(localStorage.getItem('setUserInfo')),
    detailCategory:null,
    detailId:null,
    loginErroMsg:null
  },
  getters: {},
  mutations: {
    saveDetail(state,payload){
      state.detailCategory = payload.page;
      state.detailId = payload.id;
    },
    LOGOUT(state,payload) {
      state.userToken = payload;
    },
    saveUserToken(state,payload){
      state.userToken = payload
    },
    setLoginErroMsg(state,payload){
      state.loginErroMsg = payload
    },
    setUserInfo(state,payload){
      state.userInfo = payload
    }
  },
  actions: {
    LOGIN({ commit }, { id, password }) {
      axios
      .post("/v1/signin", {
        userId: id,
        password: password,
      })
      .then(({data})=> {
        commit("setUserInfo", data.data.user)
        commit("saveUserToken", data.data.userToken)
        localStorage.setItem("setUserInfo",  JSON.stringify(data.data.user));
        localStorage.setItem("saveUserToken",  JSON.stringify(data.data.userToken));
        router.push("/"); 
      })
      .catch((error)=> {
        // console.log(error.response)
        if(error.response.data.code===-1001){
          commit("setLoginErroMsg", error.response.data.msg);
        } else {
          commit("setLoginErroMsg", error.response.data.msg);
        }
      });
    },
    LOGOUT({ commit }) {
      commit("LOGOUT");
      localStorage.removeItem("setUserInfo");
      localStorage.removeItem("saveUserToken");
      commit("setUserInfo", null)
        commit("saveUserToken", null)
      router.push("/"); 
    },
  },
})