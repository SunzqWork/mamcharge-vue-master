<template>
  <div id="check-table-tree">
    <tree-table :data="data" :columns="columns" border/>
  </div>
</template>

<script>
import treeTable from '@/components/app/CheckTableTree/index'
export default {
  name: 'check-table-tree',
  components: { treeTable },
  data() {
    return {
      columns: [
        {
          text: "事件",
          value: "event",
          width: 200,
          check: true
        },
        {
          text: "ID",
          value: "id"
        }
      ],
      data: [
        {
          id: 0,
          event: "事件1",
          timeLine: 50,
          comment: "无",
          pid: 'root'
        },
        {
          id: 1,
          event: "事件1",
          timeLine: 100,
          comment: "无",
          pid: 'root',
          children: [
            {
              id: 2,
              event: "事件2",
              timeLine: 10,
              comment: "无",
              pid: 1
            },
            {
              id: 3,
              event: "事件3",
              timeLine: 90,
              comment: "无",
              pid: 1,
              children: [
                {
                  id: 4,
                  event: "事件4",
                  timeLine: 5,
                  comment: "无",
                  pid: 3
                },
                {
                  id: 5,
                  event: "事件5",
                  timeLine: 10,
                  comment: "无",
                  pid: 3
                },
                {
                  id: 6,
                  event: "事件6",
                  timeLine: 75,
                  comment: "无",
                  pid: 3,
                  children: [
                    {
                      id: 7,
                      event: "事件7",
                      timeLine: 50,
                      comment: "无",
                      pid: 6,
                      children: [
                        {
                          id: 71,
                          event: "事件71",
                          timeLine: 25,
                          comment: "xx",
                          pid: 7
                        },
                        {
                          id: 72,
                          event: "事件72",
                          timeLine: 5,
                          comment: "xx",
                          pid: 7
                        },
                        {
                          id: 73,
                          event: "事件73",
                          timeLine: 20,
                          comment: "xx",
                          pid: 7
                        }
                      ]
                    },
                    {
                      id: 8,
                      event: "事件8",
                      timeLine: 25,
                      comment: "无",
                      pid: 6
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>

