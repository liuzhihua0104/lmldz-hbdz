 <template>

  <el-form label-position="right" label-width="100px" :rules="formRules" ref="formData" :model="formData">
    <div class="title">
      信息</div>

    <!-- 定向名称 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="定向名称:" prop="user">
          <el-input :clearable="true" class="inputWidth" v-model="formData.user" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 备注 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="备注:" prop="remark">
          <el-input :clearable="true" class="inputWidth" type="textarea" :rows="4" v-model="formData.remark" placeholder="请输入内容">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <div class="title">
      配置信息</div>

    <!-- 区域 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="区域:" prop="radio1">
          <el-radio-group v-model="formData.radio1">
            <el-radio :label="1">不限制</el-radio>
            <el-radio :label="2">省市区</el-radio>
            <el-radio :label="3">城市线级</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 性别 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="性别:" prop="radio2">
          <el-radio-group v-model="formData.radio2">
            <el-radio :label="1">不限制</el-radio>
            <el-radio :label="2">男</el-radio>
            <el-radio :label="3">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 联网方式 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="联网方式:" prop="radio3">
          <el-radio-group v-model="formData.radio3">
            <el-radio :label="1">不限制</el-radio>
            <el-radio :label="2">WIFI</el-radio>
            <el-radio :label="3">运营商数据</el-radio>
            <el-radio :label="4">自定义</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 扫码工具 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="扫码工具:" prop="radio4">
          <el-radio-group v-model="formData.radio4">
            <el-radio :label="1">不限制</el-radio>
            <el-radio :label="2">微信</el-radio>
            <el-radio :label="3">支付宝

            </el-radio>
            <el-radio :label="4">其他</el-radio>
            <el-radio :label="5">自定义

            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 时段 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="时段:" prop="radio5">
          <el-radio-group v-model="formData.radio5">
            <el-radio :label="1">不限制</el-radio>
            <el-radio :label="2">时间段</el-radio>
            <el-radio :label="3">自定义</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 时段子项 -->
    <!-- <div class="time-slot" v-if="formData.radio5==2">

    </div> -->
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

    <!-- 节假日 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="节假日:" prop="radio6">
          <el-radio-group v-model="formData.radio6">
            <el-radio :label="1">不限制</el-radio>
            <el-radio :label="2">法定</el-radio>
            <el-radio :label="3">星期</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 设备平台 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="设备平台:" prop="radio7">
          <el-radio-group v-model="formData.radio7">
            <el-radio :label="1">不限制</el-radio>
            <el-radio :label="2">IOS</el-radio>
            <el-radio :label="3">Android</el-radio>
            <el-radio :label="4">HarmonyOS</el-radio>
            <el-radio :label="5">自定义</el-radio>
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
        radio5: 2,
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
  width: 600px;
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