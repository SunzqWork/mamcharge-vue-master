export const treeData = {
  id: '1',
  name: 'ROOT',
  pid: '',
  checkStatus: false,
  indeterminate: false,
  children: [
    {
      id: '101',
      name: '人力行政部',
      pid: '1',
      checkStatus: false,
      indeterminate: false,
      children: [
        {
          id: '1001',
          name: '人力行政部深圳',
          pid: '101',
          checkStatus: false,
          indeterminate: false,
          children: [
            {
              id: '10089',
              name: '于十月',
              pid: '1001',
              checkStatus: false,
              indeterminate: false,
              children: [
                {
                  id: '1000032',
                  name: '人事部',
                  pid: '10089',
                  checkStatus: false,
                  indeterminate: false,
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: '9001',
          name: 'AAA',
          pid: '101',
          checkStatus: false,
          indeterminate: false,
          children: [
            {
              id: '90001',
              name: 'BBB',
              pid: '9001',
              checkStatus: false,
              indeterminate: false,
              children: [
                {
                  id: '900001',
                  name: 'CCC',
                  pid: '90001',
                  checkStatus: false,
                  indeterminate: false,
                  children: [
                    {
                      id: '9000001',
                      name: 'DDD',
                      pid: '900001',
                      checkStatus: false,
                      indeterminate: false,
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '201',
      name: '管理层',
      pid: '1',
      checkStatus: false,
      indeterminate: false,
      children: []
    },
    {
      id: '301',
      name: '财务部',
      pid: '1',
      checkStatus: false,
      indeterminate: false,
      children: [
        {
          id: '3001',
          name: '财务部-深圳',
          pid: '301',
          checkStatus: false,
          indeterminate: false,
          children: []
        },
        {
          id: '3002',
          name: '财务部-济南',
          pid: '301',
          checkStatus: false,
          indeterminate: false,
          children: [
            {
              id: '30001',
              name: '辛彦',
              pid: '3002',
              checkStatus: false,
              indeterminate: false,
              children: [
                {
                  id: '300001',
                  name: '辛彦',
                  pid: '30001',
                  checkStatus: false,
                  indeterminate: false,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '401',
      name: '运营部',
      pid: '1',
      checkStatus: false,
      indeterminate: false,
      children: []
    },
    {
      id: '501',
      name: '生产采购部',
      pid: '1',
      checkStatus: false,
      indeterminate: false,
      children: []
    }
  ]
}
