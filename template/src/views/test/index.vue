<template>
  <div id="test">
    <org-tree 
      :data="treeData" 
      :horizontal="true" 
      collapsable/>
  </div>
</template>
<script>
import orgTree from './org-tree'
export default {
  name: 'Test',
  components: { orgTree },
  data() {
    return {
      treeData: {
        label: '济南东池信息科技有限公司',
        expand: true,
        children: [
          {
            label: '产品研发部',
            expand: true,
            children: [
              {
                label: '前端',
                expand: true,
                children: [
                  {
                    label: '曹昊'
                  },
                  {
                    label: '于建海'
                  },
                  {
                    label: '王飞跃'
                  }
                ]
              },
              {
                label: '后台'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          },
          {
            label: '销售部',
            expand: true,
            children: [
              {
                label: '销售一部'
              },
              {
                label: '销售二部'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
