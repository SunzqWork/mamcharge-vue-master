<template>
  <div class="tree-node clearfix">
    <div class="fl" style=" border-bottom: 1px solid #c9c9c9;">
      <p class="node-title">{{ data[0].title }}</p>
      <el-scrollbar wrapClass="scrollbar-wrapper" style="height: 350px;">
        <ul :style="data[0].pid === null ? 'border-left: none' : ''">
          <li v-for="(node, index) in data" class="clearfix" :key="index">
            <div 
              class="node-label fl" 
              @click="changeSelectId(node.id, index)"
              :style="!(node.children && node.children.length > 0 && showIndex === index) ? 'margin-right: 15px;' : 'margin-right: 0;'"
              :class="node.checked === 1 ? 'select' : node.checked === 2 ? 'half-select' : 'no-select'" 
              :title="node.name">
              {{ node.name }}
            </div>
            <div v-show="node.children && node.children.length > 0 && showIndex === index" class="node-line fl"></div>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <div v-for="(item, index) in data" :key="index">
      <!-- 递归 -->
      <tree-node :data="item.children" v-if="item.children && item.children.length && showIndex === index"></tree-node>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-node',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showIndex: 0,
      flag: false
    }
  },
  computed: {
    model() {
      return this.data
    }
  },
  methods: {
    changeSelectId(id, index) {
      this.flag = true
      this.showIndex = index
      this.$store.commit('SET_ORG_SELECTED', id)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/theme.scss';

.tree-node{
  ul{
    li{
      list-style: none;
    }
    height: 500px;
    border-right: 1px solid #c9c9c9;
    padding-left: 10px;
    padding-top: 10px;
  }
  .node-label{
    width: 100px;
    height: 36px;
    font-size: 12px;
    line-height: 36px;
    border-radius: 4px;
    text-align: center;  
    margin-bottom: 20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  .node-line{
    width: 26px;
    height: 1px;
    background: $themeColor;
    margin-top: 18px;
  }
  .no-select{
    border: 1px solid #c9c9c9;
    color: #333;
    background: #fff;
  }
  .select{
    color: #fff;
    background: $themeColor;
    border: 1px solid #fff;
  }
  .half-select{
    border: 1px solid $themeColor;
    background: #fff;
    color: $themeColor;
  }
  .node-title{
    height: 36px;
    text-align: center;
    border: 1px solid #ccc;
    line-height: 36px;
    border-left: none;
  }
}
</style>
