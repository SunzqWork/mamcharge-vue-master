const Job={
  getTreeDate(arr){
    arr.forEach((item,index)=>{
      item._isChecked= false
      if(item.children && item.children.length>0 ){
        this.getTreeDate(item.children)
      }
    })
    return arr
  },
  getIds(arr,newarr){
   let newArr = []
   arr.forEach(item=>{
     if(item._isChecked)newArr.push(item.id)
   })
   return newArr
  },
  getChangeData(arr1,arr2){
    arr1.forEach(item=>{
      if(item._isChecked){
        arr2.push(item)
      }
      if(item.children && item.children.length>0 ){
        this.getChangeData(item.children,arr2)
      }
    })
  },
  getJobPermissondata(arr1,arr2){
    let _self =this
    arr1.forEach(item=>{
      _self.formatPermissondata(arr2,item)
    })
    return arr2
  },
  formatPermissondata(arr1,id){
    arr1.forEach(item=>{
      if(item.id===id){
        item._isChecked = true
        return true
      }
      if(item.children && item.children.length>0 ){
        this.formatPermissondata(item.children,id)
      }
    })
  }
}
module.exports=Job