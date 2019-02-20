
<template>
  <el-dialog :title="title" :visible="isShow" :width="width" @close="close">
    <el-form :model="params" :rules="rules" ref="params" label-width="120px">
      <el-form-item label="简称" prop="name">
        <el-input v-model.trim="params.name" class="zl-form-control zl-input-240px"></el-input>
      </el-form-item>
      <el-form-item label="全称" prop="fullName">
        <el-input v-model.trim="params.fullName" class="zl-form-control zl-input-240px"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序" prop="seq">
        <el-input-number v-model="params.seq" controls-position="right" class="zl-form-control zl-input-240px"></el-input-number>
      </el-form-item>
      <el-form-item label="限制用户数" prop="staffLimit">
        <el-input-number v-model="params.staffLimit" controls-position="right" class="zl-form-control zl-input-240px"></el-input-number>
      </el-form-item>
      <el-form-item label="部门负责人" prop="principalId" v-if="isStatus">
      <el-select v-model="params.principalId" filterable placeholder="请选择" class="zl-form-control zl-input-240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>      
      </el-form-item>
      <el-form-item label="部门分管领导" prop="leaderId" v-if="isStatus || isNews">
        <el-input disabled class="zl-form-control zl-input-240px" v-model="params.leaderName">
          <template slot="append"><i class="el-icon-more pointer" @click="BMLeaVisible = true"></i></template>
        </el-input>     
      </el-form-item>
      <el-form-item label="上级部门" prop="superior">
        <span>{{ parentName }}</span>
      </el-form-item>
      <el-form-item label="分部编号" prop="number" v-if="params.code != '' && params.code != undefined">
        <span>{{params.code}}</span>
      </el-form-item> 
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="btn-default" @click="cancel">取 消</el-button>
      <el-button class="btn-theme" @click="submit">确 定</el-button>
    </span>


    <!-- 部门负责人帮助框 -->
    <zl-help :isShow.sync="BMLeaVisible" :typeCheck="false" v-if="BMLeaVisible" positions="user" @submit-call="submitCall"/>
  </el-dialog>
</template> 
<script>
import { getOrgInfo } from "@/api/premission"
import { queryUserList } from '@/api/user'

export default {
  name: "bs",
  props: {
    isStatus: {
      type: Boolean,
      default: false
    },
    isNews:{
      type:Boolean,
      default :false
    },
    title:{
      default:"",
      type:String
    },
    width: {
      default: "450px",
      type: String
    },
    isShow: {
      default: false,
      type: Boolean
    },
    parentName: {
      type: String,
      default: ''
    },
    data: {
      default: () => {
        return {};
      },
      type: Object
    },
    rules: {
      default: () => {
        return {
          name: [
            { required: true, message: "请输入简称", trigger: 'blur' }
          ],
          fullName: [{ required: true, message: "请输入全称", trigger: 'blur' }]
        };
      },
      type: Object
    }
  },
  data() {
    return {
      params: JSON.parse(JSON.stringify(this.data)),
      options: [],
      BMLeaVisible: false // 部门分管领导
    }
  },
  methods: {
    submitCall(data) {
      this.params.leaderId = data[0].id
      this.params.leaderName = data[0].name
    },
    close(){
        this.$emit( "update:isShow", false );
    },
    cancel() {
      this.$emit( "update:isShow", false );
    },
    submit() {
      if (this.params["name"] == "" || this.params["name"] == undefined) {
        this.$message.error("请填写简称");
      } else {
        if (this.params["fullName"] == "" || this.params["fullName"] == undefined) {
          this.$message.error("请填写全称");
        } else {
          this.options.forEach(val => {
            if (val.value === this.params.principalId) {
              this.params.principalName = val.label
            }
          })
          this.$emit("is-submit", this.params);
          this.$emit( "update:isShow", false );
        }
      }
    },
    // 查询部门用户
    queryUserList() {
      queryUserList({ orgId: this.params.id, page: 1, size: 50 }).then(res => {
        if (res.success) {
          this.options = res.data.records.map(item => {
            return {
              label: item.name,
              value: item.id
            }
          })
        } else {
          this.$message.error('获取部门负责人失败，请联系管理员。')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.params = JSON.parse(JSON.stringify(this.data))
    this.queryUserList()
  }
};
</script>
<style lang="scss">
.zl-width {
  width: 100%;
}
</style>


