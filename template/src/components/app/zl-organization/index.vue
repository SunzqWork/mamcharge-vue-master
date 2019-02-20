<template>
  <div class="zl-organization">
    <node :data="nodes"></node>
  </div>
</template>

<script>
import node from './node.vue'
import { formatData, setData, getParentNodeOfTree } from './utils.js'
export default {
  name: 'zl-organization',
  components: { node },
  data() {
    return {
      nodes: [
        {
          id: 801,
          pid: null,
          name: '猛犸充电',
          title: '',
          children: [
            {
              id: 101,
              pid: 801,
              name: '猛犸充电（华北-华北-华北）',
              title: '区域',
              children: [
                {
                  id: 1001,
                  pid: 101,
                  name: '河北省',
                  title: '省份',
                  children: [
                    {
                      id: 30001,
                      pid: 1001,
                      title: '城市',
                      name: '衡水'
                    },
                    {
                      id: 30002,
                      pid: 1001,
                      name: '邯郸市'
                    },
                    {
                      id: 30003,
                      pid: 1001,
                      name: '邢台市'
                    },
                    {
                      id: 30004,
                      pid: 1001,
                      name: '廊坊市'
                    }
                  ]
                },
                {
                  id: 1002,
                  pid: 101,
                  name: '山东省',
                  children: [
                    {
                      id: 10001,
                      pid: 1002,
                      name: '济南市'
                    },
                    {
                      id: 10002,
                      pid: 1002,
                      name: '青岛市'
                    },{
                      id: 10003,
                      pid: 1002,
                      name: '威海市'
                    },{
                      id: 10004,
                      pid: 1002,
                      name: '潍坊市'
                    },{
                      id: 10005,
                      pid: 1002,
                      name: '烟台市'
                    }
                  ]
                },
                {
                  id: 1003,
                  pid: 101,
                  name: '辽宁省'
                }
              ]
            },
            {
              id: 102,
              pid: 801,
              name: '猛犸充电（大上海）',
              children: []
            },
            {
              id: 103,
              pid: 801,
              name: '猛犸充电（河北）'
            },
            {
              id: 104,
              pid: 801,
              name: '猛犸充电（新疆）',
              children: [
                {
                  id: 4001,
                  pid: 102,
                  name: '新疆--01'
                },
                {
                  id: 4002,
                  pid: 102,
                  name: '新疆--02'
                }
              ]
            },
            {
              id: 105,
              pid: 801,
              name: '猛犸充电（台湾）'
            }
          ]
        }
      ]
    }
  },
  computed: {
    selectId() {
      return this.$store.state.components.org_selected
    }
  },
  watch: {
    selectId() {
      this.setData()
      this.nodes = getParentNodeOfTree(this.nodes, this.selectId)
    }
  },
  methods: {
    setData() {
      this.nodes = [setData(this.nodes[0], this.selectId)]
    }
  },
  mounted() {
    this.nodes = [formatData(this.nodes[0])]
  }
}
</script>

<style lang="scss">
.zl-organization{
  border: 1px solid #ccc;
  border-top: none;
  border-right: none;
  border-bottom: none;
}
</style>
