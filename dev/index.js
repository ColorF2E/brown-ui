import Vue from 'vue';
import router from './router';
import VueRouter from 'vue-router';
import App from './app';
import brown from '../src';
import DemoBlock from './component/demo-block';
import './main.scss'

Vue.use(VueRouter);

Vue.use(brown);
Vue.use(brown.Previewer);

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