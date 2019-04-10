<template>
  <div class="widget-form-container">
    <el-form :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">

      <draggable class="widget-form-list"
        v-model="data.list"
        :options="{group:'people', ghostClass: 'ghost'}"
        @end="handleMoveEnd"
        @add="handleWidgetAdd"
      >

        <template v-for="(element, index) in data.list">
          <template v-if="element.type == 'grid'">
            <div v-if="element && element.key && !element.block"  class="widget-grid-container data-grid" :key="element.key" style="position: relative;">
              <el-row class="widget-grid "
                type="flex"
                :class="{active: selectWidget.key == element.key}"
                :gutter="element.options.gutter ? element.options.gutter : 0"
                :justify="element.options.justify"
                :align="element.options.align"
                @click.stop.native="handleSelectWidget(index)">
                <el-col  v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span ? col.span : 0">
                  <div style="border: 1px dashed #999;">
                    <draggable
                      class="widget-form-list"
                      style="padding-bottom: 50px;"
                      v-model="col.list"

                      :options="{group:'people', ghostClass: 'ghost'}"
                      @end="handleMoveEnd"
                      @add="handleWidgetColAdd($event, element, colIndex)"
                    >
                      <widget-form-two
                        v-for="(el, i) in col.list"
                        :key="el.key"
                        v-if="el.key"
                        :element="el"
                        :select.sync="selectWidget"
                        :index="i"
                        :data="col"
                        :labelWidth="data.config.labelWidth"></widget-form-two>
                    </draggable>
                  </div>
                </el-col>
              </el-row>
              <el-button title="删除" style="bottom: -20px;" @click.stop="handleWidgetDelete(index)" class="widget-action-delete" v-if="selectWidget.key == element.key" circle plain type="danger">
                <icon name="regular/trash-alt" style="width: 12px;height: 12px;"></icon>
              </el-button>
              <el-button title="追加" style="bottom: -20px;" v-if="element.addBtnShow" size="mini" type="primary" @click.stop="copyElement(index)" circle plain class="widget-action-add">
                <icon name="plus-circle" style="width: 17px; height: 17px;"></icon>
              </el-button>
            </div>
            <div v-if="element && element.key && element.block"  class="widget-grid-container data-grid" :key="element.key" style="position: relative;">
              <el-row class="widget-grid " style="
                background: #FFFFFF;
                border: 1px solid #eeeeee;
                -webkit-box-shadow: 2px 0px 8px 0px #c1c1c1;
                box-shadow: 2px 0px 8px 0px #c1c1c1;
                padding-top: 54px;
                margin-top: 10px !important;"
                type="flex"
                :class="{active: selectWidget.key == element.key}"
                :gutter="element.options.gutter ? element.options.gutter : 0"
                :justify="element.options.justify"
                :align="element.options.align"
                @click.stop.native="handleSelectWidget(index)">
                <div style="
                  position: absolute;
                  top: 10px;
                  border: 0px solid #e0e0e0;
                  padding: 1px 7px;
                  background: #FFFFFF;
                  border-left-color: #376bff;
                  border-left-width: 3px;
                  border-left-style:solid;
              ">
                 {{element.label}}
                </div>
                <el-col  v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span ? col.span : 0">
                  <div style="border: 1px dashed #999;">
                    <draggable
                      class="widget-form-list"
                      style="padding-bottom: 50px;"
                      v-model="col.list"

                      :options="{group:'people', ghostClass: 'ghost'}"
                      @end="handleMoveEnd"
                      @add="handleWidgetColAdd($event, element, colIndex)"
                    >
                      <widget-form-two
                        v-for="(el, i) in col.list"
                        :key="el.key"
                        v-if="el.key"
                        :element="el"
                        :select.sync="selectWidget"
                        :index="i"
                        :data="col"
                        :labelWidth="data.config.labelWidth"></widget-form-two>
                    </draggable>
                  </div>
                </el-col>
              </el-row>
              <el-button title="删除" style="bottom: -20px;" @click.stop="handleWidgetDelete(index)" class="widget-action-delete" v-if="selectWidget.key == element.key" circle plain type="danger">
                <icon name="regular/trash-alt" style="width: 12px;height: 12px;"></icon>
              </el-button>
              <el-button title="追加" style="bottom: -20px;" v-if="element.addBtnShow" size="mini" type="primary" @click.stop="copyElement(index)" circle plain class="widget-action-add">
                <icon name="plus-circle" style="width: 17px; height: 17px;"></icon>
              </el-button>
            </div>
          </template>
          <template v-else-if="element.type=='table'">
            <el-form-item class="widget-view "
              v-if="element && element.key"
              :class="{active: selectWidget.key == element.key, 'is_req': element.options.required,'widget-view-editor':element.type==='table'}"
              @click.stop.native="handleSelectWidget(index)"
              :labelWidth="(element.label?data.config.labelWidth:0)+'px'"
            >
                <span slot="label" v-if="element.label">
                  {{element.label}}
                </span>
                  <template>
                  <el-table
                      :data="element.options.data"

                    >
                      <el-table-column v-for="(item, index) in element.options.options"
                        :label="item.label"
                        :type="item.type"
                        :header-align="item.headeralign"
                       >
                        <template slot-scope="scope">
                                 <draggable
                                    class="widget-form-list"
                                    style="padding-bottom: 50px;"
                                    v-model="item.columns[0].list"

                                    :options="{group:'people', ghostClass: 'ghost'}"
                                    @end="handleMoveEnd"
                                    @add="handleWidgetColAdd($event, item, 0)"
                                  >
                                <!-- <widget-form-item
                                  v-for="(el, i) in item.columns[0].list"
                                  :key="el.key"
                                  v-if="el.key"
                                  :element="el"
                                  :select.sync="selectWidget"
                                  :index="i"
                                  :data="item.columns[0]"
                                  :labelWidth="data.config.labelWidth"></widget-form-item> -->
                                  <widget-form-two
                                  v-for="(el, i) in item.columns[0].list"
                                  :key="el.key"
                                  v-if="el.key"
                                  :element="el"
                                  :select.sync="selectWidget"
                                  :index="i"
                                  :data="item.columns[0]"
                                  :labelWidth="data.config.labelWidth"></widget-form-two>
                              </draggable>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>

                <el-button title="删除" @click.stop="handleWidgetDelete(index)" class="widget-action-delete" v-if="selectWidget.key == element.key" circle plain type="danger">
                  <icon name="regular/trash-alt" style="width: 12px;height: 12px;"></icon>
                </el-button>
                <el-button title="复制" @click.stop="handleWidgetClone(index)" class="widget-action-clone" v-if="selectWidget.key == element.key" circle plain type="primary">
                  <icon name="regular/clone" style="width: 12px;height: 12px;"></icon>
                </el-button>

            </el-form-item>
          </template>
          <template v-else>
            <widget-form-item v-if="element && element.key"  :key="element.key" :element="element" :select.sync="selectWidget" :index="index" :data="data"></widget-form-item>
          </template>
        </template>

      </draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetFormItem from './WidgetFormItem'
