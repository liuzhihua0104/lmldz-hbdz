<template>

  <div style="padding:20px">
    <a-tree-select tree-node-filter-prop="title" :allow-clear="true" v-model="value" style="width: 100%" :tree-data="treeData" tree-checkable :show-checked-strategy="SHOW_PARENT" search-placeholder="请选择" />

    <a-cascader v-model="cascValue" style="width: 100%" multiple max-tag-count="responsive" :options="options" placeholder="请选择"></a-cascader>
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


// ==========以下是级联
function cascJson(arr) {
  arr = arr.slice()
  function toParse(arr) {
    arr.forEach(function (item) {
      // item.key = item.value;
      // item.title = item.label;
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



module.exports = {
  data: function () {
    return {
      treeData: treeData,
      value: [11],
      SHOW_PARENT,


      // 以下是级联
      options: cascJson(areaOptions),
      cascValue: []

    }
  },
  mounted() {
    // console.log(this.treeData)
  }
}
</script>
 
<style>
</style>