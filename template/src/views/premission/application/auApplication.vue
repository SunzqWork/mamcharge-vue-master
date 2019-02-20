<template>
  <div id="addFunction">
    <zl-card>
      <el-button class="btn-theme" @click="save" >
        <svg-icon icon-class="pre-save"></svg-icon>
        保存
      </el-button>
      <el-button class="btn-default" @click="$router.go(-1)">
        <svg-icon icon-class="pre-back"></svg-icon>
        返回
      </el-button>
    </zl-card>
    <zl-card isHeader icon="per-application" :title="$route.name === 'addApplication' ? '新增应用' : '编辑应用'">
      <el-form label-width="100px" :inline="true" :rules="rules" ref="addForm" :model="addForm" >
        <el-row>
          <el-form-item prop="name" label="应用名称">
            <el-input class="zl-input-240px zl-form-control" v-model="addForm.name" @change="isPri = true"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="站点URL">
            <el-input class="zl-input-240px zl-form-control" v-model="addForm.url" @change="isPri = true"></el-input>
          </el-form-item>
          <el-form-item prop="icon" label="图标">
            <!-- <zlIcons class="zl-input-240px zl-form-control" ref="icon"></zlIcons> -->
            <el-input class="zl-input-240px zl-form-control" v-model="addForm.icon" ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="显示顺序" prop="">
            <el-input class="zl-input-240px zl-form-control"></el-input>
          </el-form-item>
          <el-form-item prop="hidden" label="是否隐藏" calss="zl-input-300px">
            <el-switch v-model="addForm.hidden"></el-switch>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item prop="desc" label="描述">
            <el-input type="textarea" resize :rows="4" style="width: 715px;" v-model="addForm.desc"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </zl-card>
  </div>
</template>
<script>
import zlIcons from "@/components/app/zl-icons/index"
import { addFunction,searcchEdit,editFunction } from "@/api/premission"
export default {
  name: 'add-function',
  components: { zlIcons },
  data() {
    const validatorName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('应用名称不能为空'));
      } else if(value.length > 20) {
        callback(new Error('应用名称长度不能超过20个字符'));
      } else if(!this.isPri) {
        callback(new Error('应用名称已存在'));
      } else {
        callback();
      }
    }
    return {
      isPri: true, //重复性验证
      addForm: {
        name: '',
        hidden: false,
        url: '',
        desc: '',
        icon: ''
      },
      rules: {
        name: [
          {validator: validatorName, trigger: 'blur'},
          {required: true, trigger: 'blur', message: '应用名称不能为空'}
        ],
        url: [
          {required: true, trigger: 'blur', message: '站点URL不能为空'},
          {required: true, trigger: 'blur', message: 'URL不能为空'}
        ],
        desc: [
          { min: 0, max: 80, message: '描述不能超过80个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    save() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          if (this.addForm.hidden){
          this.addForm.hidden = 1
          } else {
            this.addForm.hidden = 0
          }
          // this.addForm.icon = this.$refs.icon.icon;
          if (this.$route.query.id == '') { // 新增保存
            addFunction(this.addForm).then(res => {
              if (res.errcode == 0) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$router.go(-1)
              } else if (res.errcode == 4010) {
                if (res.errmsg.indexOf('url') != -1){
                  this.isPri = false;
                  this.$refs.addForm.validateField('url');
                  this.$message({
                    message: 'url已存在',
                    type: 'error'
                  });
                } else if (res.errmsg.indexOf('name') != -1) {
                  this.isPri = false;
                  this.$refs.addForm.validateField('name');
                  this.$message({
                    message: '名称已存在',
                    type: 'error'
                  });
                } else {
                  this.$message({
                    message: res.errmsg,
                    type: 'error'
                  });
                }
              } else {
                this.$message({
                  message: res.errmsg,
                  type: 'error'
                });
              }
            })
          } else { // 修改保存
            editFunction(this.$route.query.id, this.addForm).then(res => {
              if (res.errcode == 0) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.$router.go(-1)
              } else if (res.errcode == 4010) {
                if (res.errmsg.indexOf('url') != -1){
                  this.isPri = false;
                  this.$refs.addForm.validateField('url');
                  this.$message({
                    message: 'url已存在',
                    type: 'error'
                  });
                } else if (res.errmsg.indexOf('name') != -1) {
                  this.isPri = false;
                  this.$refs.addForm.validateField('name');
                  this.$message({
                    message: '名称已存在',
                    type: 'error'
                  });
                } else {
                  this.$message({
                    message: res.errmsg,
                    type: 'error'
                  });
                }
              } else {
                this.$message({
                  message: res.errmsg,
                  type: 'error'
                });
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted() {
    //新增还是编辑
    if (this.$route.query.id == '') {
      console.log('新增');
    } else {
      searcchEdit(this.$route.query.id).then(res => {
        this.addForm = res.data;
        // this.$refs.icon.icon = this.addForm.icon;
        if (res.data.hidden == null || res.data.hidden == 0) {
          this.addForm.hidden = false;
        } else {
          this.addForm.hidden = true;
        }
      })
    }
  }
}
</script>

