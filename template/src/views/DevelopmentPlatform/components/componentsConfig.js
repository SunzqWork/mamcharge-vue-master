import {columnsJsons} from './JsonData.js';
export const basicComponents = [
  {
    type: 'text',
    label: '文本',
    ...columnsJsons,
    icon: 'font',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: '',
      ToolTipsdisabled:false,
      ToolTipscontent:'',
      ToolTipsShowLocation:"TitleRight",
      ToolTipsplacement:"top",
      ToolTipsenterable:true,
      ToolTipsopendelay:0,
      ToolTipshideafter:500,

    }
  },
  {
    type: 'input',
    label: '单行文本',
    ...columnsJsons,
    icon: 'regular/keyboard',
    options: {
      width: '100%',
      readonly: false,
      disabled: false,
      clearable: true,
      maxlength: 255,
      hidden: false,
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      isupload: false,
      placeholder: '',
      ToolTipsdisabled:false,
      ToolTipscontent:'',
      ToolTipsShowLocation:"TitleRight",
      ToolTipsplacement:"top",
      ToolTipsenterable:true,
      ToolTipsopendelay:0,
      ToolTipshideafter:500,

      }

  },
  {
    type: 'textarea',
    label: '多行文本',
    ...columnsJsons,
    icon: 'regular/keyboard',
    options: {
      width: '100%',
      defaultValue: '',
      readonly: false,
      maxlength: 255,
      disabled: false,
      clearable: true,
      required: false,
      pattern: '',
      placeholder: '',
      ToolTipsdisabled:false,
      ToolTipscontent:'',
      ToolTipsShowLocation:"TitleRight",
      ToolTipsplacement:"top",
      ToolTipsenterable:true,
      ToolTipsopendelay:0,
      ToolTipshideafter:500,


    }
  },
  {
    type: 'select',
    label: '下拉选择框',
    ...columnsJsons,
    icon: 'regular/caret-square-down',
    options: {
      width: '100%',
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: false,
      options: [
        {
          value: '下拉框1'
        },
        {
          value: '下拉框2'
        },{
          value: '下拉框3'
        }
      ],
      remote: false,
      remoteType: 'APIInterface', // func 内部方法 InlineTable 内联表 APIInterface API接口
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remotePara: '', // API参数配置
      remoteFunc: '',
      ToolTipsdisabled:false,
      ToolTipscontent:'',
      ToolTipsShowLocation: "TitleRight",
      ToolTipsplacement:"top",
      ToolTipsenterable:true,
      ToolTipsopendelay:0,
      ToolTipshideafter:500,
    }
  },
  {
    type: 'number',
    label: '计数器',
    ...columnsJsons,
    icon: 'sort-numeric-up',
    options: {
      width: '100%',
      precision: 1,
      required: false,
      readonly: false,
      disabled: false,
      clearable: true,
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: '',
      ToolTipsdisabled: false,
      ToolTipscontent: '',
      ToolTipsShowLocation: "TitleRight",
      ToolTipsplacement: "top",
      ToolTipsenterable: true,
      ToolTipsopendelay: 0,
      ToolTipshideafter: 500,

      }

  },
  {
    type: 'radio',
    label: '单选框组',
    ...columnsJsons,
    icon: 'regular/dot-circle',
    options: {
      inline: false,
      defaultValue: '',
      showLabel: false,
      readonly: false,
      disabled: false,
      options: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        },
        {
          value: '选项3',
          label: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteType: 'APIInterface', // func 内部方法 InlineTable 内联表 APIInterface API接口
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remotePara: '', // API参数配置
      remoteFunc: '',
      ToolTipsdisabled:false,
      ToolTipscontent:'',
      ToolTipsShowLocation:"TitleRight",
      ToolTipsplacement:"top",
      ToolTipsenterable:true,
      ToolTipsopendelay:0,
      ToolTipshideafter:500,

    }
  },
  {
    type: 'checkbox',
    label: '多选框组',
    ...columnsJsons,
    icon: 'regular/check-square',
    options: {
      inline: false,
      defaultValue: ['选项1'],
      readonly: false,
      disabled: false,
      showLabel: false,
      options: [
        {
          value: '选项1'
        },
        {
          value: '选项2'
        },
        {
          value: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteType: 'APIInterface', // func 内部方法 InlineTable 内联表 APIInterface API接口
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remotePara: '', // API参数配置
      remoteFunc: '',
      ToolTipsdisabled:false,
      ToolTipscontent:'',
      ToolTipsShowLocation:"TitleRight",
      ToolTipsplacement:"top",
      ToolTipsenterable:true,
      ToolTipsopendelay:0,
      ToolTipshideafter:500,

    }
  },
  {
    type: 'time',
    label: '时间选择器',
    ...columnsJsons,
    icon: 'regular/clock',
    options: {
      width: '100%',
      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      ToolTipsdisabled:false,
      ToolTipscontent:'',
      ToolTipsShowLocation:"TitleRight",
      ToolTipsplacement:"top",
      ToolTipsenterable:true,
      ToolTipsopendelay:0,
      ToolTipshideafter:500,

    }
  },
  {
    type: 'date',
    label: '日期选择器',
    ...columnsJsons,
    icon: 'regular/calendar-alt',
    options: {
      width: '100%',
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      ToolTipsdisabled:false,
        ToolTipscontent:'',
        ToolTipsShowLocation:"TitleRight",
        ToolTipsplacement:"top",
        ToolTipsenterable:true,
        ToolTipsopendelay:0,
        ToolTipshideafter:500,

    }
  },
  {
    type: 'rate',
    label: '评分',
    ...columnsJsons,
    icon: 'regular/star',
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false,
      ToolTipsdisabled:false,
        ToolTipscontent:'',
        ToolTipsShowLocation:"TitleRight",
        ToolTipsplacement:"top",
        ToolTipsenterable:true,
        ToolTipsopendelay:0,
        ToolTipshideafter:500,


    }
  },
  {
    type: 'color',
    label: '颜色选择器',
    ...columnsJsons,
    icon: 'palette',
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false,
      ToolTipsdisabled:false,
        ToolTipscontent:'',
        ToolTipsShowLocation:"TitleRight",
        ToolTipsplacement:"top",
        ToolTipsenterable:true,
        ToolTipsopendelay:0,
        ToolTipshideafter:500,

    }
  },
  {
    type: 'switch',
    label: '开关',
    ...columnsJsons,
    icon: 'toggle-off',
    options: {
      defaultValue: false,
      required: false,
      disabled: false,
        ToolTipsdisabled:false,
        ToolTipscontent:'',
        ToolTipsShowLocation:"TitleRight",
        ToolTipsplacement:"top",
        ToolTipsenterable:true,
        ToolTipsopendelay:0,
        ToolTipshideafter:500,

    }
  },
  {
    type: 'slider',
    label: '滑块',
    ...columnsJsons,
    icon: 'sliders-h',
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: '',
      ToolTipsdisabled:false,
        ToolTipscontent:'',
        ToolTipsShowLocation:"TitleRight",
        ToolTipsplacement:"top",
        ToolTipsenterable:true,
        ToolTipsopendelay:0,
        ToolTipshideafter:500,

    }
  },
  {
    type: 'table',
    label: '表格',
    ...columnsJsons,
    icon: 'table',
    options: {
      data:[{
        "标题1":'',
        "标题2":''
      }],//显示数据
      stripe:true,//是否为斑马纹
      border:true,//是否带有纵向边框
      fit:true,//列的宽度是否自撑开
      showheader:true,//是否显示表头
      //rowclassname:'',//	行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。	Function({row, rowIndex})/String	—	—
      //rowstyle:'',//	行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。	Function({row, rowIndex})/Object	—	—
      //cellclassname:'',//	单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。	Function({row, column, rowIndex, columnIndex})/String	—	—
      //cellstyle:'',//	单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。	Function({row, column, rowIndex, columnIndex})/Object	—	—
      //headerrowclassname:'',//	表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。	Function({row, rowIndex})/String	—	—
      //headerrowstyle:'',//	表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。	Function({row, rowIndex})/Object	—	—
      //headercellclassname:'',//	表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。	Function({row, column, rowIndex, columnIndex})/String	—	—
      //headercellstyle:'',//	表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。	Function({row, column, rowIndex, columnIndex})/Object	—	—
      rowkey:'',//	行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能的情况下，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。	Function(row)/String	—	—
      emptytext:'',//	空数据时显示的文本内容，也可以通过 slot="empty" 设置	String	—	暂无数据
      defaultexpandall:'',//	是否默认展开所有行，当 Table 中存在 type="expand" 的 Column 的时候有效	Boolean	—	false
      expandrowkeys:[],//	可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。	Array	—
      //defaultsort:'',//	默认的排序列的 prop 和顺序.
      //。它的prop属性指定默认的排序的列，order指定默认排序的顺序	Object	order: ascending, descending如果只指定了prop, 没有指定order, 则默认顺序是ascending tooltip-effect	tooltip effect 属性	String	dark/light
      showsummary:false,//	是否在表尾显示合计行	Boolean	—	false
      sumtext:'',//	合计行第一列的文本	String	—	合计
      //summarymethod:'',//	自定义的合计计算方法	Function({ columns, data })	—	—
      //spanmethod:'',//	合并行或列的计算方法	Function({ row, column, rowIndex, columnIndex })	—	—
      selectonindeterminate:true,//	在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行	Boolean	—	true
      //select:'',//	当用户手动勾选数据行的 Checkbox 时触发的事件	selection, row
      //selectall:'',//	当用户手动勾选全选 Checkbox 时触发的事件	selection
      // selectionchange:'',//	当选择项发生变化时会触发该事件	selection
      // cellmouseenter:'',//	当单元格 hover 进入时会触发该事件	row, column, cell, event
      // cellmouseleave:'',//	当单元格 hover 退出时会触发该事件	row, column, cell, event
      // cellclick:'',//	当某个单元格被点击时会触发该事件	row, column, cell, event
      // celldblclick:'',//	当某个单元格被双击击时会触发该事件	row, column, cell, event
      // rowclick:'',//	当某一行被点击时会触发该事件	row, event, column
      // rowcontextmenu:'',//	当某一行被鼠标右键点击时会触发该事件	row, event
      // rowdblclick:'',//	当某一行被双击时会触发该事件	row, event
      // headerclick:'',//	当某一列的表头被点击时会触发该事件	column, event
      // headercontextmenu:'',//	当某一列的表头被鼠标右键点击时触发该事件	column, event
      // sortchange:'',//	当表格的排序条件发生变化的时候会触发该事件	{ column, prop, order }
      // filterchange:'',//	当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。	filters
      // currentchange:'',//	当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性	currentRow, oldCurrentRow
      // headerdragend:'',//	当拖动表头改变了列的宽度的时候会触发该事件	newWidth, oldWidth, column, event
      // expandchange:'',//	当用户对某一行展开或者关闭的时候会触发该事件	row, expandedRows
      options: [
        {
          type:'',//	对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮	string	selection/index/expand	—
          index:'',//	如果设置了 type=index，可以通过传递 index 属性来自定义索引	number, Function(index)	-	-
          columnkey:'',//	column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件	string	—	—
          label:'标题1',//	显示的标题	string	—	—
          prop:'',//	对应列内容的字段名，也可以使用 property 属性	string	—	—
          fixed:'',//	列是否固定在左侧或者右侧，true 表示固定在左侧	string, boolean	true, left, right	—
          renderheader:'',//	列标题 Label 区域渲染使用的 Function	Function(h, { column, $index })	—	—
          sortable:'',//	对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件	boolean, string	true, false, 'custom'	false
          sortmethod:'',//	对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致	Function(a, b)	—	—
          sortby:'',//	指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推	String/Array/Function(row, index)	—	—
          sortorders:'',//	数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序	array	数组中的元素需为以下三者之一：ascending 表示升序，descending 表示降序，null 表示还原为原始顺序	['ascending', 'descending', null]
          resizable:'',//	对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）	boolean	—	true
          formatter:'',//	用来格式化内容	Function(row, column, cellValue, index)	—	—
          showoverflowtooltip:'',//	当内容过长被隐藏时显示 tooltip	Boolean	—	false
          align:'',//	对齐方式	String	left/center/right	left
          headeralign:'center',//	表头对齐方式，若不设置该项，则使用表格的对齐方式	String	left/center/right	—
          classname:'',//	列的 className	string	—	—
          labelclassname:'',//	当前列标题的自定义类名	string	—	—
          selectable:'',//	仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选	Function(row, index)	—	—
          reserveselection:'',//	仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）	Boolean	—	false
          filters:'',//	数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。	Array[{ text, value }]	—	—
          filterplacement:'',//	过滤弹出框的定位	String	与 Tooltip 的 placement 属性相同	—
          filtermultiple:'',//数据过滤的选项是否多选	Boolean	—	true
          filtermethod:'',//	数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。	Function(value, row, column)	—	—
          filteredvalue:'',//	选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。	Array	—	—
          propAttr:'',//字段定义
          columns: [
            {
              list: []
            }
          ]
        },
        {
          type:'',//	对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮	string	selection/index/expand	—
          index:'',//	如果设置了 type=index，可以通过传递 index 属性来自定义索引	number, Function(index)	-	-
          columnkey:'',//	column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件	string	—	—
          label:'标题2',//	显示的标题	string	—	—
          prop:'',//	对应列内容的字段名，也可以使用 property 属性	string	—	—
          fixed:'',//	列是否固定在左侧或者右侧，true 表示固定在左侧	string, boolean	true, left, right	—
          renderheader:'',//	列标题 Label 区域渲染使用的 Function	Function(h, { column, $index })	—	—
          sortable:'',//	对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件	boolean, string	true, false, 'custom'	false
          sortmethod:'',//	对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致	Function(a, b)	—	—
          sortby:'',//	指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推	String/Array/Function(row, index)	—	—
          sortorders:'',//	数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序	array	数组中的元素需为以下三者之一：ascending 表示升序，descending 表示降序，null 表示还原为原始顺序	['ascending', 'descending', null]
          resizable:'',//	对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）	boolean	—	true
          formatter:'',//	用来格式化内容	Function(row, column, cellValue, index)	—	—
          showoverflowtooltip:'',//	当内容过长被隐藏时显示 tooltip	Boolean	—	false
          align:'',//	对齐方式	String	left/center/right	left
          headeralign:'center',//	表头对齐方式，若不设置该项，则使用表格的对齐方式	String	left/center/right	—
          classname:'',//	列的 className	string	—	—
          labelclassname:'',//	当前列标题的自定义类名	string	—	—
          selectable:'',//	仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选	Function(row, index)	—	—
          reserveselection:'',//	仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）	Boolean	—	false
          filters:'',//	数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。	Array[{ text, value }]	—	—
          filterplacement:'',//	过滤弹出框的定位	String	与 Tooltip 的 placement 属性相同	—
          filtermultiple:'',//数据过滤的选项是否多选	Boolean	—	true
          filtermethod:'',//	数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。	Function(value, row, column)	—	—
          filteredvalue:'',//	选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。	Array	—	—
          propAttr:'',//字段定义
          columns: [{
            list: []
          }]
        }
      ],
      required: false,
      remote: false,
      remoteType: 'APIInterface', // func 内部方法 InlineTable 内联表 APIInterface API接口
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remotePara: '', // API参数配置
      remoteFunc: ''
    }
  }
]

