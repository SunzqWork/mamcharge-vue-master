<template>
  <div id="zl-province">
    <div class="province-box" v-show="show">
      <p class="province-title">请选择</p>
      <el-scrollbar wrapClass="scrollbar-wrapper" style="height:240px">
        <el-checkbox-group v-model="checkedProvinces" @change="changeProvince">
          <div class="check-item-province clearfix" v-for="(item, index) in province" :key="index">
            <p style="position:relative;">
              <el-checkbox
                :label="item.province"
                :indeterminate="item.indeterminate"
                v-model="item.check">
                  {{ item.pname }}
                </el-checkbox>
              <i class="el-icon-d-arrow-right fr" @click="getCity(index)"></i>
            </p>
          </div>
        </el-checkbox-group>
      </el-scrollbar>
      <div class="select-province">
        已选择: {{ selectProvince.join(',') }}
      </div>
    </div>
    <div class="city-box" v-show="!show">
      <div class="city-top clearfix">
        <p class="city-title fl">{{ provinceName }}</p>
        <p class="back fr" @click="goBack"><i class="el-icon-d-arrow-left"></i>返回上级</p>
      </div>
      <el-scrollbar wrapClass="scrollbar-wrapper" style="height:240px;width:100%">
        <el-checkbox-group v-model="checkedCities" @change="changeCity">
          <p class="check-item-city" v-for="(item, index) in city" :key="index">
            <el-checkbox :label="item.id">{{ item.cname }}</el-checkbox>
          </p>
        </el-checkbox-group>
      </el-scrollbar>
      <el-scrollbar wrapClass="scrollbar-wrapper" class="select-city">
        已选择:{{ selectCity.join(',') }}
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import { getLatitude } from '@/api/vendor'
export default{
  name: 'zl-province',
  props: {
    showProvice: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      province: [],
      city: [],
      show: true,
      provinceName: '请选择',
      provinceId: '',
      checkedCities: [], // 选中的城市
      checkedProvinces: [], // 选中的省份
      commitData: [],
      provinceIndex: 1000
    }
  },
  watch: {
    province: {
      handler() {
        let arr = []
        this.province.forEach(item => {
          if (item.value.length > 0) {
            arr.push({
              province: item.province,
              city: item.value
            })
          }
        })
        this.$emit('selectData', arr)
      },
      deep: true
    },
    showProvice: {
      handler() {
        this.getProvince()
      },
      deep: true
    }
  },
  computed: {
    // 显示选中的省份文字
    selectProvince() {
      let provinces = []
      this.checkedProvinces.forEach(item => {
        this.province.forEach(val => {
          if (item === val.province) {
            provinces.unshift(val.pname)
          }
        })
      })
      return provinces
    },
    // 显示选中的城市文字
    selectCity() {
      let citys = []
      this.city.forEach(item => {
        this.checkedCities.forEach(val => {
          if (item.id === val) {
            citys.unshift(item.cname)
          }
        })
      })
      return citys
    }
  },
  methods: {
    // 得到全部省市
    getProvince() {
      getLatitude().then(res => {
        // 每次都进行初始化，防止数据叠加不清空
        this.province = []
        this.checkedProvinces = []
        this.checkedCities = []
        this.show = true
        this.province = res.data.map(item => {
          item.indeterminate = false
          item.value = []
          this.showProvice.forEach(val => {
            if (Number(item.province) === Number(val.province)) {
              // 省份下面选中的城市
              item.value = val.city.map(v => Number(v))
              if (item.value.length === item.city.length) {
                // 全选
                this.checkedProvinces.push(item.province)
              } else if (item.value.length < item.city.length && item.value.length !== 0) {
                // 未全选
                item.indeterminate = true
              } else if (item.value.length === 0) {
                // 说明省份是全选
                this.checkedProvinces.push(item.province)
                item.value = item.city.map(v => { return v.id })
              } else{
                // TODO
              }
            }
          })
          return item
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 进入城市页面
    getCity(index) {
      this.show = false
      this.provinceIndex = index
      // 全部城市
      this.city = this.province[index].city
      this.provinceId = this.province[index].province
      this.provinceName = this.province[index].pname
      // 选中的城市
      this.checkedCities = this.province[index].value
    },
    changeCity(value) {
      const province = this.province[this.provinceIndex]
      if (value.length === province.city.length) {
        // 省份push进数组，状态选中
        if (this.checkedProvinces.indexOf(this.provinceId) < 0) {
          this.checkedProvinces.push(this.provinceId)
        }
        province.value = value
      } else if (value.length < province.city.length && value.length !== 0) {
        // 省份从数组中删掉，状态变成“-”
        if (this.checkedProvinces.indexOf(this.provinceId) >= 0) {
          this.checkedProvinces.forEach((item, index) => {
            if (item === this.provinceId) {
              this.checkedProvinces.splice(index, 1)
            }
          })
        }
        province.value = value
        province.indeterminate = true
      } else {
        // 取消所有城市，省份也要从数组中删除，状态未选中
        if (this.checkedProvinces.indexOf(this.provinceId) >= 0) {
          this.checkedProvinces.forEach((item, index) => {
            if (item === this.provinceId) {
              this.checkedProvinces.splice(index, 1)
            }
          })
        }
        province.value = []
        province.indeterminate = false
      }
    },
    changeProvince(value) {
      // this.province.forEach(item => {
      //   item.value = []
      // })
      value.forEach(item => {
        this.province.forEach(val => {
          if (item === val.province) {
            val.value = val.city.map(v => { return v.id })
            val.indeterminate = false
          }
        })
      })
    },
    goBack() {
      this.show = true
    }
  },
  mounted() {
    this.getProvince()
  }
}
</script>
<style lang="scss">
#zl-province{
  .el-checkbox__label{
    font-weight: 400;
  }
  .province-box, .city-box{
    width: 320px;
    height: 324px;
    background: #fff;
    border: 1px solid #DCDCDC;
    border-radius: 4px;
    padding: 10px 0 0 0;
    line-height: initial;
    .check-item-province, .check-item-city{
      margin-top: 5px;
      padding-left: 20px;
      .el-checkbox__label{
        font-size: 14px !important;
        color: #666 !important;
      }
      .el-icon-d-arrow-right{
        color: #ccc;
        font-size: 14px;
        position: absolute;
        top: 3px;
        right: 20px;
      }
    }
    .province-title, .city-title{
      font-size: 14px;
      color: #999;
      padding-left: 10px;
    }
    .province-title{
      padding-bottom: 5px;
      border-bottom: 1px solid #e5e5e5;
      height: 30px;
    }
    .city-top{
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 5px;
      height: 30px;
      .back{
        font-size: 14px;
        color: #666;
        cursor: pointer;
        margin-right: 5px;
      }
    }
    .select-province, .select-city{
      height: 38px;
      width: 100%;
      border-top: 1px solid #dcdcdc;
      padding-left: 10px;
      font-size: 14px;
      color: #FF6347;
      overflow: auto;
    }
  }
}
</style>
