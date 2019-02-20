
<template>
  <el-dialog :title="title" :visible="isShow" :width="width" @close="close">
    <el-form :model="params" :rules="rules" ref="params" label-width="100px">
      <el-form-item label="简称" prop="name">
        <el-input v-model.trim="params.name" :maxlength="30" class="zl-form-control zl-input-240px"></el-input>
      </el-form-item>
      <el-form-item label="全称" prop="fullName">
        <el-input v-model.trim="params.fullName" :maxlength="30" class="zl-form-control zl-input-240px"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序" prop="seq">
        <el-input-number v-model="params.seq" controls-position="right" class="zl-form-control zl-input-240px"></el-input-number>
      </el-form-item>
      <el-form-item label="限制用户数" prop="staffLimit">
        <el-input-number v-model="params.staffLimit" controls-position="right" class="zl-form-control zl-input-240px"></el-input-number>
      </el-form-item>
      <el-form-item label="上级部门" prop="superior">
        <span>{{parentName}}</span>
      </el-form-item>
      <el-form-item label="分部编号" prop="number" v-if="params.code != '' && params.code != undefined">
        <span>{{params.code}}</span>
      </el-form-item> 
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="btn-default" @click="cancel">取 消</el-button>
      <el-button class="btn-theme" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "bs",
  props: {
    title:{
      default:"",
      type:String
    },
    width: {
      default: "30%",
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
        return {}
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
      params: this.data
    }
  },
  watch: {
    data() {
      this.params = this.data
    }
  },
  methods: {
    close(){
      this.$emit( "update:isShow", false );
    },
    cancel() {
      this.$emit( "update:isShow", false );
    },
    submit() {
      if (this.data["name"] == "" || this.data["name"] == undefined) {
        this.$message.error("请填写简称");
      } else {
        if (this.data["fullName"] == "" || this.data["fullName"] == undefined) {
          this.$message.error("请填写全称");
        } else {
          this.$emit("is-submit", this.data);
          this.$emit( "update:isShow", false );
        }
      }
    }
  }
};
</script>
<style lang="scss">
.zl-width {
  width: 100%;
}
</style>


