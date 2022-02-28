 <template>
  

</template>
 
<script>

function getUrlQuery() {
  let search = location.search
  let obj = {}
  if (search) {
    let query = search.substring(1).split('&')
    query.forEach((queryItem) => {
      let keyValue = queryItem.split('=')
      let [key, value] = keyValue
      if (key) {
        obj[key] = value
      }
    })
  }
  return obj
}

module.exports = {
  props: {
    // type用来标记当前组件是当做dialog使用还是page使用
    type: {
      type: String,
      default: 'page'
    },
  },
  data() {
    return {

    }
  },
  watch: {

  },
  methods: {
  },
  created() {
    let query = getUrlQuery()
    if (query.id) {
      this.formData.id = query.id
      this.getDetails()
    }
    // 获取项目列表
    // this.getProjectList()
  },
}
</script>
 
<style scope>
</style>