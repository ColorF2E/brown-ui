<template>
    <div>
        <demo-block title="基础筛选">
            <i-table :data="tableData1" style="width:100%">
                <i-table-column prop="date" :label="items.date.label" v-if="items.date.checked"></i-table-column>
                <i-table-column prop="name" :label="items.name.label" v-if="items.name.checked"></i-table-column>
                <i-table-column prop="age" :label="items.age.label" v-if="items.age.checked"></i-table-column>
                <i-table-column prop="tag" :label="items.tag.label" v-if="items.tag.checked"></i-table-column>
                <i-table-column
                    prop="address"
                    :label="items.address.label"
                    v-if="items.address.checked"
                    show-tooltip-when-overflow
                ></i-table-column>
            </i-table>
            <i-field-filter class="fieldStyle" v-model="items"></i-field-filter>
        </demo-block>
    </div>
</template>
<script>
import data from "../data/tableData";
import columnConfig from "../data/fieldfilter.config";

export default {
    data() {
        return {
            tableData1: data.data1,
            items: columnConfig
        };
    }
};
</script>
<style lang="scss" scoped>
.fieldStyle {
    float: right;
    margin-top: 10px;
}
</style>