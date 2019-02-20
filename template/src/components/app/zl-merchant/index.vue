<template>
  <div class="zl-merchant">
    <zl-search v-model="searchText" @search-btn="searchBtn"></zl-search>
    <el-scrollbar wrapClass="scrollbar-wrapper" style="height: 430px;margin-top: 15px;">
      <el-checkbox-group v-model="checkList" @change="handlerCheck">
        <div class="merchant-group" v-for="(val, index) in merchantList" :key="index">
          <h3 class="letter">{{ val.first }}</h3>
          <div class="merchant">
            <p v-for="item in val.list" :key="item.id">
              <el-checkbox :label="item.id">{{ item.commName }}</el-checkbox>
            </p>
          </div>
        </div>
      </el-checkbox-group>
    </el-scrollbar>
    <div class="select-merchant">
      <span>已选择:</span>
      <el-scrollbar wrapClass="scrollbar-wrapper" style="height: 80px;color: red;">
        {{ selectMerchant.join(',') }}
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import zlSearch from '../zl-search/index'
import { getSortCommercial, getCommercialList } from '@/api/vendor'
export default {
  name: 'zl-merchant',
  props: {
    showCheckList: {
      type: Array,
      default: () => []
    }
  },
  components: { zlSearch },
  data() {
    return {
      searchText: '',
      merchantList: [],
      checkList: this.showCheckList
    }
  },
  computed: {
    selectMerchant() {
      let arr = []
      this.merchantList.forEach(item => {
        item.list.forEach(val => {
          this.checkList.forEach(v => {
            if (Number(v) === Number(val.id)) {
              arr.push(val.commName)
            }
          })
        })
      })
      return arr
    }
  },
  methods: {
    searchBtn(value) {
      if (value === '' || value === null || value === undefined) {
        this.$message({
          type: 'warning',
          message: '请输入要搜索的商户'
        })
        return false
      }
      this.getSortCommercial(value)
    },
    getCommercialList() {
      getCommercialList().then(res => {
        if (res.code === 0) {
          this.merchantList = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getSortCommercial(value) {
      getSortCommercial(value).then(res => {
        if (res.code === 0) {
          this.merchantList = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handlerCheck(value) {
      this.$emit('check-value', value)
    }
  },
  mounted() {
    this.getCommercialList()
  }
}
</script>
<style lang="scss">
.zl-merchant{
  width: 300px;
  height: 600px;
  border: 1px solid #c9c9c9;
  padding: 15px;
  .letter{
    border-bottom: 1px solid #ccc;
    padding-left: 8px;
    font-style: normal;
    font-weight: 500px;
    color: #999;
    font-size: 16px;
  }
  .merchant{
    color: #999;
    font-size: 14px;
    padding-left: 8px;
  }
  .select-merchant{
    border-top: 1px solid #ccc;
    margin-top: 10px;
    color: #666;
    p{
      font-size: 12px;
    }
    overflow: auto;
  }
}
</style>

