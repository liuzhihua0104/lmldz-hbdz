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

  

   var Vm=new Vue({
    el: '#app',    
    data() {
      return {
        centerDialogVisible: false,
        formData: {
          user: '123',
          remark: '',
          radio1: 1
        },
        formRules: {
          user: [
            { required: true, message: '请输入定向名称', trigger: 'change' },
          ],
          radio1: [
            { required: true, message: '请选择', trigger: 'change' },
          ],

        },

      }
    },
    watch: {

    },
    methods: {
      testFn(){
        console.log("触发function")
        this.formData.radio1=2
      },
      // 返回
      onCancel() {
        window.history.go(-1)
      },
      onConfirm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getStrategyAddEdit()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 新增/编辑保存表单
      getStrategyAddEdit() {
        service({
          url: '/user/strategy/inversion/create',
          method: 'post',
          data: this.formData,
        }).then(({ data }) => { })
      },

      // 编辑获取表单详情
      getDetails() {
        service({
          url: '/user/strategy/inversion/detail',
          method: 'get',
          data: {
            id: this.formData.id,
          },
        }).then(({ data }) => {
          Object.keys(this.formData).forEach((key) => {
            console.log(key, data[key])
            this.formData[key] = data[key]
          })
        })
      },
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
  })



export default Vm
