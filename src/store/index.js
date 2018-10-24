import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as state from './state'
import * as getters from './getters'
import * as actions from './actions'
import user from './modules/user'
import auth from './modules/auth'
import banner from './modules/banner'
import photo from './modules/work/photo'
import video from './modules/work/video'
import movie from './modules/work/movie'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    user,
    auth,
    banner,
    photo,
    video,
    movie
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
