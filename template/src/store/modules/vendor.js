/**
 * 公共方法 多个组件都会使用的ajax
 */
import { getAreaList, getLatitude } from '@/api/vendor'
import { orgTree, getOrgInfo, getSubOrgList, getSubDeptList, addOrgs, editOrgs } from '@/api/premission'
const vendor = {
  state: {
    photoUpload: `${process.env.PERMISSION_API}/data/upload`,
    userUpload:`${process.env.PERMISSION_API}/data/users/import/data`,
    temFile:`${process.env.PERMISSION_API}/api/downloadExcel`,
	  exportFile:`${process.env.PERMISSION_API}/data/users/export`,
    failFile:`${process.env.PERMISSION_API}/data/users/export/failList`
  },
  mutations: {},
  actions: {
    // 获取大区
    GetRegionData() {
      return new Promise((resove, reject) => {
        const params = { page: 1, rows: 300 }
        getAreaList(params).then(res => {
          if (res.code === 0) {
            resove(res.data)
          } else {
            resove(false)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取省市
    GetLatitude() {
      return new Promise((resove, reject) => {
        getLatitude().then(res => {
          if (res.code === 0) {
            resove(res.data)
          } else {
            resove(false)
          }
        }).catch(err => {
        })
      })
    },
    // 获取组织架构树
    GetOrgTree({ commit }, dept) {
      return new Promise((resolve, reject) => {
        orgTree(dept).then(res => {
          if (res.success) {
            resolve({
              code: 0,
              data: res.data
            })
          } else {
            resolve({
              code: 1,
              message: '获取组织架构数据失败，请联系管理员。'
            })
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取组织详情信息  总部  分部  部门
    GetOrgInfo({ commit }, id) {
      return new Promise((resolve, reject) => {
        getOrgInfo(id).then(response => {
          if (response.success) {
            resolve({
              code: 0,
              data: response.data
            })
          } else {
            resolve({
              code: 1,
              message: '获取组织详情信息失败。'
            })
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    
    // 获取下级分部
    GetSubOrgList({ commit }, params) {
      return new Promise((resolve, reject) => {
        getSubOrgList(params.id, params).then(response => {
          if (response.success) {
            resolve({
              code: 0,
              data: response.data
            })
          } else {
            resolve({
              code: 1,
              message: '获取下级分部数据失败，请联系管理员。'
            })
          }
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 获取下级部门
    GetSubDeptList({ commit }, params) {
      return new Promise((resolve, reject) => {
        getSubDeptList(params.id, params).then(response => {
          if (response.success) {
            resolve({
              code: 0,
              data: response.data
            })
          } else {
            resolve({
              code: 1,
              message: '获取下级部门数据失败，请联系管理员。'
            })
          }
        }).catch(err => {
        })
      })
    },
    // 新增组织
    AddOrgs({ commit }, data) {
      return new Promise((resolve, reject) => {
        addOrgs(data).then(response => {
          if (response.success) {
            resolve({
              code: 0,
              data: response.data,
              message: response.errmsg
            })
          } else {
            resolve({
              code: 1,
              message: response.errmsg
            })
          }
        }).catch(err => {
        })
      })
    },
    // 编辑组织
    EditOrgs({ commit }, data) {
      return new Promise((resolve, reject) => {
        editOrgs(data.id, data).then(response => {
          if (response.success) {
            resolve({
              code: 0,
              data: response.data,
              message: response.errmsg
            })
          } else {
            resolve({
              code: 1,
              message: response.errmsg
            })
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default vendor
