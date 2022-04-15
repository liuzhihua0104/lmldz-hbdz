<template>

  <div style="padding:20px;width:1000px">
    <!-- field-names="{children:'children', title:'label', key:'value' }"     -->
    <a-tree-select

    replace-fields="{children:'children', label:'name', key:'code', value: 'code' }" 
      dropdown-class-name="dropdownClassName" tree-node-filter-prop="title" :allow-clear="true" v-model="value" style="width: 100%" :tree-data="treeData" tree-checkable :show-checked-strategy="SHOW_PARENT" search-placeholder="请选择" />

  </div>
</template>
 
<script>

let TreeSelect = antd.TreeSelect
const SHOW_PARENT = TreeSelect.SHOW_PARENT;


module.exports = {
  data: function () {
    return {
      treeData: areaOptions,
      value: [],
      SHOW_PARENT,

    }
  },
  mounted() {

  }
}
</script>
 
<style>
.dropdownClassName {
  height: 200px;
  overflow-y: scroll;
}
</style>