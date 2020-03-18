<template>
    <div>
        <h3>快速上手</h3>
<p>本节将介绍如何在项目中使用 brown</p>

<p>引入 brown</p>
<p>在 <code>index.js</code> 中写入以下内容</p>

<code>
import Vue from 'vue';
import App from './app';
import brown from '../src';
Vue.use(brown);
Vue.use(brown.Previewer);
new Vue({
    el:'#app',
    template: '< App/>',    
    components:{App},
    router
});
</code>
    </div>
</template>