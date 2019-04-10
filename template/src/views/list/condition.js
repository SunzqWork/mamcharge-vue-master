import './style.scss'
export default {
  name: 'Condition',
  functional: true,
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  render(h, context) {
    const {
      data
    } = context.props
    const vnodes = []
    let input = (info = {}) => (<div class='mam-boxs'>
        <el-input style="width: 235px;height: 40px;" clearable class='mam-ctrlW' placeholder={`请输入${info.columnComment}`}></el-input>
      </div>),
      number = (info = {}) => (<div class='mam-boxs' >
        <el-input-number class='mam-ctrlB' size='mini' style='margin-right: 5%;'></el-input-number>
        <el-input-number class='mam-ctrlB' size='mini'></el-input-number>
      </div>),
      time = (info = {}) => (<div class='mam-boxs' style="width:480px;">
        <el-date-picker
        style="width: 100%;"
          type='datetimerange'
          start-placeholder='开始日期'
            range-separator="至"
            end-placeholder='结束日期'
          default-time={"['12:00:00']"}
        ></el-date-picker>
      </div>)
    for (let s of data) {
      console.log(s)
      if (s.queried) {
        const DOM = ''
        switch (s.dbType) {
          case 'varchar':
            vnodes.push(input(s))
            break
          case 'datetime':
            vnodes.push(time(s))
            break
        }
      }
    }
    return vnodes
  }
}
