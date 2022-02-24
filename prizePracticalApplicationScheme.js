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
      applicationSchemeVisible: false, // 奖品实际应用方案弹框的显示与隐藏

      implementationSchemeVisible: false, // 执行方案弹框的显示与隐藏
      implementationSchemeListData: [{
        id: 1,
        status: 1,
        date: '执行方案A001',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        status: 0,
        date: '执行方案A0011',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 3,
        status: 0,
        date: '执行方案A001111',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 4,
        status: 1,
        date: '执行方案A00101',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 5,
        status: 1,
        date: '执行方案A00108',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 6,
        status: 1,
        date: '执行方案A00106',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 7,
        status: 1,
        date: '执行方案A00107',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }], //执行方案列表数据
      multipleSelection: [], //多选执行方案弹框数据
      // filter: {
      //   planName: '',
      //   startTime: '',
      //   endTime: '',
      //   pageNum: 1,
      //   pageSize: 10,
      // },
      // page: {
      //   total: 0,
      // },


      // 执行方案列表弹框搜索表单
      formInline: {
        user: '123',
        region: 'shanghai'
      },

      formData: {
        user: '123',
      },
      formRules: {
        user: [
          { required: false, message: '请输入定向名称', trigger: 'change' },
        ]
      },
      // 方案列表
      planListData: [{
        id: 1,
        status: 1,
        date: '执行方案A001',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        status: 0,
        date: '执行方案A0011',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 3,
        status: 0,
        date: '执行方案A001111',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 4,
        status: 1,
        date: '执行方案A00101',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 5,
        status: 1,
        date: '执行方案A00108',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 6,
        status: 1,
        date: '执行方案A00106',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 7,
        status: 1,
        date: '执行方案A00107',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],

      // 条件列表
      conditionListData: [{
        id: 1,
        status: 1,
        date: '条件A',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        status: 0,
        date: '条件A1',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 3,
        status: 0,
        date: '条件A111',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],

      // 方案列表||条件列表当前激活的数据
      rowData: {} //；列表当前行数据

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
    // 点击添加方案:展示执行方案弹框
    showPlan() {
      this.implementationSchemeVisible = true;
    },
    closeImplementationPlan() {
      this.implementationSchemeVisible = false;
      this.multipleSelection = [];//清空选中的数据
    },
    // 执行方案列表弹框-搜索
    planListSearch(formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.formInline)
          console.log(valid)
          // alert('submit!');
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    // 执行方案列表弹框-触发多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    // 执行方案列表弹框-应用
    releaseFn() { },

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
    // 执行方案-切换switch
    planChangeSwitch(row) {
      this.planListData.filter((item) => {
        if (item.id == row.id) {
          item.status = item.status == 1 ? 2 : 1
        }
      })
    },
    // 执行方案-查看
    planlook(row) {
      console.log("planlook")
    },
    // 执行方案-编辑
    planEdit(row) {
      console.log("执行方案-编辑")
    },
    // 执行方案列表-删除按钮
    planDel(row) {
      this.rowData = row
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.planGetDel()
        })
        .catch(() => { })
    },
    // 执行方案-执行删除请求
    planGetDel() {
      console.log("发送删除请求")
    },


    // 执行方案-切换switch
    conditionChangeSwitch(row) {
      this.conditionListData.filter((item) => {
        if (item.id == row.id) {
          item.status = item.status == 1 ? 2 : 1
        }
      })
    },
    // 条件列表-查看
    conditionlook(row) {
      console.log("planlook")
    },
    // 条件列表-编辑
    conditionEdit(row) {
      console.log("条件列表-编辑")
    },
    // 条件列表列表-删除按钮
    conditionDel(row) {
      this.rowData = row
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.conditionGetDel()
        })
        .catch(() => { })
    },
    // 条件列表-执行删除请求
    conditionGetDel() {
      console.log("发送删除请求")
    },


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
