<template>
  <div class="app-container">

    <tree-table :data="data" :eval-func="func" :eval-args="args" :expand-all="expandAll" :columns="columns" border>
    </tree-table>
  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '@/components/TreeTable'
import treeToArray from './customEval'

export default {
  name: 'CustomTreeTableDemo',
  components: { treeTable },
  data() {
    return {
      func: treeToArray,
      expandAll: false,
      columns: [
        {
          text: '菜单权限',
          level: true,
          value: 'noButton'
        },
        {
          text: '按钮权限',
          level: false,
          value: 'button'
        }
      ],
      data:
        {
          id: 1,
          event: '应用',
          timeLine: 100,
          comment: '无',
          isCheck: true,
          isIndeterminate: false,
          checkAll: false,
          children: [
            {
              id: 2,
              event: '目录',
              timeLine: 10,
              isCheck: true,
              isIndeterminate: false,
              checkAll: false,
              comment: '无'
            },
            {
              id: 3,
              event: '菜单',
              timeLine: 90,
              isCheck: true,
              isIndeterminate: false,
              checkAll: false,
              comment: '无',
              children: [
                {
                  id: 4,
                  event: '页面',
                  isCheck: true,
                  isIndeterminate: false,
                  checkAll: false,
                  comment: '无',
                  type: 2,
                  btns: [
                    {
                      id: 5,
                      isCheck: true,
                      button: '新增',
                      checkAll: false,
                      type: 3
                    },
                    {
                      id: 6,
                      isCheck: true,
                      children: [],
                      checkAll: false,
                      button: '删除',
                      type: 3
                    }
                  ]
                },
                
              ]
            }
          ]
        },
      args: [null, null, 'timeLine']
    }
  },
  methods: {
    message(row) {
      this.$message.info(row.event)
    }
  }
}
</script>
