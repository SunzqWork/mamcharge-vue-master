<template>
  <div id='addJob'>
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
      <!-- <template slot="$expand" slot-scope="scope">
        123
      </template> -->
    </ch-tree-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      props: {
        stripe: true,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: false,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: true
      },
      data: [
        {
          name: "Tom",
          sex: "male",
          _isChecked: true,
          score: 20
        },
        {
          name: "xx",
          sex: "xx",
          _isChecked: false,
          score: 20
        },
      ],
      columns: [
        {
          label: "区域范围",
          prop: "name",
          width: "400px"
        },
        {
          label: "区域负责人",
          prop: "sex",
          minWidth: "50px"
        },
        {
          label: "区域商户数量",
          prop: "score"
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
    checkclik(row, rowIndex, $event) {
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
#addJob {
  margin-top: 100px;
}
</style>

