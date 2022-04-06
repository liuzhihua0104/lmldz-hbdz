 <template>
  <div>
    <el-form :inline="true" :model="filter" size="small">
      <el-form-item style="margin-right:0" label="关键字:" prop="region">
        <el-input v-model="filter.name" placeholder="奖品周期方案" :clearable="true"></el-input>
      </el-form-item>
      <el-form-item style="margin-right:0" label="应用状态:" prop="region">
        <el-select v-model="filter.status" placeholder="请选择应用状态">
          <el-option label="全选" value=""></el-option>
          <el-option label="已应用" value="1"></el-option>
          <el-option label="未应用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="onAdd()">创建周期方案</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" class="table-wrap" border align="center">
      <el-table-column label="奖品周期方案名称" prop="name"></el-table-column>
      <el-table-column label="奖品周期关联数量">
        <template slot-scope="scope">
          <span v-if="scope.row.prizeCount<=0" type="text" size="small">{{scope.row.prizeCount||0}}</span>
          <el-button v-else type="text" size="small" @click="showApplicationList(scope.row)">{{scope.row.prizeCount}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="条件开关">
        <template slot-scope="scope">
          {{scope.row.status==0? "关闭":""}}
          {{scope.row.status==1? "开启":""}}
        </template>
      </el-table-column>
      <el-table-column label="时间周期开关">
        <template slot-scope="scope">
          {{scope.row.status==0? "关闭":""}}
          {{scope.row.status==1? "开启":""}}
        </template>
      </el-table-column>

      <el-table-column label="应用状态">
        <template slot-scope="scope">
          {{scope.row.status==0? "未应用":""}}
          {{scope.row.status==1? "已应用":""}}
        </template>
      </el-table-column>

      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="lookFn(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="onEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="onDel(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="showApplyList(scope.row)">关联奖品</el-button>
          <el-button type="text" size="small" @click="copyPlan(scope.row)">复制</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :destroy-on-close="true" class="tac" background layout="prev, pager, next" :total="page.total" :current-page.sync="filter.pageNum" :page-size.sync="filter.pageSize" @current-change="fetchList">
    </el-pagination>

    <!-- 奖品周期方案详情弹框 -->
    <el-dialog title="奖品周期方案详情" class="dialogWidth" :visible.sync="prizeCycleListDetailsVisible" center>
      <template v-if="prizeCycleListDetailsVisible">
        <prize-cycle-list-details :formprops="formprops">
        </prize-cycle-list-details>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="prizeCycleListDetailsVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 奖品列表弹框 -->
    <el-dialog title="奖品列表" :visible.sync="prizeVisible" center class="dialogWidth">
      <div style="margin-bottom: 20px">奖品周期方案名称: {{rows.name}}</div>
      <el-form ref="prizeForm" size="default" :inline="true" :model="prizeForm" class="demo-form-inline">
        <el-row>
          <el-col :span="7">
            <el-form-item style="margin-right:0" label="关键字:" prop="prizeName">
              <el-input style="width:100%" v-model="prizeForm.prizeName" placeholder="请输入内容" :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item style="margin-right:0" label="" prop="region">
              <el-select v-model="prizeForm.type">
                <el-option label="奖品名称" value="prizeName"></el-option>
                <el-option label="策略名称" value="strategyName"></el-option>
                <el-option label="素材源名称" value="sourceName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-form-item>
              <el-button type="default" @click="searchPrize">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="prizeList" class="table-wrap" :border="true" size="mini" height="300">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="奖品ID" prop="prizeId" width="300px"></el-table-column>
        <el-table-column label="奖品名称" prop="prizeName"></el-table-column>
        <el-table-column label="策略名称" prop="strategyName"></el-table-column>
        <el-table-column label="素材源名称" prop="sourceName"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="default" @click="prizeVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 关联奖品弹框 ------------------------------------------------------------------>
    <el-dialog title="奖品列表" class="dialogWidth" :visible.sync="applyVisible" center customClass="customWidth">
      <div style="margin-bottom: 20px;display: flex; justify-content: space-between;align-items: center;">
        <div> 奖品周期方案名称: <span style="font-weight:bold">{{rows.name}}</span></div>
      </div>
      <el-form ref="applyForm" size="default" :inline="true" :model="applyForm" class="demo-form-inline">
        <el-row>
          <el-col :span="7">
            <el-form-item style="margin-right:0" label="关键字:" prop="prizeName">
              <el-input v-model="applyForm.prizeName" placeholder="请输入内容" :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item style="margin-right:0" label="" prop="region">
              <el-select v-model="applyForm.type">
                <el-option label="奖品名称" value="prizeName"></el-option>
                <el-option label="策略名称" value="strategyName"></el-option>
                <el-option label="素材源名称" value="sourceName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-form-item>
              <el-button type="default" @click="searchApply">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="applyList" class="table-wrap" :border="true" size="mini" height="300px" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="开关" width="100">
          <template slot-scope="scope">
            <el-switch v-show="Object.keys(scope.row).includes('status')" inactive-color="#cccccc" @change="null" :value="scope.row.status==1?true:false" :width="50">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="奖品ID" prop="prizeId" width="300px"></el-table-column>
        <el-table-column label="奖品名称" prop="prizeName"></el-table-column>
        <el-table-column label="策略名称" prop="strategyName"></el-table-column>
        <el-table-column label="素材源名称" prop="sourceName"></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button style="margin-right:20px" type="primary" @click="releaseFn">确 定</el-button>
        <el-button @click="applyVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 复制奖品方案弹框 ---------------------------------------------------------->
    <el-dialog title="复制执行方案" :width="'1000px'" :visible.sync="copyPlanVisible" center customClass="customWidth">
      <el-form ref="copyForm" :inline="true" :model="copyForm" class="demo-form-inline">

        <el-form-item style="margin-right:0" label="奖品周期方案名称:" prop="name" :rules="[
            { required: true, message: '新奖品周期方案名称不能为空'}
          ]">
          <el-input v-model="copyForm.name" placeholder="新奖品周期方案名称" :clearable="true"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button style="margin-right:20px" @click="copyPlanVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCopyForm('copyForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script>

