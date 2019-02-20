// import layout from '@/views/layout/index'
import layout from '@/views/layout/Layout'
import store from '@/store/index'
/**
 * 去除字符串左右空格
 * @param {*} str
 */
export function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
}
// /**
//  * 获取菜单格式
//  * @param {目录树} data
//  */
// export function getRouteData(data) {
//   const routes = []
//   const loop = (obj) => {
//     if (obj.children && obj.children.length > 0) {
//       obj.children.forEach((item, index) => {
//         if (obj.type === 0 && index === 0) {
//           obj.redirect = `${obj.path}/${item.url}`
//         }
//         let str = ''
//         if (obj.type === 0) {
//           str = () => import(`@/views/${obj.src}/${item.url}/index`)
//         } else {
//           str = () => import(`@/views/${obj.src}/${item.extra}`)
//         }
//         const route = {
//           path: `${item.url}`,
//           name: item.url.split('/')[0],
//           meta: { title: item.name, icon: item.icon, hidden: item.hidden },
//           children: item.children,
//           type: item.type,
//           src: `${obj.src}/${item.extra}`,
//           component: str
//         }
//         obj.children.splice(index, 1, route)
//         loop(route)
//       })
//       // 菜单维度
//       if (obj.type === 1) {
//         obj.children.unshift({
//           path: '',
//           redirect: obj.children[0].path.replace('/', '')
//         })
//       }
//     }
//   }
//   data.forEach((item, index) => {
//     item = {
//       path: `/${item.url}`,
//       name: item.url,
//       meta: { title: item.name, icon: item.icon, hidden: item.hidden },
//       children: item.children,
//       type: item.type,
//       component: layout,
//       src: item.extra
//     }
//     loop(item)
//     routes.push(item)
//   })
//   return routes
// }

// 删除所有cookie
export function clearCookie() {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }
}

// 获取宽度
export function getWidth() {
    const $width = document.body.clientWidth
    const num = $width - 220
    if (store.state.org.orgTreeShow) {
        return num - 300
    } else {
        return num
    }
}