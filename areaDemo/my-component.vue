<template>

  <div style="padding:20px;width:1000px">
    <a-tree-select style="width:100%;max-height:100px;overflow-y:scroll;border:1px solid grey" dropdown-class-name="dropdownClassName" tree-node-filter-prop="title" :allow-clear="true" v-model="value" style="width: 100%" :tree-data="treeData" tree-checkable :show-checked-strategy="SHOW_PARENT" search-placeholder="请选择" />

  </div>
</template>
 
<script>

// 递归处理城市数据
function parseJson(arr) {
  arr = arr.slice()
  function toParse(arr) {
    arr.forEach(function (item) {
      item.key = item.value;
      item.title = item.label;
      if (item.children && item.children.length > 0 && Array.isArray(item.children)) {
        toParse(item["children"])
      } else {
        delete item.children
      }
    })
    return arr
  }
  return toParse(arr)
}

let TreeSelect = antd.TreeSelect
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

let treeData = parseJson(areaOptions)



module.exports = {
  data: function () {
    return {
      treeData: treeData,
      value: [11],
      SHOW_PARENT,

    }
  },
  mounted() {
    // console.log(this.treeData)
  }
}
</script>
 
<style>
.dropdownClassName {
  height: 200px;
  overflow-y: scroll;
}
</style>