module.exports = {
  data() {
    return {
      filter: {
        name: '',
        status: '', //应用状态
        pageNum: 1,
        pageSize: 10,
      },
      page: {
        total: 0,
      },
      tableData: [{ id: 1, prizeCount: 10 }], // 周期方案列表
      rows: {}, // 当前数据
      // 奖品列表查看弹框
      prizeForm: {
        prizeName: "",
        type: ""
      },
      prizeList: [],// 奖品列表
      prizeVisible: false, // 控制奖品列表弹框弹框的展示与隐藏
      // 关联奖品
      applyForm: {
        prizeName: "",
        type: "prizeName"
      },
      applyList: [],// 关联奖品奖品列表
      applyVisible: false,// 控制关联奖品弹框的展示与隐藏
      prizeCycleListDetailsVisible: false, // 奖品实际应用方案弹框的显示与隐藏
      multipleSelection: [], //关联奖品中触发多选

      //  周期表单传参
      formprops: {
        isLook: true, //是否是查看
        isShowTitle: false, //是否显示title
        isDialog: false //是否是弹框形式展示
      },

      // 复制功能，本期未开放，保留
      copyPlanVisible: false, //复制执行方案的弹框
      copyForm: {
        name: ""
      }
    }
  },
  watch: {
  },
  methods: {
    //搜索执行方案列表
    onSearch() {
      this.filter.pageNum = 1
      this.filter.pageSize = 10
      this.fetchList()
    },

    // 获取列表
    fetchList() {
      service({
        url: '/prize/orientation/list',
        method: 'post',
        data: this.filter,
      }).then(({ data }) => {
        this.tableData = data.list
        this.page.total = data.total
      })
    },

    // 奖品列表
    getPrizeList() {
      let params = {
        orientationId: this.rows.id,
        sourceId: "",
        prizeName: this.prizeForm.prizeName,
        type: this.prizeForm.type
      }
      service({
        url: '/prize/orientation/pList',
        method: 'post',
        data: params,
      }).then(({ data }) => {
        this.prizeList = data.list
      })
    },

    // 奖品列表-点击列表数字，弹出“奖品列表弹框
    showApplicationList(rows) {
      this.rows = rows;
      this.prizeList = [];
      this.prizeVisible = true;
      this.prizeForm.prizeName = "";
      this.getPrizeList()
    },

    // 奖品列表-搜索奖品列表
    searchPrize() {
      this.getPrizeList(this.rows)
    },

    // 应用列表
    getApplyList() {
      let params = {
        orientationId: this.rows.id,
        sourceId: "",
        prizeName: this.applyForm.prizeName
      }
      service({
        url: '/prize/orientation/pList',
        method: 'post',
        data: params,
      }).then(({ data }) => {
        this.applyList = data.list
      })
    },

    // 应用列表-点击列表数字，弹出“应用列表弹框
    showApplyList(rows) {
      this.rows = rows;
      this.applyList = [];
      this.applyVisible = true;
      this.applyForm.prizeName = "";
      this.getApplyList()
    },

    // 应用列表-搜索应用列表
    searchApply() {
      this.getApplyList(this.rows)
    },

    // 关联奖品弹框-触发多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 关联奖品弹框-点击发布
    releaseFn() {
      if (!this.multipleSelection.length) {
        this.$message({
          message: '请先勾选数据',
          type: 'warning'
        });
      }
    },

    // 查看
    lookFn(rows) {
      this.formprops.isLook = true; //是否查看
      this.formprops.isShowTitle = false // 是否展示title
      this.formprops.isDialog = true //是否是弹框形式展示
      sessionStorage.setItem("itemRow", JSON.stringify(rows));
      this.prizeCycleListDetailsVisible = true;
    },
    // 编辑
    onEdit(rows) {
      this.formprops.isLook = false; //是否查看
      this.formprops.isShowTitle = true // 是否展示title
      this.formprops.isDialog = false // 是不是弹框
      this.formprops.id=rows.id;
      sessionStorage.setItem("itemRow", JSON.stringify(rows));
      location.href = `./prizeCycleFormDetail.html?formprops=${JSON.stringify(this.formprops)}`
    },

    // 跳转到新增执行方案
    onAdd(rows) {
      location.href = `./prizeCycleFormDetail.html?islook=0&isshowtoptitle=1&type=page` 
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
        this.fetchList()
      }).catch((err) => {
        this.$message.error(err.msg);
      })
    },

    // 展示复制执行方案弹框
    copyPlan(row) {
      this.copyPlanVisible = true;
      this.rows = row;
    },

    // 保存复制
    submitCopyForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.fetchList()
  },
  mounted() {
    window.list = this;
  },
  components: {
    'prize-cycle-list-details': httpVueLoader('../components/prizeCycleListDetails.vue'), //奖品周期方案详情
  },
}
</script>
 
<style scope>
.expand__table {
  width: 100%;
}

.expand__table td {
  padding-left: 20px;
}

.el-table__expanded-cell {
  padding-right: 0 !important;
}

.pointer {
  cursor: pointer;
}

.tac {
  text-align: center;
}

.table-wrap {
  width: 100%;
  margin-bottom: 20px;
}

.form-item__pb0 {
  margin-bottom: 0 !important;
}

.el-button + .el-button {
  margin-left: 0;
}

.col-width-auto {
  width: auto;
}

.form-item__mb0 {
  margin-bottom: 0 !important;
}

/* 设置dialog宽度 */
.el-dialog {
  width: 600px !important;
}

.dialogWidth > .el-dialog {
  width: 1000px !important;
}
</style>