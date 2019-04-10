import './baseTable.css'
export default {
  name: 'extraColumns',
  functional: true,
  props: {
    dataInfo:{
		type:Object
	},
    typeInfo: {
	  type: Object,
	  default:{}
		
	}
  },
  render(h, context) {
	//泛取
    let { data, dataInfo,typeInfo } = context.props,
	 { on } = context.data;
	 //定值
	let values = dataInfo[typeInfo.colName] || "";
    const vnodes = [];
	// 默认重置为null
    // 变更
    function handleChange(s){
		values = s.target.value
		dataInfo[typeInfo.colName] = s.target.value
		on['tick'](s.target.value,typeInfo.colName)
		if(typeInfo.colType == "int"){
			if(/[^\d.]/g.test(s.target.value)){
				s.target.value = "";
				return context.parent.$message.error("只能输入整数");
			}
		}
		if(typeInfo.colLen < s.target.value){
			s.target.value = s.target.value.substr(0,typeInfo.colLen)
			return context.parent.$message.error(`不能超过${typeInfo.colLen}位`);
		}
    }
      switch(typeInfo.colType){
        case 'int':
					vnodes.push(<input onKeyup={handleChange} class='inputs' value={values} placeholder={`请填写${typeInfo.displayName}`}/>)
        break;
				case 'varchar':
          vnodes.push(<input value={values} onKeyup={handleChange} class='inputs' placeholder="请输入内容"></input>)
        break;
      }
      // 是否有效
      if(typeInfo.active){

      }
      // 是否必填
      if(typeInfo.required){

      }

    
   
    return vnodes
  }
}
