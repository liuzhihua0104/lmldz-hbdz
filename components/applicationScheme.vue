 <template>
  <div class="out-dialog">
    <!-- 表单 -->
    <el-form label-position="right" label-width="100px" :rules="formRules" ref="prizeRows" :model="prizeRows" size="mini">
      <div class="title">信息</div>
      <!-- 主要信息-展示用 -->
      <el-row>
        <el-col :span="12">
          <el-form-item style="margin-right:0" label="奖品ID:" prop="id">
            <el-input disabled class="inputWidth" v-model="prizeRows.id" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item style="margin-right:0" label="策略名称:" prop="prizeName">
            <el-input disabled class="inputWidth" v-model="prizeRows.prizeName" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item style="margin-right:0" label="奖品名称:" prop="prizeName">
            <el-input disabled class="inputWidth" v-model="prizeRows.prizeName" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item style="margin-right:0" label="素材源名称:" prop="sourceName">
            <el-input disabled class="inputWidth" v-model="prizeRows.sourceName" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="title">实际应用方案</div>

      <el-button @click="showPlan" style="margin-bottom:10px" type="primary" plain size="small">添加方案</el-button>

      <!-- 执行方案列表表格 -->
      <el-table :data="pagePlanList" height="250" border style="width: 100%" size="mini" :header-cell-style="{background:'#e5e9f2'}">
        <el-table-column label="开关" width="100" align="center">
          <template slot-scope="scope">
            <el-switch inactive-color="#cccccc" @change="planChangeSwitch(scope.row)" :value="scope.row.status==1?true:false" :active-text="scope.row.status == 1 ? '开' : '关'" :width="50">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="执行方案名称">
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="lookFn(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="onEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="onDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--素材源定向表格-->
      <el-table :data="sourceDirectionalList" border style="width: 100%" size="mini" :header-cell-style="{background:'#e5e9f2'}" style="margin-bottom:20px">
        <el-table-column align="center" label="开关" width="100">
          <template slot-scope="scope">
            <el-switch inactive-color="#cccccc" @change="conditionChangeSwitch(scope.row)" :value="scope.row.status==1?true:false" :active-text="scope.row.status == 1 ? '开' : '关'" :width="50">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="素材源定向">
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="lookFn(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <!-- 执行方案列表弹框 -->
    <el-dialog :append-to-body="true" :width="'600px'" height="250" title="执行方案列表" :visible.sync="planDialogVisible" center customClass="customWidth">
      <!-- 表单 -->
      <el-form ref="planForm" size="mini" :inline="true" :model="planForm" class="demo-form-inline">
        <el-form-item style="margin-right:0" label="执行方案名称:" prop="name">
          <el-input v-model="planForm.name" placeholder="请输入执行方案名称" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="searchPlan('planForm')">搜索</el-button>
        </el-form-item>
      </el-form>

      <!-- 列表 -->
      <el-table max-height="300px" :data="dialogPlanList" class="table-wrap" :border="true" size="mini" :header-cell-style="{background:'#e5e9f2'}" @selection-change="handleSelectionChange">
        <el-table-column align="center" width="100" label="" type="selection"></el-table-column>
        <el-table-column align="center" width="100" label="序号" type="index"></el-table-column>
        <el-table-column align="center" label="定向名称" prop="name"></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="planDialogCancel">取 消</el-button>
        <el-button type="primary" @click="planDialogOk">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 查看奖品定向详情 -->
    <el-dialog title="方案详情" class="dialogWidth" :visible.sync="orientationDetailVisible" center>
      <template v-if="orientationDetailVisible">
        <orientation-details :type="orientationDetailProps.type" :islook="orientationDetailProps.islook" :id="rows.id" :id="rows.id" :isshowtoptitle="orientationDetailProps.isshowtoptitle">
        </orientation-details>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="orientationDetailVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>

</template>
 
<script>


