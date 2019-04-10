<template>
  <div id='add-Job-Authority'>
      <el-radio-group v-model="radio">
        <el-radio :label="1">基础设置</el-radio>
        <el-radio :label="2" disabled >高级设置</el-radio>
      </el-radio-group>
      <el-tabs v-model="activeName">
        <el-tab-pane label="组织机构" name='1'>
            <ch-tree-table
              ref="table"
              sum-text="sum"
              index-text="#"
              :data="data"
              :columns="columns"
              :stripe="props.stripe"
              :border="props.border"
              :show-header="props.showHeader"
              :show-summary="props.showSummary"
              :show-row-hover="props.showRowHover"
              :show-index="props.showIndex"
              :tree-type="props.treeType"
              :is-fold="props.isFold"
              :expand-type="props.expandType"
              @checkbox-click='checkclik'
              :selection-type="props.selectionType">
            </ch-tree-table>
          
        </el-tab-pane>
        <el-tab-pane label="商户">
          
        </el-tab-pane>
      </el-tabs>
      <div class="foot_btns">
        <el-button type="primary" @click.native="save"  class="btn-theme">保 存</el-button>
        <el-button type="primary" @click.native="back" class="btn-default">返 回</el-button>
      </div>
  </div>
</template>
<script>
import { orgTree } from "@/api/premission";
import {  addJobApi, getJobPermisson } from "@/api/job";
import Job from "@/utils/job";
export default {
  computed: {
    jobid() {
      return this.$store.state.job.jobid;
    }
  },
  data() {
    return {
      activeName: "1",
      radio: 1,
      props: {
        stripe: true,
        border: false,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: false,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: true
      },
      changeData: [],
      data: [],
      columns: [
        {
          label: "组织机构",
          prop: "fullName",
          minWidth: "300px"
        },
        {
          label: "负责人",
          prop: "principalName",
          width: "100px"
        }
        // {
        //   label: "likes",
        //   prop: "likes",
        //   minWidth: "200px",
        //   type: "template",
        //   template: "likes"
        // }
      ]
    };
  },
  methods: {
    save() {
      let newArr = Job.getIds(this.changeData);
      if (newArr.length > 0) {
        let postdata = {
          senior: false,
          postId: this.jobid,
          sysPostFields: [
            {
              fieldType: 8,
              fieldValue: newArr.join(",")
            }
          ]
        };
        addJobApi(postdata).then(res => {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.$emit("CloseDialog");
        }).catch(err => {
          console.log(err)
        })
      }
    },
    back() {
      this.$emit("input", "1");
    },
    checkclik(row, rowIndex) {
      this.changeData = rowIndex;
    },
    getorgTree() {
      orgTree().then(res => {
        let newArr = [];
        if (this.jobid) {
          getJobPermisson(this.jobid).then(res1 => {
            if (res1.data.length > 0) {
              newArr = Job.getJobPermissondata(
                res1.data[0].fieldValue.split(","),
                [res.data]
              );
              this.data = newArr;
              Job.getChangeData(newArr,this.changeData)
            } else {
              newArr = Job.getTreeDate([res.data]);
              this.data = newArr;
            }
          });
        }
      });
    },
  },
  mounted() {
    this.getorgTree();
  }
};
</script>


<style lang="scss">
#add-Job-Authority {
  .el-radio-group {
    margin-bottom: 20px;
  }
  .foot_btns {
    text-align: center;
    margin-top: 20px;
  }
  .zk-table__header-row {
    .zk-table__header-cell {
      .zk-checkbox__icon {
        display: none;
      }
    }
  }
}
</style>
