<template>
    <div id="vxetable">
        <demo-block title="vxe-table组件库" desc="相关地址">
            <p>
                github代码地址：<a href="https://github.com/xuliangzhan/vxe-table" target="_blank">https://github.com/xuliangzhan/vxe-table</a>
            </p>
            <p>
                github文档地址：<a href="https://xuliangzhan.github.io/vxe-table" target="_blank">https://xuliangzhan.github.io/vxe-table</a>
            </p>
        </demo-block>
        <demo-block title="vxe-table(开发操作)" desc="表格组件开发备注">
            <p>安装相关依赖：<b>npm install xe-utils vxe-table</b></p>
            <p>组件库样式：这里使用iview组件库样式，需使用插件<a href="https://www.npmjs.com/package/vxe-table-plugin-iview" target="_blank">vxe-table-plugin-iview</a> </p>
            <p>表格拖拽：需使用第三方依赖<a href="https://www.npmjs.com/package/sortablejs" target="_blank">sortablejs</a></p>
            <p>程序入口代码处理：详见组件库项目 <b>brown>>dev>>index.js</b> 与 <b>brown>>dev>>utils</b></p>
            <p><b>当前插件稳定版本号如下</b><span style="color:red;">(新版本目前拖拽至树子节点有错误)</span>：</p>
            <ol style="margin-left:30px;">
                <li>vxe-table: "^2.5.11"</li>
                <li>vxe-table-plugin-iview: "^1.4.3"</li>
                <li>xe-utils: "^2.2.4"</li>
                <li>sortablejs: "^1.10.0-rc3"</li>
            </ol>
        </demo-block>
        <demo-block title="vxe-table(自定义空表格)" desc="表格数据为空时展示自定义内容">
            <parameterTable ref="refTableNull" :table-data="tableDataNull" />
        </demo-block>
        <demo-block title="vxe-table(树形表格)" desc="表格中使用树状结构来展现对应数据">
            <p>参数表格树：对接口传递参数进行实体化配置处理，可对参数节点进行详细配置与操作</p>
            <ol style="margin-left:30px;">
                <li>当参数类型为object时才可增加子节点信息(操作栏显示新增子节点操作图标)</li>
                <li>当某一树节点有子节点时，参数类型object不能够进行选择修改</li>
                <li>树结构层级最多为五级</li>
                <li>数据拖拽时若有子节点则一并拖拽，父节点不能拖拽至子节点</li>
            </ol>
            <i-button type="primary" :ripple="true" title="新增一行" @click="addParameterData" style="margin:10px 0px;">新增</i-button>
            <parameterTable ref="refParameterData" :table-data="parameterData" />
        </demo-block>
    </div>
</template>

<script>
import ParameterTable from '../component/vxetable/parameterTable'
export default {
    components:{
        'parameterTable':ParameterTable
    },
    data(){
        return {
            tableDataNull:[],
            parameterData:[
                {
                    "realFieldName":"form",
                    "paramFieldName":"form",
                    "required":true,
                    "paramType":3,
                    "remark":"表单对象",
                    "children":[
                        {
                            "realFieldName":"userList",
                            "paramFieldName":"userList",
                            "required":false,
                            "paramType":4,
                            "remark":"用户列表"
                        },
                        {
                            "realFieldName":"token",
                            "paramFieldName":"token",
                            "required":false,
                            "paramType":0,
                            "remark":"表单标识"
                        },
                        {
                            "realFieldName":"name",
                            "paramFieldName":"name",
                            "required":false,
                            "paramType":0,
                            "remark":"表单名称"
                        }
                    ]
                }
            ],
        }
    },
    methods:{
        addParameterData(){
            this.$refs.refParameterData.addRow();
        }
    }
};
</script>

<style lang="scss" scoped>
#vxetable {
    .itemFlex{
        display: flex;
        flex-direction: column;
    }
}
</style>