import WidgetFormTwo from './WidgetFormTwo'
export default {
  components: {
    Draggable,
    WidgetFormItem,
    WidgetFormTwo
  },
  props: ['data', 'select'],
  data () {
    return {
      selectWidget: this.select
    }
  },
  methods: {
    // 追加元素
    copyElement(index) {
      this.$store.commit('SET_COPYINDEX', index)
    },
    handleMoveEnd ({newIndex, oldIndex}) {
      console.log('index', newIndex, oldIndex)
    },
    handleSelectWidget (index) {
      this.selectWidget = this.data.list[index]
    },
    handleWidgetAdd (evt) {
      const newIndex = evt.newIndex
      const to = evt.to
      const id=this.$route.query.id;
      const tableedit={};
      if(id){
          tableedit["syncStatus"]="1"
      }
      //为拖拽到容器的元素添加唯一 key
      const key = Date.parse(window.moment()) + '_' + Math.ceil(Math.random() * 99999)
      this.$set(this.data.list, newIndex, {
        ...this.data.list[newIndex],
        options: {
          ...this.data.list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key,
        // 绑定键值
        model: this.data.list[newIndex].type + '_' + key,
        rules: [],
        ...tableedit
      })

      if (this.data.list[newIndex].type === 'radio' || this.data.list[newIndex].type === 'checkbox'||this.data.list[newIndex].type==="table") {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
            ...this.data.list[newIndex].options,
            options: this.data.list[newIndex].options.options.map(item => ({
              ...item
            }))

          }
        })
      }

      if (this.data.list[newIndex].type==="table") {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
             ...this.data.list[newIndex].options,
            options: this.data.list[newIndex].options.options.map(item => ({
              ...item,
              columns: item.columns.map(items => ({
               ...items,
                list: items.list.map(itemss => ({
                    ...itemss

                }))
              }))
            }))
          }
        })
      }

      if (this.data.list[newIndex]&&this.data.list[newIndex].type === 'grid') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          columns: this.data.list[newIndex].columns.map(item => ({...item}))
        })
      }

      this.selectWidget = this.data.list[newIndex]
    },
    handleWidgetColAdd ($event, row, colIndex) {
      const newIndex = $event.newIndex
      const oldIndex = $event.oldIndex
      const item = $event.item

      // // 防止布局元素的嵌套拖拽
      // if (item.className.indexOf('data-grid') >= 0) {
      //   // 如果是列表中拖拽的元素需要还原到原来位置
      //   item.tagName === 'DIV' && this.data.list.splice(oldIndex, 0, row.columns[colIndex].list[newIndex])
      //   row.columns[colIndex].list.splice(newIndex, 1)
      //   return false
      // }
      const key = Date.parse(window.moment()) + '_' + Math.ceil(Math.random() * 99999)
      var  ColumnsList=row.columns[colIndex].list?row.columns[colIndex].list:row.columns;
      const id=this.$route.query.id;
      const tableedit={};
      if(id){
          tableedit["syncStatus"]="1"
      }
      this.$set(ColumnsList, newIndex, {
        ...ColumnsList[newIndex],
        options: {
          ...ColumnsList[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key,
        // 绑定键值
        model: ColumnsList[newIndex].type + '_' + key,
        rules: [],
        ...tableedit
      })

      if (ColumnsList[newIndex].type === 'radio' || ColumnsList[newIndex].type === 'checkbox') {
        this.$set(ColumnsList, newIndex, {
          ...ColumnsList[newIndex],
          options: {
            ...ColumnsList[newIndex].options,
            options: ColumnsList[newIndex].options.options.map(item => ({
              ...item
          }))
          }
        })
      }
      if (ColumnsList[newIndex].type==="table") {
        this.$set(ColumnsList, newIndex, {
          ...ColumnsList[newIndex],
          options: {
             ...ColumnsList[newIndex].options,
            options: ColumnsList[newIndex].options.options.map(item => ({
              ...item,
              columns: item.columns.map(items => ({
               ...items,
                list: items.list.map(itemss => ({
                    ...itemss

                }))
              }))
            }))
          }
        })
      }
      if (ColumnsList[newIndex]&&ColumnsList[newIndex].type === 'grid') {
        this.$set(ColumnsList, newIndex, {
          ...ColumnsList[newIndex],
          columns: ColumnsList[newIndex].columns.map(item => ({...item}))
        })
      }

      this.selectWidget = ColumnsList[newIndex]
    },
    handleWidgetDelete (index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.list[index - 1]
        }
      } else {

        this.selectWidget = this.data.list[index + 1]
      }
      const id=this.$route.query.id;
      if(id){
        if(!window.JsonDataDel){
            window.JsonDataDel=[];
        }
        if(this.selectWidget["syncStatus"]){
         if(this.selectWidget["syncStatus"]!="1"){
           window.JsonDataDel.push(this.selectWidget);
         }
        }else{
          window.JsonDataDel.push(this.selectWidget);
        }
      }
      this.$nextTick(() => {
        this.data.list.splice(index, 1)
      })
    },
  },
  watch: {
    select (val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true
    },
    data(val){
       console.log(val)
    }
  }
}
</script>
