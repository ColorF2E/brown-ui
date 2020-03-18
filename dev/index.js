import Vue from 'vue';
import router from './router';
import VueRouter from 'vue-router';
import App from './app';
import brown from '../src';
import DemoBlock from './component/demo-block';
import './main.scss'
// vxe-table
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// vxe-table
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/index.css';
// vxe-table
Vue.use(iView)
Vue.use(VXETable);
Vue.use(VueRouter);

Vue.use(brown);
Vue.use(brown.Previewer);
import './utils/plugins_xe-utils'; // 工具
import './utils/plugins_vxe-table'; // 表格
Vue.component('item-zh',{
    functional:true,
    render(h,ctx){
        let item = ctx.props.item;
        return h('li',ctx.data,[
            h('div',{attrs:{class:'name'}},[item.value]),
            h('span',{attrs:{class:'addr'}},[item.address])
        ]);
    },
    props:{
        item:{
            type:Object,
            required:true
        }
    }
});

Vue.component('demo-block', DemoBlock);

new Vue({
    el:'#app',
    template: '<App/>',    
    components:{App},
    router
});