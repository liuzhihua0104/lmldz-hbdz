 <template>

  <el-form label-position="right" label-width="100px" :rules="formRules" ref="formData" :model="formData">
    <div class="title">
      信息</div>

    <!-- 定向名称 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="定向名称:" prop="name">
          <el-input :clearable="true" class="inputWidth" v-model="formData.name" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 备注 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="备注:" prop="remarks">
          <el-input :clearable="true" class="inputWidth" type="textarea" :rows="4" v-model="formData.remarks" placeholder="请输入内容">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <div class="title">
      配置信息</div>

    <!-- 区域 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="区域:" prop="area_type">
          <el-radio-group v-model="formData.area_type">
            <el-radio :label="0">不限制</el-radio>
            <el-radio :label="1">省市区</el-radio>
            <el-radio :label="2">城市线级</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 性别 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="性别:" prop="sex">
          <el-radio-group v-model="formData.sex">
            <el-radio :label="0">不限制</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 联网方式 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="联网方式:" prop="networking">
          <el-radio-group v-model="formData.networking">
            <el-radio :label="0">不限制</el-radio>
            <el-radio :label="1">WIFI</el-radio>
            <!-- <el-radio :label="2">运营商数据</el-radio>
            <el-radio :label="4">自定义</el-radio> -->
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 扫码工具 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="扫码工具:" prop="scan_content">
          <el-radio-group v-model="formData.scan_content">
            <el-radio :label="0">不限制</el-radio>
            <el-radio :label="1">微信</el-radio>
            <el-radio :label="2">支付宝

            </el-radio>
            <!-- <el-radio :label="4">其他</el-radio>
            <el-radio :label="5">自定义

            </el-radio> -->
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 时段 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="时段:" prop="time_type">
          <el-radio-group v-model="formData.time_type">
            <el-radio :label="0">不限制</el-radio>
            <el-radio :label="1">时间段</el-radio>
            <el-radio :label="2">自定义</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 时段子项 -->
    <el-card class="box-card" v-if="formData.radio5==2">
      <div slot="header" class="clearfix" style="text-align:center">
        <span>时间段</span>
      </div>
      <el-form-item class="time-slot-card" style="margin-right:0" label="" prop="timeSlot">
        <el-checkbox-group v-model="formData.timeSlot">
          <el-checkbox v-for="item in timeSlotArray" :key="item.value" :value="item.value" :label="item.label"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-card>
    <!-- 时段子项 -->
    <el-card class="box-card timeList" v-if="formData.radio5==3" style="text-align:center">
      <div slot="header" class="clearfix">
        <span>自定义</span>
      </div>

      <el-table :data="rangeListData" class="table-wrap" :border="true" size="mini" :header-cell-style="{background:'#e5e9f2'}" height="250">
        <el-table-column align="center" width="100" label="序号" type="index"></el-table-column>

        <el-table-column align="center" label="时间段" prop="date">

        </el-table-column>
        <el-table-column align="center" label="时间范围"  width="250"> 
          <template slot-scope="scope">
            <div  style="display:flex;align-items:center">
              <el-time-select placeholder="起始时间" v-model="scope.row.startTime" :picker-options="{
      start: '00:00',
      step: '01:00',
      end: '23:00'
    }">
              </el-time-select>
              <span style="padding:0 10px">至</span>
              <el-time-select placeholder="结束时间" v-model="scope.row.endTime" :picker-options="{
     start: '00:00',
      step: '01:00',
      end: '23:00',
      minTime: scope.row.startTime
    }">
              </el-time-select>
            </div>

          </template>

        </el-table-column>
        <el-table-column align="center" label="操作" width="100px" style="display:flex">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delTimeRange(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top:20px" type="primary" size="mini" class="btn" @click="addTimeRange">新增</el-button>

    </el-card>

    <!-- 节假日 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="节假日:" prop="holidays">
          <el-radio-group v-model="formData.holidays">
            <el-radio :label="0">不限制</el-radio>
            <el-radio :label="1">法定</el-radio>
            <el-radio :label="2">星期</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 设备平台 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="设备平台:" prop="devices">
          <el-radio-group v-model="formData.devices">
            <el-radio :label="0">不限制</el-radio>
            <el-radio :label="1">IOS</el-radio>
            <el-radio :label="2">Android</el-radio>
            <el-radio :label="3">HarmonyOS</el-radio>
            <!-- <el-radio :label="5">自定义</el-radio> -->
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <div class="btns" v-if="type=='page'">
        <el-button class="back" @click="goBack">返回</el-button>
        <el-button type="primary" @click="saveFn('formData')">保存</el-button>
      </div>
    </el-form-item>
  </el-form>
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
      formData: {
        id: "",
        user: '123',
        remark: '',
        radio1: "",
        radio5: 3,
        timeSlot: ""
      },
      // 时间段选择
      timeSlotArray: [
        { label: "0点 ~ 3点", value: "0点 ~ 3点" },
        { label: "0点 ~ 6点", value: "0点 ~ 6点" },
        { label: "7点 ~9点", value: "7点 ~9点" },
        { label: "10点 ~12点", value: "10点 ~12点" },
        { label: "13点 ~15点", value: "13点 ~15点" },
        { label: "16点 ~ 18点", value: "16点 ~ 18点" },
        { label: "19点 ~21点", value: "19点 ~21点" },
        { label: "22点 ~24点", value: "22点 ~24点" },
      ],
      rangeListData: [
        {
          id: 1,
          startTime: "00:00",
          endTime: "01:00"
        }
      ], //时间段自定义列表数据
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

    // 返回
    goBack() {
      window.history.go(-1)
    },
    // 保存成功后返回其他页面
    saveFn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("校验通过")
          //   this.getStrategyAddEdit()
          this.goBack();
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增/编辑保存表单
    getStrategyAddEdit() {
      //   service({
      //     url: '/user/strategy/inversion/create',
      //     method: 'post',
      //     data: this.formData,
      //   }).then(({ data }) => { })
    },

    // 编辑获取表单详情
    getDetails() {
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
    },
    // 时间范围新增按钮
    addTimeRange() {
      console.log(123456)
    },
    delTimeRange(row) {
      console.log(row)
    }
  },
  created() {
    let query = getUrlQuery()
    console.log(query)
    if (query.id) {
      //   setTimeout(() => {
      //     this.formData.id = query.id;
      //   })

      this.getDetails()
    }
    // 获取项目列表
    // this.getProjectList()
  },
}
</script>
 
<style scope>
.title {
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 14px;
  background: #e5e9f2;
  border-radius: 4px;
  line-height: 30px;
  padding-left: 20px;
}

.el-card {
  width: 700px;
  margin-left: 100px;
  box-shadow: none !important;
}
.el-card__header {
  background: red;
  background: #f5f7fa;
}

/* 让时间段选择靠左 */
.time-slot-card > .el-form-item__content {
  margin-left: 0 !important;
}

/* 缩短时间段选择下方的间距 */
.time-slot-card > .el-form-item {
  margin-bottom: 0 !important;
}

/* 返回按钮 */
.btns {
  text-align: center;
}
.back {
  margin-right: 40px;
}

</style>