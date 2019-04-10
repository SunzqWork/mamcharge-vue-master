<template>
  <div id="addSystem">
    <zl-card>
      <el-button class="btn-theme" @click="save">
        <svg-icon icon-class="pre-save"></svg-icon>
        确定
      </el-button>
      <el-button class="btn-default" @click="saveCopy" v-show="$route.query.id !== ''">
        <svg-icon icon-class="pre-copy"></svg-icon>
        创建副本
      </el-button>
      <el-button class="btn-default" @click="$router.go(-1)">
        <svg-icon icon-class="pre-back"></svg-icon>
        取消
      </el-button>
    </zl-card>
    <zl-card isHeader icon="prer-features" :title="$route.meta.title">
      <el-form label-width="100px" :inline="true" ref="addForm" :model="addForm" :rules="rules">
        <el-row>
          <el-form-item prop="name" label="模块名称" v-show="addForm.type == 0">
            <el-input v-model="addForm.name" class="zl-input-240px zl-form-control" @change="isPri = true"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="菜单名称" v-show="addForm.type == 1">
            <el-input v-model="addForm.name" class="zl-input-240px zl-form-control" @change="isPri = true"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="页面名称" v-show="addForm.type == 2">
            <el-input v-model="addForm.name" class="zl-input-240px zl-form-control" @change="isPri = true"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="按钮名称" v-show="addForm.type == 3">
            <el-input v-model="addForm.name" class="zl-input-240px zl-form-control" @change="isPri = true"></el-input>
          </el-form-item>
          <el-form-item prop="pids" label="所属上级">
            <el-cascader
              filterable
              class="zl-input-240px zl-form-control"
              expand-trigger="hover"
              :options="pidData"
              :props="props"
              v-model="addForm.pids">
            </el-cascader>
          </el-form-item>
          <el-form-item prop="type" label="类型" v-show="false">
            <el-radio v-model="addForm.type" :label="Number(0)" disabled>模块</el-radio>
            <el-radio v-model="addForm.type" :label="Number(1)" disabled>菜单</el-radio>
            <el-radio v-model="addForm.type" :label="Number(2)" disabled>页面</el-radio>
            <el-radio v-model="addForm.type" :label="Number(3)" disabled>按钮</el-radio>
          </el-form-item>
          <el-form-item prop="url" label="URL">
            <el-input class="zl-input-240px zl-form-control" @change="isPri = true" v-model="addForm.url"></el-input>
            <el-checkbox v-model="isReg" v-if="false">启用正则</el-checkbox>
          </el-form-item>
        </el-row>
        
        <el-row>
          <el-form-item prop="extra" label="额外URL">
            <el-input class="zl-input-240px zl-form-control" v-model="addForm.extra"></el-input>
            <el-checkbox v-model="isReg" v-if="false">启用正则</el-checkbox>
          </el-form-item>
          <el-form-item prop="seq" label="显示顺序"><el-input class="zl-input-240px zl-form-control" v-model="addForm.seq"></el-input></el-form-item>
          <el-form-item prop="hidden" label="是否隐藏" class="zl-input-240px zl-form-control" style="width: 400px"><el-switch v-model="addForm.hidden"></el-switch></el-form-item>
        </el-row>
        
        <el-row>
          <el-form-item prop="perm" label="权限标识"><el-input class="zl-input-240px zl-form-control" v-model="addForm.perm"></el-input></el-form-item>
          <el-form-item prop="" label="图标">
            <!-- <zlIcons class="zl-input-240px zl-form-control" ref="icon"></zlIcons> -->
            <el-input class="zl-input-240px zl-form-control" v-model="addForm.icon" ></el-input>
          </el-form-item>
        </el-row>
        
        <el-form-item prop="tips" label="描述"><el-input type="textarea" resize :rows="4" style="width: 715px" v-model="addForm.tips"></el-input></el-form-item>
      </el-form>
    </zl-card>
  </div>