export const advanceComponents = [
  {
    type: 'blank',
    label: '自定义',
    ...columnsJsons,
    icon: 'chalkboard',
    options: {
      defaultType: 'String'
    }
  },
  {
    type: 'imgupload',
    label: '文件上传',
    ...columnsJsons,
    icon: 'file-upload',
    options: {
      params: [
        { label: 'name', value: 'name' },
        { label: 'url', value: 'url' },
        { label: 'md5', value: 'md5' }
      ],
      defaultValue: [],
      size: {
        width: 100,
        height: 100
      },
      width: '',
      // tokenFunc: 'funcGetToken',
      token: '',
      domain: 'web/form/common/data/img/upload',
      disabled: false,
      length: 5, // 最大上传数
      accept: "",
      multiple: true,
      size: 5, // 文件大小限制
      multipleType: [],// 上传的文件类型
      ToolTipsdisabled: false,
      ToolTipscontent: '',
      ToolTipsShowLocation: "TitleRight",
      ToolTipsplacement: "top",
      ToolTipsenterable:true,
      ToolTipsopendelay:0,
      ToolTipshideafter:500,

    }
  }
]

export const layoutComponents = [
  {
    type: 'grid',
    label: '栅格布局',
    ...columnsJsons,
    icon: 'th',
    detail: false,
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  },
  {
    type: 'grid',
    label: '明细',
    ...columnsJsons,
    icon: 'th',
    detail: true, // 用来区分是栅格还是明细
    addBtnShow: true, // 增加按钮显示控制
    btnName: '明细追加',
    columns: [
      {
        span: 24,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  },
  {
    type: 'grid',
    label: '区块',
    ...columnsJsons,
    icon: 'th',
    detail: true, // 用来区分是栅格还是明细
    block: true,
    addBtnShow: false, // 增加按钮显示控制
    btnName: '明细追加',
    columns: [
      {
        span: 24,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  }
]
