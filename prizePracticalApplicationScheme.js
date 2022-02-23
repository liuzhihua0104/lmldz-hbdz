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



var Vm = new Vue({
  el: '#app',
  data() {
    return {
      centerDialogVisible: true,
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

      planListData: [{
        status: 1,
        date: '执行方案A001',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        status: 0,
        date: '执行方案A0011',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        status: 0,
        date: '执行方案A001111',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        status: 1,
        date: '执行方案A00101',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        status: 1,
        date: '执行方案A00108',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        status: 1,
        date: '执行方案A00106',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        status: 1,
        date: '执行方案A00107',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
      // 

    }
  },
  watch: {

  },
  methods: {
    // testFn() {
    //   console.log("触发function")
    //   this.formData.radio1 = 2
    // },
    // // 返回
    // onCancel() {
    //   window.history.go(-1)
    // },

    // 保存
    onConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验表单通过

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 执行方案列表-删除按钮
    onDel(rows) {
      this.rows = rows
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.getDel()
        })
        .catch(() => { })
    },
    // 执行方案-执行删除请求
    getDel() {
      console.log("发送删除请求")
      // service({
      //   url: '/user/strategy/inversion/delete.shtml',
      //   method: 'post',
      //   data: {
      //     id: this.rows.id,
      //   },
      // }).then(() => {
      //   this.fetchList()
      // })
    },

    // // 新增/编辑保存表单
    // getStrategyAddEdit() {
    //   service({
    //     url: '/user/strategy/inversion/create',
    //     method: 'post',
    //     data: this.formData,
    //   }).then(({ data }) => { })
    // },

    // // 编辑获取表单详情
    // getDetails() {
    //   service({
    //     url: '/user/strategy/inversion/detail',
    //     method: 'get',
    //     data: {
    //       id: this.formData.id,
    //     },
    //   }).then(({ data }) => {
    //     Object.keys(this.formData).forEach((key) => {
    //       console.log(key, data[key])
    //       this.formData[key] = data[key]
    //     })
    //   })
    // },
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
