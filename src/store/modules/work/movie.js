import * as types from 'store/mutation-types'
import dataService from 'services/dataService'
import { Notification } from 'element-ui'

const state = {
  list: [],
  profile: {},
  total: 0
}

// getters
const getters = {
  movieList: state => state.list,
  movieTotal: state => state.total,
  movie: state => state.profile
}

// actions
const actions = {
  loadMovieList ({ commit }, params) {
    commit(types.QUERY_LIST, {loading: true})
    dataService.getMovieList(params).then(data => {
      commit('LOAD_LIST', data.body)
      commit(types.QUERY_LIST, {loading: false})
    }, data => {
      commit(types.QUERY_LIST, {loading: false})
    })
  },
  loadPhoto ({ commit }, id) {
    dataService.getShow(id).then(data => {
      commit(types.VIEW_PHOTO, data.body)
    })
  },
  updatePhoto ({ commit }, {id, info}) {
    dataService.updatePhoto(id, info).then(data => {
      Notification({
        title: '成功',
        message: `修改会员资料成功`,
        type: 'success'
      })
      commit(types.VIEW_PHOTO, info)
    })
  }
}

// mutations
const mutations = {
  LOAD_LIST: (state, data) => {
    state.list = data.content
    state.total = data.totalElements
  },
  [types.VIEW_PHOTO]: (state, defaultValue) => {
    state.profile = defaultValue
  },
  [types.UPDATE_PHOTO]: (state, data) => {
    state.profile = Object.assign({}, state.profile, data)
    let index = state.list.findIndex(ele => ele.id === state.profile.id)
    if (index !== -1) {
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
