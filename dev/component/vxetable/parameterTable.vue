<!-- 参数列表 -->
<template>
  <vxe-grid
    ref="refParamterTable"
    :loading="loading"
    :edit-rules="validRules"
    :edit-config="{trigger: 'click', mode: 'cell'}"
    :data="parameterDataTable"
    :tree-config="{children: 'children',expandAll:true}"
    :height="parameterDataTable.length>0?parameterTableHeight+'px':'268px'"
    border
    row-key
    auto-resize
    highlight-hover-row
    class="vxe-table-iview"
    size="small">
    <vxe-table-column title="移动" width="50">
      <template>
        <div class="drag-btn">
          <img
            src="./img/dragTable.svg"
            class="dragImg"/>
        </div>
      </template>
    </vxe-table-column>
    <vxe-table-column title="名称" field="realFieldName" tree-node showOverflow :edit-render="{autofocus: '.autofocusName'}">
      <template v-slot:edit="{row}">
        <input v-model="row.realFieldName" :style="setTreeColumnInputStyle(row.level)" 
        class="vxe-default-input autofocusName" @on-change="changeFieldName($event,row)"></input>
      </template>
      <template v-slot="{ row }">{{ row.realFieldName }}</template>
    </vxe-table-column>
    <vxe-table-column field="paramFieldName" title="对应名称" showOverflow :edit-render="{name: 'input'}"></vxe-table-column>
    <vxe-table-column field="required" title="是否必选" width="120" :edit-render="{type: 'default'}">
      <template v-slot:edit="{row}">
        <Checkbox
          v-model="row.required"
          @on-change="changeRequired($event,row)" />
      </template>
      <template v-slot="{ row }">{{ row.required ? '是' :'' }}</template>
    </vxe-table-column>
    <vxe-table-column field="paramType" title="参数类型" :edit-render="{type: 'default'}">
      <template v-slot:edit="{row}">
        <Select 
          v-model="row.paramType" 
          :disabled="row.children && row.children.length" 
          :title="row.children && row.children.length > 0 ? '已有子节点，不能更改参数类型' : ''">
          <Option
            v-for="(item,index) in paramTypeList"
            :value="item.code"
            :key="index"
          >{{ item.name }}</Option>
        </Select>
      </template>
      <template v-slot="{ row }">{{ getSelectLabel(row.paramType, paramTypeList)  }}</template>
    </vxe-table-column>
    <vxe-table-column field="remark" title="描述" showOverflow :edit-render="{name: 'input'}"></vxe-table-column>
    <vxe-table-column
      title="操作"
      width="120px">
      <template v-slot="{row}">
        <img alt title="删除信息" src="./img/delete.svg" @click="deleteRow(row)" style="cursor:pointer;margin:0 13px;"></img>
        <template v-if="row.paramType == 3 && row.level < 5">
          <img alt title="新增子项" src="./img/addChildren.svg" @click="addRowChild(row)" style="cursor:pointer;margin:0 13px;"></img>
        </template>
      </template>
    </vxe-table-column>
    <template v-slot:empty>
      <noData />
    </template>
  </vxe-grid>
