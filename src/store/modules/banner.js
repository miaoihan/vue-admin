import * as types from 'store/mutation-types'
import dataService from 'services/dataService'
import { Notification } from 'element-ui'

const state = {
  list: [],
  profile: {},
  total: 0
}

const getters = {
  banners: state => state.list,
  banner: state => state.profile
}

const actions = {
  loadBanners ({ commit }) {
    commit(types.QUERY_LIST, {loading: true})
    dataService.getBannerList().then(data => {
      commit(types.LOAD_BANNER, data.body)
      commit(types.QUERY_LIST, {loading: false})
    }, data => {
      commit(types.QUERY_LIST, {loading: false})
    })
  },
  addBanner ({ commit }, profile) {
    dataService.addBanner(profile).then(data => {
      Notification({
        title: '成功',
        message: `添加banner成功`,
        type: 'success'
      })
    })
    commit(types.ADD_BANNER, profile)
  },
  updateBanner ({ commit }, profile) {
    dataService.modifyBanner(profile.id, profile).then(data => {
      Notification({
        title: '成功',
        message: `修改banner成功`,
        type: 'success'
      })
      commit(types.UPDATE_BANNER, profile)
    })
  },
  deleteBanner ({ commit }, id) {
    dataService.deleteBanner(id).then(data => {
      Notification({
        title: '成功',
        message: `删除banner成功`,
        type: 'success'
      })
      commit(types.DELETE_BANNER, id)
    })
  }
}

const mutations = {
  [types.LOAD_BANNER]: (state, data) => {
    state.list = data
    state.total = data.length
  },
  [types.VIEW_BANNER]: (state, defaultValue) => {
    state.profile = defaultValue
  },
  [types.ADD_BANNER]: (state, data) => {
    state.list.push(data)
  },
  [types.DELETE_BANNER]: (state, id) => {
    let index = state.list.findIndex(ele => ele.id === id)
    if (index !== -1) {
      state.list.splice(index, 1)
    }
  },
  [types.UPDATE_BANNER]: (state, data) => {
    state.profile = Object.assign({}, data)
    let index = state.list.findIndex(ele => ele.id === state.profile.id)
    if (index !== -1) {
      // 只有splice才可以出发vue的检测。参考“https://vuefe.cn/v2/guide/list.html#注意事项”
      state.list.splice(index, 1, state.profile)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
