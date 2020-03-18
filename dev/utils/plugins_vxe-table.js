import Vue from 'vue'
import VXETable from 'vxe-table';
import 'vxe-table/lib/index.css'
import VXETablePluginIView from 'vxe-table-plugin-iview';
import 'vxe-table-plugin-iview/dist/style.css';
Vue.use(VXETable);
VXETable.use(VXETablePluginIView);