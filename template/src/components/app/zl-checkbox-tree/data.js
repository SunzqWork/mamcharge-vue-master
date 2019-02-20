export function treeData() {
  const tree = {
    id: 9999,
    label: '',
    indeterminate: false,
    check: false,
    checkArray: [],
    parent: 0,
    children: [
      {
        id: 1,
        label: '管理层',
        indeterminate: false,
        check: false,
        checkArray: [],
        parent: '9999',
        children: []
      },
      {
        id: 2,
        label: '人力行政部',
        indeterminate: false,
        check: false,
        checkArray: [],
        parent: '9999',
        children: [
          {
            id: '2-1',
            label: '人力行政组深圳',
            indeterminate: false,
            check: false,
            checkArray: [],
            parent: '2',
            children: [
              {
                id: '2-1-1',
                label: '人力组-深圳',
                indeterminate: false,
                check: false,
                parent: '2-1',
                checkArray: [],
                children: []
              },
              {
                id: '2-1-2',
                label: '行政组',
                indeterminate: false,
                check: false,
                parent: '2-1',
                checkArray: [],
                children: []
              }
            ]
          },
          {
            id: '2-2',
            label: '人力行政组济南',
            indeterminate: false,
            check: false,
            checkArray: [],
            parent: '2',
            children: [
              {
                id: '2-2-1',
                label: '人力组-济南',
                indeterminate: false,
                check: false,
                parent: '2-2',
                checkArray: [],
                children: []
              },
              {
                id: '2-2-2',
                label: '行政组',
                indeterminate: false,
                check: false,
                parent: '2-2',
                checkArray: [],
                children: [
                  {
                    id: '2-2-2-1',
                    label: '曹昊',
                    indeterminate: false,
                    check: false,
                    parent: '2-2-2',
                    checkArray: [],
                    children: []
                  },
                  {
                    id: '2-2-2-2',
                    label: '于十月',
                    indeterminate: false,
                    check: false,
                    parent: '2-2-2',
                    checkArray: [],
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 3,
        label: '财务部',
        indeterminate: false,
        check: false,
        checkArray: [],
        parent: '9999',
        children: []
      },
      {
        id: 4,
        label: '运营部',
        indeterminate: false,
        check: false,
        checkArray: [],
        parent: '9999',
        children: []
      },
      {
        id: 5,
        label: '生产采购部',
        indeterminate: false,
        check: false,
        checkArray: [],
        parent: '9999',
        children: []
      },
      {
        id: 6,
        label: '研发部',
        indeterminate: false,
        check: false,
        checkArray: [],
        parent: '9999',
        children: []
      },
      {
        id: 7,
        label: '业务部',
        indeterminate: false,
        check: false,
        checkArray: [],
        parent: '9999',
        children: []
      }
    ]
  }
  return tree
}