module.exports = { 
  props: ["query"],
  components: {
    'orientation-details': httpVueLoader('./orientationDetails.vue')
  },
  data() {
    return {

      // 执行方案列表弹框搜索表单
      planForm: {
        name: ""
      },
      prizeRows: {}, //当前奖品数据
      planDialogVisible: false, //控制奖品方案弹框的显示
      dialogPlanList: [], //奖品列表弹框中的list数据
      multipleSelection: [], //多选执行方案弹框数据

      // 方案列表||条件列表当前激活的数据
      rowData: {}, //；列表当前行数据
      pagePlanList: [], //页面上的方案列表


      sourceDirectionalList: [],//资源定向列表
      orientationDetailVisible: false, //定向详情查看弹框
      // 定向详情传参
      orientationDetailProps: {
        type: "dialog",
        islook: 1, //是否查看
        isshowtoptitle: 0 //是否展示title
      },

      rows: {}, // 查看或者编辑当前数据


      // ===============

      formRules: {
        prizeName: [
          { required: false, message: '请输入定向名称', trigger: 'change' },
        ]
      },

      orientationDetailsType: "", //奖品定向详情的展示类型page||dialog
      orientationDetailsVisible: false, // 奖品定向详情弹框的显示与隐藏


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



    }
  },
  watch: {

  },
  methods: {
    // 点击添加方案:展示执行方案弹框
    showPlan() {
      this.dialogPlanList = []; // 清空列表
      this.multipleSelection = []; // 清空选中的

      this.planDialogVisible = true;
      this.planForm = {
        name: ""
      }
      console.log(this.planForm)

      // 方案获取列表
      // service({
      //   url: '/prize/orientation/listNoPage',
      //   method: 'post',
      //   data: this.planForm,
      // }).then(({ data }) => {

      let data = doPlanList.data;

      this.dialogPlanList = data.list
      // })
    },

    // 执行方案弹框中搜索方案
    searchPlan() {
      console.log(this.planForm)
      // 方案获取列表
      // service({
      //   url: '/prize/orientation/listNoPage',
      //   method: 'post',
      //   data: this.planForm,
      // }).then(({ data }) => {

      let data = doPlanList.data;
      this.dialogPlanList = data.list
      // })
    },


    // 执行方案列表弹框-触发多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 方案弹框点击取消
    planDialogCancel() {
      this.planDialogVisible = false;
    },

    // 方案弹框点击确定
    planDialogOk() {
      if (!this.multipleSelection.length) {
        return this.$message.error("请先选择方案");
      }

      let orientationIds = Array.from(new Set(this.multipleSelection.map(item => item.id)))

      let params = {
        prizeId: this.prizeRows.id,
        orientationIds: orientationIds
      }

      service({
        url: '/prize/orientation/updatePrizeAndOrientationMP',
        method: 'post',
        data: params,
      }).then(({ data }) => {

        this.$message.success("添加方案成功");
        this.getPagePlanList(); //获取页面上的方案列表
      })
    },

    // 获取页面上的方案列表
    getPagePlanList() {
      let params = {
        prizeId: this.prizeRows.id,
      }
      console.log(params)

      // 方案获取列表
      // service({
      //   url: '/prize/orientation/listNoPage',
      //   method: 'post',
      //   data: params,
      // }).then(({ data }) => {

      let data = doPlanList.data;

      this.pagePlanList = data.list
      // })
    },


    // 素材源定向列表
    getSourcePlanList() {
      let params = {
        sourceId: this.prizeRows.sourceId,
        pageNum: "",
        pageSize: "",
        sourceName: "",
      }

      // console.log(params)
      // service({
      //   url: '/prize/orientation/mList',
      //   method: 'post',
      //   data: params,
      // }).then(({ data }) => {

        data=sourceDirectionalList.data;
        this.sourceDirectionalList = data.list
      // })
    },


    // 查看
    lookFn(rows) {
      this.rows = rows;
      sessionStorage.setItem("rows", JSON.stringify(rows));
      this.orientationDetailVisible = true;
    },
    // 编辑
    onEdit(rows) {
      this.rows = rows;
      sessionStorage.setItem("rows", JSON.stringify(rows));
      location.href = `./prizeOrientationDetails.html?id=${rows.id}&islook=0&isshowtoptitle=1&type=page`
    },

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
    },

    // 删除
    getDel() {
      let params = {
        orientationId: this.rows.id,
      }
      service({
        url: '/prize/orientation/delOrientationMP',
        method: 'post',
        data: params
      }).then(() => {
        this.$message.success("删除成功");
        this.getPagePlanList()
      }).catch((err) => {
        this.$message.error(err.msg);
      })
    },

    // 方案切换状态
    planChangeSwitch(rows) {
      let params = {
        sourceId: "",
        status: rows.status == 1 ? 0 : 1, //目标状态
        prizeId: this.prizeRows.id, // 奖品ID
        orientationId: rows.id, //方案ID
      }
      service({
        url: 'prize/orientation/updateOrientationMPAndPrize',
        method: 'post',
        data: params
      }).then(() => {
        // 第二种方式，直接调取列表自动更新
        this.getPagePlanList();

      }).catch((err) => {
        this.$message.error(err.msg);
      })
    },

    // 返回
    goBack() {
      window.history.go(-1)
    },
  },
  mounted() {
    window.scheme = this;
  },
  created() {
    let prizeRows = sessionStorage.getItem("prizeRows")

    if (prizeRows) {
      this.prizeRows = JSON.parse(prizeRows);

      this.getPagePlanList(); //获取页面上的方案列表
      this.getSourcePlanList(); //获取页面上的素材源定向列表
    }

  },
}
</script>
 
<style scope>
.wrap {
  width: 100%;
  height: 100%;
}
.title {
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 14px;
  background: #e5e9f2;
  border-radius: 4px;
  line-height: 30px;
  padding-left: 20px;
}

/* switch */
.el-switch {
  position: relative;
  height: 24px;
  line-height: 24px;
}

.el-switch.is-checked .el-switch__core {
  background: #179bff;
}

.el-switch.is-checked .el-switch__core:after {
  margin-left: -23px;
}

.el-switch .el-switch__label,
.el-switch .el-switch__core {
  height: 24px;
}

.el-switch .el-switch__core {
  border-radius: 12px;
  border: none;
  background: #f1f1f1;
}

.el-switch .el-switch__core:after {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  width: 22px;
  height: 22px;
}

.el-switch .el-switch__label.is-active {
  color: #333;
}

.el-switch .el-switch__label--right {
  margin-left: -28px;
  position: absolute;
  right: 5px;
  top: -1px;
  color: #999;
}

.el-switch .el-switch__label--right.is-active {
  color: #fff;
  left: 10px;
}

.el-switch .el-switch__label--right > span {
  font-size: 12px;
}

/* table */
.el-table {
  margin-bottom: 20px;
}

/* dialog */
/* .el-dialog__body {
      padding-bottom: 0 !important;
    } */

/* 返回按钮 */
.btns {
  text-align: center;
}
.back {
  margin-right: 40px;
}
</style>