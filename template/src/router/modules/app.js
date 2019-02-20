import Layout from '@/views/layout/Layout'
const application = r => require.ensure([], () => r(require('@/views/premission/application/index')), 'ZL_application')
const features = r => require.ensure([], () => r(require('@/views/premission/features/index')), 'ZL_application')
const Systemmodule = r => require.ensure([], () => r(require('@/views/premission/features/auFeatures')), 'ZL_application')
const app = {
  path: '/app-center',
  component: Layout,
  hidden: false,
  redirect: '/app-center/application',
  name: 'app-center',
  alwaysShow: true,
  meta: { title: '应用中心', icon: 'per-application' },
  children: [
    {
      path: 'application',
      component: application,
      name: 'application',
      meta: { title: '应用管理', icon: '' }
    },
    {
      path: 'features',
      component: features,
      name: 'features',
      meta: { title: '功能管理', icon: '' }
    },
    {
      path: 'addSystem-module',
      component: Systemmodule,
      name: 'addSystem-module',
      hidden: true,
      meta: { title: '新增目录', icon: '' }
    },
    {
      path: 'editSystem-module',
      component: Systemmodule,
      name: 'editSystem-module',
      hidden: true,
      meta: { title: '编辑目录', icon: '' }
    },
    {
      path: 'addSystem-menu',
      component: Systemmodule,
      name: 'addSystem-menu',
      hidden: true,
      meta: { title: '新增菜单', icon: '' }
    },
    {
      path: 'editSystem-menu',
      component: Systemmodule,
      name: 'editSystem-menu',
      hidden: true,
      meta: { title: '编辑菜单', icon: '' }
    },
    {
      path: 'addSystem-page',
      component: Systemmodule,
      name: 'addSystem-page',
      hidden: true,
      meta: { title: '新增页面', icon: '' }
    },
    {
      path: 'editSystem-page',
      component: Systemmodule,
      name: 'editSystem-page',
      hidden: true,
      meta: { title: '编辑页面', icon: '' }
    },
    {
      path: 'addSystem-button',
      component: Systemmodule,
      name: 'addSystem-button',
      hidden: true,
      meta: { title: '新增按钮', icon: '' }
    },
    {
      path: 'editSystem-button',
      component: Systemmodule,
      name: 'editSystem-button',
      hidden: true,
      meta: { title: '编辑按钮', icon: '' }
    }
  ]
}

export default app