</template>
<script>
import Sortable from "sortablejs";
import XEUtils from "xe-utils";
import NoData from "./noData";
import drapImg from "./img/dragTable.svg";
import deleteImg from "./img/delete.svg";
import addImg from "./img/addChildren.svg";
export default {
  components: {
    'noData': NoData,
  },
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      parameterTableHeight: 150,
      loading: true,
      paramTypeList: [],
      validRules: {
        realFieldName: [
          { required: true, message: "名称必须填写" },
          { min: 1, max: 50, message: "名称长度在 1 到 50 个字符" }
        ],
        paramFieldName: [
          { required: true, message: "对应名称必须填写" },
          { min: 1, max: 50, message: "对应名称长度在 1 到 50 个字符" }
        ],
        paramType: [{ required: true, message: "参数类型必须选择" }],
        remark: [{ min: 0, max: 1024, message: "描述长度在 1 到 1024 个字符" }]
      },
      existenceLevel: 1, //表格中已经存在的层级数
      moveLevel: 1, //移动对象的层级数
      validateTable: [] //验证表格的数据集合
    };
  },
  computed: {
    parameterDataTable() {
      return this.tableData;
    }
  },
  watch: {
    parameterDataTable: {
      // eslint-disable-next-line
      handler(newVal, oldVal) {
        this.tableData = newVal;
      },
      deep: true
    }
  },
  created() {
    this.loading = true;
    this.getParamTypeList();
    this.treeDrop();
  },
  beforeDestroy() {
    if (this.sortable2) {
      this.sortable2.destroy();
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.loading=false
      this.getValidateTable()
      this.setParameterTableHeight(this.validateTable.length)
      this.refreshDataInfo()
    })
  },
  methods: {
    changeFieldName(evnt,row){
      row.realFieldName = evnt.target.value
    },
    changeRequired(event,row){
       row.required = event;
    },
    //获取参数类型列表
    getParamTypeList() {
      this.paramTypeList =  [
            {
                "code": 0,
                "name": "string",
                "value": "string",
                "description": "string"
            },
            {
                "code": 1,
                "name": "number",
                "value": "number",
                "description": "number"
            },
            {
                "code": 2,
                "name": "boolean",
                "value": "boolean",
                "description": "boolean"
            },
            {
                "code": 3,
                "name": "object",
                "value": "object",
                "description": "object"
            },
            {
                "code": 4,
                "name": "array",
                "value": "array",
                "description": "array"
            }
        ]
    },
    /**
     * 获取显示的label名称
     */
    getSelectLabel(value, list) {
      const findItem = list.find(element => element.code === value);
      return findItem ? findItem.name : null;
    },
    /**
     * 设置树节点输入框宽度样式
     */
    setTreeColumnInputStyle(level) {
      let returnStyle = "width: calc(100% - 30px);";
      switch (level) {
        case 1:
          returnStyle = "width: calc(100% - 30px);";
          break;
        case 2:
          returnStyle = "width: calc(100% - 40px);";
          break;
        case 3:
          returnStyle = "width: calc(100% - 50px);";
          break;
        case 4:
          returnStyle = "width: calc(100% - 70px);";
          break;
        case 5:
          returnStyle = "width: calc(100% - 90px);";
          break;
      }
      return returnStyle;
    },
    /**
     * 删除行
     */
    deleteRow(row) {
      const delRowId = row._XID;
      //this.$refs.refParamterTable.remove(row);
      let bDel = false;
      for (let i = 0; i < this.parameterDataTable.length; i++) {
        if (bDel) {
          break;
        }
        if (delRowId === this.parameterDataTable[i]._XID) {
          this.parameterDataTable.splice(i, 1);
          bDel = true;
          break;
        } else {
          if (
            this.parameterDataTable[i].children &&
            this.parameterDataTable[i].children.length > 0
          ) {
            if (bDel) {
              break;
            }
            bDel = this.deleteRowChild(
              this.parameterDataTable[i].children,
              delRowId
            );
          }
        }
      }
      this.$refs.refParamterTable.refreshData();
      this.getValidateTable()
      this.setParameterTableHeight(this.validateTable.length)
    },
    /**
     * 删除子节点内容信息
     */
    deleteRowChild(data, delRowXID) {
      for (let i = 0; i < data.length; i++) {
        if (data[i]._XID === delRowXID) {
          data.splice(i, 1);
          return true;
        } else {
          if (data[i].children && data[i].children.length > 0) {
            this.deleteRowChild(data[i].children, delRowXID);
          }
        }
      }
    },
    /**
     * 判断层级信息(判断当前对象拥有的子节点对应的层级数)
     */
    judgeRowLevel(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length > 0) {
          this.judgeRowLevel(data[i].children);
        } else {
          if (data[i].level > this.existenceLevel) {
            this.existenceLevel = data[i].level;
          }
        }
      }
    },
    /**
     * 判断移动对象的层级数(有几层对象)
     */
    judgeMoveObjectLevel(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length > 0) {
          this.moveLevel = this.moveLevel + 1;
          this.judgeMoveObjectLevel(data[i].children);
        }
      }
    },
    /**
     * 新增子项
     */
    addRowChild(row) {
      this.getValidateTable();
      this.$refs.refParamterTable.validate(this.validateTable, valid => {
        if (valid) {
          this.existenceLevel = 1;
          let bAdd = true;
          if (!row.children) {
            row.children = [];
          } else {
            this.judgeRowLevel(row.children);
            if (this.existenceLevel === 5) {
              if (row.level < 5) {
                bAdd = true;
              } else {
                bAdd = false;
              }
            }
          }
          if (bAdd) {
            row.children.unshift({
              level: row.level + 1,
              realFieldName: "",
              paramFieldName: "",
              required: false,
              paramType: "",
              remark: ""
            });
            this.$refs.refParamterTable.setTreeExpansion(row, true);
            this.$refs.refParamterTable.refreshData().then(() => {
              this.$refs.refParamterTable.setActiveCell(
                row.children[0],
                "realFieldName"
              );
            });
            this.setParameterTableHeight(this.validateTable.length+1)
          } else {
            this.$Message.error("此节点已有5级，不能进行新增层级操作！");
          }
        }
      });
    },
    /**
     * 新增行数据以及选中第一个输入框
     */
    addRowDataAndActive() {
      this.parameterDataTable.unshift({
        level: 1,
        realFieldName: "",
        paramFieldName: "",
        required: false,
        paramType: "",
        remark: ""
      });
      this.$refs.refParamterTable.setActiveCell(
        this.parameterDataTable[0],
        "realFieldName"
      );
      this.setParameterTableHeight(this.validateTable.length+1)
    },
    /**
     * 递归获取子节点的验证表格数据集合
     */
    getValidateTableChild(data) {
      for (let i = 0; i < data.length; i++) {
        this.validateTable.push(data[i]);
        if (data[i].children && data[i].children.length > 0) {
          this.getValidateTableChild(data[i].children);
        }
      }
    },
    /**
     * 获取验证表格数据集合
     */
    getValidateTable() {
      this.validateTable=[]
      for (let i = 0; i < this.parameterDataTable.length; i++) {
        this.validateTable.push(this.parameterDataTable[i]);
        if (
          this.parameterDataTable[i].children &&
          this.parameterDataTable[i].children.length > 0
        ) {
          this.getValidateTableChild(this.parameterDataTable[i].children);
        }
      }
    },
    /**
     * 新增一行(默认增加到最上方)
     */
    addRow() {
      if (this.parameterDataTable.length > 0) {
        this.getValidateTable();
        this.$refs.refParamterTable.validate(this.validateTable, valid => {
          if (valid) {
            this.addRowDataAndActive();
          }
        });
      } else {
        this.addRowDataAndActive();
      }
    },
    //设置参数表格高度
    setParameterTableHeight(rowLength){
      let tableHeight = 268;
      if (rowLength > 0) {
        if(rowLength === 1){
          tableHeight = 150
        } else if (rowLength < 5) {
          tableHeight = (rowLength + 1) * 42 + 76;
        } else {
          tableHeight = rowLength * 42 + 76;
        }
      }
      this.parameterTableHeight= tableHeight;
    },
    /**
     * 拖动
     */
    treeDrop() {
      this.$nextTick(() => {
        const that = this;
        const xTable = that.$refs.refParamterTable;
        that.sortable2 = Sortable.create(
          xTable.$el.querySelector(".body--wrapper>.vxe-table--body tbody"),
          {
            handle: ".drag-btn",
            onEnd: ({ item, oldIndex }) => {
              const options = { children: "children" };
              const targetTrElem = item;
              const wrapperElem = targetTrElem.parentNode;
              const prevTrElem = targetTrElem.previousElementSibling;
              const selfRow = xTable.getRowNode(targetTrElem).item;
              const selfNode = XEUtils.findTree(
                that.parameterDataTable,
                row => row === selfRow,
                options
              );
              if (prevTrElem) {
                // 移动到节点
                const prevRow = xTable.getRowNode(prevTrElem).item;
                const prevNode = XEUtils.findTree(
                  that.parameterDataTable,
                  row => row === prevRow,
                  options
                );
                if (
                  XEUtils.findTree(
                    selfRow[options.children],
                    row => prevRow === row,
                    options
                  )
                ) {
                  // 错误的移动
                  const oldTrElem = wrapperElem.children[oldIndex];
                  wrapperElem.insertBefore(targetTrElem, oldTrElem);
                  return that.$XModal.message({
                    message: "不允许父节点拖动至子节点！",
                    status: "error"
                  });
                }
                const currRow = selfNode
                  ? selfNode.items.splice(selfNode.index, 1)[0]
                  : null;
                if (xTable.hasTreeExpand(prevRow)) {
                  that.moveLevel = 1;
                  const arrCurrentRow = [];
                  arrCurrentRow.push(currRow);
                  that.judgeMoveObjectLevel(arrCurrentRow);
                  const arrPrevRow = [];
                  arrPrevRow.push(prevNode.item);
                  that.judgeRowLevel(arrPrevRow);
                  const level = that.existenceLevel - 1 + that.moveLevel;
                  if (level > 5) {
                    selfNode.items.splice(selfNode.index, 0, currRow);
                    xTable.refreshData().then(() => that.refreshDataInfo());
                    return that.$XModal.message({
                      message: "移动后节点层级超过5级！",
                      status: "error"
                    });
                  } else {
                    // 移动到当前的子节点
                    prevRow[options.children].splice(0, 0, currRow);
                  }
                } else {
                  // 移动到相邻节点
                  prevNode.items.splice(
                    prevNode.index + (selfNode.index < prevNode.index ? 0 : 1),
                    0,
                    currRow
                  );
                }
              } else {
                // 移动到第一行
                const currRow = selfNode
                  ? selfNode.items.splice(selfNode.index, 1)[0]
                  : null;
                that.parameterDataTable.unshift(currRow);
              }
              // 如果变动了树层级，需要刷新数据
              xTable.refreshData().then(() => {
                that.refreshDataInfo();
              });
            }
          }
        );
      });
    },
    /**
     * 设置刷新数据集合的层级信息
     */
    setRefreshDataLevel(data, parentLevel) {
      for (let i = 0; i < data.length; i++) {
        data[i].level = parentLevel + 1;
        if (data[i].children && data[i].children.length > 0) {
          this.setRefreshDataLevel(data[i].children, data[i].level);
        }
      }
    },
    /**
     * 刷新数据集合数据信息
     */
    refreshDataInfo() {
      for (let i = 0; i < this.parameterDataTable.length; i++) {
        this.parameterDataTable[i].level = 1;
        if (
          this.parameterDataTable[i].children &&
          this.parameterDataTable[i].children.length > 0
        ) {
          this.setRefreshDataLevel(this.parameterDataTable[i].children, 1);
        }
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.vxe-table-iview {
  .dragImg {
    width: 20px;
    height: 20px;
  }
  &::v-deep .vxe-table--body-wrapper,
  .vxe-table--fixed-left-body-wrapper,
  .vxe-table--fixed-right-body-wrapper {
    overflow-y: auto;
    overflow-x: hidden;
  }
  &::v-deep .vxe-table .vxe-table--empty-block{
    min-height: 227px;
  }
  &::v-deep .drag-btn {
    cursor: move;
    font-size: 12px;
  }
  &::v-deep .vxe-body--row.sortable-ghost,
  .vxe-body--row.sortable-chosen {
    background-color: #dfecfb;
  }
  &::v-deep .vxe-table.t--border .vxe-header--column {
    border-right: none;
  }
}
</style>