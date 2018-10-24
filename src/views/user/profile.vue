<!-- 
 * @author 曹宏涛<caohongtao@qianhaikeji.cn> 
-->
<template>
  <div class="user-profile-page">
    <back-to-list></back-to-list>
    <el-form ref="form" :model="form" label-width="100px">
      <table>
       <tr>
          <td><el-form-item label="头像"><img :src="profile.avatar" class="avatar"></el-form-item></td>
       </tr>
       <tr>
          <td colspan="3"><el-form-item label="简介"><el-input disabled class="brief" type="textarea" v-model="profile.brief"></el-input></el-form-item></td>
       </tr>
       <tr>
          <td><el-form-item label="会员ID"><el-input :readonly="true" class="readonly" v-model="profile.id"></el-input></el-form-item></td>
          <td><el-form-item label="昵称"><el-input :readonly="true" class="readonly" v-model="profile.username"></el-input></el-form-item></td>
          <td><el-form-item label="性别"><el-input :readonly="true" class="readonly" v-model="profile.sex"></el-input></el-form-item></td>
       </tr>
       <tr>
          <td><el-form-item label="手机号"><el-input :readonly="true" class="readonly" v-model="profile.phone"></el-input></el-form-item></td>
          <td><el-form-item label="邮箱"><el-input :readonly="true" class="readonly" v-model="profile.email"></el-input></el-form-item></td>
          <td><el-form-item label="所在地"><el-input :readonly="true" class="readonly" v-model="profile.city"></el-input></el-form-item></td>
       </tr>
       <tr>
          <td><el-form-item label="注册时间"><el-date-picker :readonly="true" class="readonly" v-model="profile.regDate" type="date" placeholder="选择日期"></el-date-picker></el-form-item></td>
          <td><el-form-item label="最后登录时间"><el-date-picker :readonly="true" class="readonly" v-model="profile.lastLogin" type="date" placeholder="选择日期"></el-date-picker></el-form-item></td>
          <td><el-form-item label="最后发布时间"><el-date-picker :readonly="true" class="readonly" v-model="profile.lastPostWorkTime" type="date" placeholder="选择日期"></el-date-picker></el-form-item></td>
       </tr>
       <tr>
          <td><el-form-item label="作品数"><el-input :readonly="true" class="readonly" v-model="profile.workCount"></el-input></el-form-item></td>
          <td><el-form-item label="被浏览次数"><el-input :readonly="true" class="readonly" v-model="profile.viewCount"></el-input></el-form-item></td>
       </tr>
       <tr>
          <td colspan="3">
            <el-form-item label="技能"><el-tag v-for="skill in profile.skills" type="primary" class="skill">{{ skill.name }}</el-tag></el-form-item>
          </td>
       </tr>
      </table>
      <el-form-item>
        <el-button :type="profile.checked ? 'danger' : 'primary'" @click="doCheck" size="large">{{ profile.checked ? '反审核' : '审核'}}</el-button>
        <el-button :type="profile.recommend ? 'danger' : 'primary'" @click="doRecommend" size="large">{{ profile.recommend ? '取消置顶' : '置顶'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import backToList from 'components/backToList'

export default {
  components: {
    backToList
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),
    profile: function () {
      return Object.assign({}, this.user)
    }
  },
  methods: {
    ...mapActions([
      'checkUser',
      'uncheckUser',
      'recommendUser',
      'unrecommendUser'
    ]),
    doCheck: function () {
      if (this.profile.checked) {
        this.uncheckUser({id: this.profile.id})
      } else {
        this.checkUser({id: this.profile.id})
      }
    },
    doRecommend: function () {
      if (this.profile.recommend) {
        this.unrecommendUser({id: this.profile.id})
      } else {
        this.recommendUser({id: this.profile.id})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width: 100%;
}

td {
  width: 33%;
}

.el-form {
  min-width: 800px;
  max-width: 1200px;
  margin-top: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
}

.skill {
  margin-right: 15px;
}
</style>
<style>
.user-profile-page .brief textarea {
  resize: none;
  height: 75px;
}
</style>