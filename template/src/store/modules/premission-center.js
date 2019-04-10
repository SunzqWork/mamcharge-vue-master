import { getMenuTree, logout } from '@/api/premission'
import { getToken, removeToken } from '@/utils/premissionAuth'
import { getStorage } from '@/utils/storage'
const premissionCenter = {
    state: {
        premissionToken: getToken('premission-token'),
        premissionUserInfo: JSON.parse(getStorage('premission-userInfo')),
        tabIndex: 0
    },
    mutations: {
        SETPREMISSIONTOKEN(state, val) {
            state.premissionToken = val
        },
        SETPREMISSIONUSERINFOO(state, val) {
            state.premissionUserInfo = val
        },
        SET_TABINDEX_PREMISSION(state, val) {
            state.tabIndex = val
        }
    },
    actions: {
        // 退出登录
        Logout({ commit }, token) {
            return new Promise((resolve, reject) => {
                logout(token).then(res => {
                    if (res.success) {
                        removeToken()
                        resolve(res)
                    }
                }).catch(err => {})
            })
        }
    }
}

export default premissionCenter