</template>
<script>
import { chooseFun, chooseParent } from "./chooseFun"
import zlIcons from "@/components/app/zl-icons/index"
import { addSystem, systemId, editSystem } from "@/api/premission"
import { interValidate } from '@/utils/validate'
export default {
  name: 'addSystem',
  components: { zlIcons },
  data() {
    const validatorName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('名称不能为空'));
      } else if(value.length > 20) {
        callback(new Error('名称长度不能超过20个字符'));
      } else if(!this.isPri) {
        callback(new Error('名称已存在'));
      } else {
        callback();
      }
    }
    const validatorSeq = (rule, value, callback) => {
      if (!value) {
        callback(new Error('显示顺序不能为空'));
      } else if(!this.isPri) {
        callback(new Error('显示顺序已存在'));
      } else if(!interValidate(value)) {
        callback(new Error('显示顺序只能是整数'));
      } else if(value.length > 3 || value.length < 1 ) {
        callback(new Error('显示顺序在0-9999以内'));
      } else {
        callback();
      }
    }
    return {
      props: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      isPri: true, //重复性验证
      isCopy: false,
      pidData: [],
      addForm: {
        name: '',
        sysId: 0,
        hidden: false,
        type: Number(this.$route.query.type),
        url: '',
        tips: '',
        icon: '',
        seq: '',
        pid: 0,
        perm: '',
        extra: '',
        pids: null,
        isReg: true
      },
      pidsCopy: '',//级联选择副本
      rules: {
        name: [
          {validator: validatorName, trigger: 'blur'},
          {required: true, trigger: 'blur', message: '名称不能为空'}
        ],
        pids: [
          {required: true, trigger: 'change', message: '所属上级不能为空'}
        ],
        type: [
          {required: true, trigger: 'blur', message: '类型不能为空'}
        ],
        seq: [
          {validator: validatorSeq, trigger: 'blur'},
          {required: true, trigger: 'blur', message: '显示顺序不能为空'}
        ],
        url: [
          {required: true, trigger: 'blur', message: 'url不能为空'},
          {min: 1, max: 100, trigger: 'blur', message: 'url长度不能超过100个字符'}
        ],
        perm: [
          { min: 0, max: 20, message: '权限标识长度不能超过20个字符', trigger: 'blur' }
        ],
        tips: [
          { min: 0, max: 80, message: '描述不能超过80个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    saveCopy() {
      this.isCopy = true;
      this.$message({
        message: '创建副本成功',
        type: 'success'
      });
      this.addForm.name = this.addForm.name + '--副本'
    },
    save() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          // this.addForm.icon = this.$refs.icon.icon;
          this.addForm.seq = Number(this.addForm.seq);
          if (this.addForm.hasOwnProperty('pids')) {
            this.addForm.sysId = this.addForm.pids[0];
            this.addForm.pid = this.addForm.pids[this.addForm.pids.length - 1];
            if (this.addForm.type == 0) {
              this.addForm.pid = 0
            }
            this.pidsCopy = this.addForm.pids;
            delete this.addForm.pids;
          }
          if (this.$route.query.id == '' || this.isCopy) {
            addSystem(this.addForm).then(res => {
              if (res.errcode == 0) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$router.go(-1)
              } else if (res.errcode == 4010) {
                this.addForm.pids = this.pidsCopy;
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
                } else if (res.errmsg.indexOf('seq') != -1) {
                  this.isPri = false;
                  this.$refs.addForm.validateField('seq');
                  this.$message({
                    message: '显示顺序已存在',
                    type: 'error'
                  });
                } else {
                  this.$message({
                    message: res.errmsg,
                    type: 'error'
                  });
                }
              } else {
                this.addForm.pids = this.pidsCopy;
                this.$message({
                  message: res.errmsg,
                  type: 'error'
                });
              }
            })
          } else if (this.$route.query.id !== '' && this.isCopy == false) {
            editSystem(this.$route.query.id, this.addForm).then(res => {
              if (res.errcode == 0) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.$router.go(-1)
              } else if (res.errcode == 4010) {
                this.addForm.pids = this.pidsCopy;
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
                this.addForm.pids = this.pidsCopy;
                this.$message({
                  message: res.errmsg,
                  type: 'error'
                });
              }
            })
          }
        } else {
          return false;
        }
      })
    },
    getFunction() {
      chooseFun(res => {
        this.pidData = res
      });
    }
  },
  mounted() {
    if (this.$route.query.type == '模块' || this.$route.query.type == 0) {
      this.addForm.type = 0
      this.getFunction();
    } else if (this.$route.query.type == '菜单' || this.$route.query.type == 1) {
      this.addForm.type = 1
      chooseParent(res => {
        this.pidData = res;
      }, this.addForm.type)
    } else if (this.$route.query.type == '页面' || this.$route.query.type == 2) {
      this.addForm.type = 2
      chooseParent(res => {
        this.pidData = res;
      }, this.addForm.type)
    } else if (this.$route.query.type == '按钮' || this.$route.query.type == 3) {
      this.addForm.type = 3
      chooseParent(res => {
        this.pidData = res;
      }, this.addForm.type)
    }
    if (this.$route.query.id) {
      systemId(this.$route.query.id).then(res => {
        res.data.pids = res.data.pids.split(",");
        this.addForm = res.data
        // this.$refs.icon.icon = this.addForm.icon;
        this.addForm.pids.unshift(this.$route.query.sysId)
        this.addForm.pids = JSON.parse('[' + String(this.addForm.pids) + ']')
      })
    }
  }
}
</script>
<style lang="scss">

</style>


