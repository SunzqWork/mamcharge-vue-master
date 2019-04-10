import Vue from 'vue'
import './los.css'
Vue.component('my-remote', {
  functional: true,
  render: function(h, ctx) {
    var item = ctx.props.item;
    let str = h('li', ctx.data, [
      h('div', { attrs: { class: 'name' } }, [item.value]),
      h('span', { attrs: { class: 'addr' } }, [item.address])
    ]);
    if (item.str) { // 根据参数不同 修改原模版结构
      str = h('center', { attrs: { class: 'ems' } }, [item.str])
    }
    return str
  },
  props: {
    item: { type: Object, required: true }
  }
});
 
export default {
  data() {
    return {
      restaurants: [],
      state: '',
      timeout: null,
      _that: {} // 记录this，用来发起http请求
    };
  },
  methods: {
    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      if (restaurants.length > 0) { // 如果参数都没变化，则使用缓存数据，避免请求沉积
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      } else {
        const qtype = '参数';
        this._that.$http('/inner', { qtype: qtype })
          .then((res) => {
              restaurants = this.loadAll(res);
              this.restaurants = restaurants;
              let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
              cb(results);
          })
          .catch((err) => {
            restaurants = this.loadAll();
            let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            cb(results);
          });
      }
    },
    createFilter(queryString) {
      return (restaurant) => {
        if (restaurant.str) return false;
        return (restaurant.value.indexOf(queryString) >= 0);
      };
    },
    loadAll(data) {
      let serier = [];
      if (data) {
        for (let i = 0, l = data.length; i < l; i++) {
          let a = data[i];
          let b = '';
          if (typeof a === "object") {
            b = a[1];
            a = a[0];
          }
          serier.push({ "value": a, "address": b })
        }
      } else { // 如果没有请求到数据，则显示暂无数据！
        serier.push({ "str": '暂无数据' })
      }
      return serier;
    },
    handleIconClick(ev) {
      this.state = "";
    }
  },
  mounted() {
    this._that = this;
  }
}