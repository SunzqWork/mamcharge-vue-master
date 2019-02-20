<template>
  <div class="zl-check-select">
    <el-scrollbar wrapClass="scrollbar-wrapper" class="scroll" style="height: 500px;">
      <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
        <div v-for="(val, index) in list" :key="index" class="item">
          <p class="title" @click="showMore(index)">{{ val.name }}<i :class="val.flag ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i></p>
          <div v-show="val.flag">
            <p class="item-checkbox" v-for="role in val.roleList" :key="role.id"><el-checkbox :label="role.id">{{ role.name }}</el-checkbox></p>
          </div>
        </div>
      </el-checkbox-group>
    </el-scrollbar>
    <p class="check-data">已分配角色:<span>{{ checkData }}</span></p>
  </div>
</template>
<script>
import { roleGroups } from '@/api/premission'
export default {
  name: 'zl-check-select',
  props: {
    roleList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isIndeterminate: false,
      checkList: this.roleList,
      checkData: '',
      list: []
    }
  },
  watch: {
    roleList() {
      this.checkList = this.roleList
      this.handleCheckedChange(this.checkList)
    }
  },
  methods: {
    showMore(index) {
      this.list[index].flag = !this.list[index].flag
    },
    handleCheckedChange(value) {
      let arr = []
      this.list.forEach(item => {
        item.roleList.forEach(val => {
          value.forEach(v => {
            if (v === val.id) {
              arr.push(val.name)
            }
          })
        })
      })
      this.$emit('getCheckData', value, this.list)
      this.checkData = arr.join(',')
    },
    // 获取角色分组
    roleGroups() {
      roleGroups().then(res => {
        if (res.success) {
          this.list = res.data.map(item => {
            item.flag = true
            return item
          })
          this.handleCheckedChange(this.checkList)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.roleGroups()
  }
}
</script>
<style lang="scss">
.zl-check-select{
  .scroll{
    width: 300px;
    height: 500px;
    border: 1px solid #ececec;
    padding: 10px 20px;
  }
  .item{
    margin-bottom: 10px;
  }
  .title{
    color: #333;
    font-size: 14px;
    margin-bottom: 6px;
    cursor: pointer;
  }
  .item-checkbox{
    display: block;
  }
  .el-checkbox__label{
    color: #666;
    font-size: 14px;
    font-weight: 400;
  }
  .check-data{
    width: 300px;
    span{
      color: red;
    }
  }
}
</style>

