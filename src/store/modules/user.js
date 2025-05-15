import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { isHttp, isEmpty } from "@/utils/validate"
import defAva from '@/assets/images/profile.jpg'

const user = {
  state: {
    token: getToken(),
    id: '',
    name: '',
    nickName: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_NICK_NAME: (state, nickName) => {
      state.nickName = nickName
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // setToken("eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImE4MzdlYmY4LTllM2YtNDEwMS1hYTkyLTM5OTdiNmMzZWZhMSJ9.vlHJpOsHDkxyKD3IeGFBSyPvcqzgm3nBxUXfQ8vSWEjC2loDcuLvBpF2-aAoaR-356I4ey7bbmNM-ofH9Z_EuA")
        // commit('SET_TOKEN', "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImE4MzdlYmY4LTllM2YtNDEwMS1hYTkyLTM5OTdiNmMzZWZhMSJ9.vlHJpOsHDkxyKD3IeGFBSyPvcqzgm3nBxUXfQ8vSWEjC2loDcuLvBpF2-aAoaR-356I4ey7bbmNM-ofH9Z_EuA")
        // resolve()
        login(userInfo).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          commit('SET_ID', res.uid)
          commit('SET_NAME', res.userName)
          // commit('SET_ROLES', [res.role])
          localStorage.setItem('userInfo', JSON.stringify(res))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        //   getInfo().then(res => {
        //     const user = res.user
        //     if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //       commit('SET_ROLES', res.roles)
        //       commit('SET_PERMISSIONS', res.permissions)
        //     } else {
        //       commit('SET_ROLES', ['ROLE_DEFAULT'])
        //     }
        //     commit('SET_ID', user.userId)
        //     commit('SET_NAME', user.username)
        //     commit('SET_NICK_NAME', user.nickName)
        //     commit('SET_AVATAR', avatar)
        //     resolve(res)
        // let res = {
        //   "msg": "操作成功",
        //   "code": 200,
        //   "permissions": [
        //     "*:*:*"
        //   ],
        //   "roles": [
        //     "admin"
        //   ],
        //   "user": {
        //     "createBy": "admin",
        //     "createTime": "2024-06-30 11:27:11",
        //     "updateBy": null,
        //     "updateTime": null,
        //     "remark": "管理员",
        //     "userId": 1,
        //     "deptId": 103,
        //     "username": "admin",
        //     "nickName": "超级管理员",
        //     "email": "ry@163.com",
        //     "phonenumber": "15888888888",
        //     "sex": "1",
        //     "avatar": "",
        //     "password": "$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2",
        //     "status": "0",
        //     "delFlag": "0",
        //     "loginIp": "171.104.222.180",
        //     "loginDate": "2025-05-12T11:34:03.000+08:00",
        //     "dept": {
        //       "createBy": null,
        //       "createTime": null,
        //       "updateBy": null,
        //       "updateTime": null,
        //       "remark": null,
        //       "deptId": 103,
        //       "parentId": 101,
        //       "ancestors": "0,100,101",
        //       "deptName": "研发部门",
        //       "orderNum": 1,
        //       "leader": "超级管理员",
        //       "phone": null,
        //       "email": null,
        //       "status": "0",
        //       "delFlag": null,
        //       "parentName": null,
        //       "children": []
        //     },
        //     "roles": [
        //       {
        //         "createBy": null,
        //         "createTime": null,
        //         "updateBy": null,
        //         "updateTime": null,
        //         "remark": null,
        //         "roleId": 1,
        //         "roleName": "超级管理员",
        //         "roleKey": "admin",
        //         "roleSort": 1,
        //         "dataScope": "1",
        //         "menuCheckStrictly": false,
        //         "deptCheckStrictly": false,
        //         "status": "0",
        //         "delFlag": null,
        //         "flag": false,
        //         "menuIds": null,
        //         "deptIds": null,
        //         "permissions": null,
        //         "admin": true
        //       }
        //     ],
        //     "roleIds": null,
        //     "postIds": null,
        //     "roleId": null,
        //     "admin": true
        //   }
        // }
        let res = JSON.parse(localStorage.getItem('userInfo'))
        commit('SET_ID', res.uid)
        commit('SET_NAME', res.userName)
        commit('SET_ROLES', [res.role])
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    },
    // 退出系统
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  },

}

export default user
