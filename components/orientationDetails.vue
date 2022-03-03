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
    <!-- 
    <el-cascader v-model="requestId" filterable clearable @expand-change="handleItemChange" @change="selectApi($event,requestId)" :options="interfaceOptions" :props="props">
    </el-cascader> -->

    <div class="title">
      配置信息</div>

    <!-- 区域 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="区域:" prop="areaType">
          <el-radio-group v-model="formData.areaType">
            <el-radio label="0">不限制</el-radio>
            <el-radio label="1">省市区</el-radio>
            <el-radio label="2">城市线级</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="24" style="padding-left:100px" v-if="formData.areaType==1">

        <el-form-item style="margin-right:0" label="节假日:" prop="holidays">
          <el-radio-group v-model="formData.holidays">
            <el-radio label="0">不限制</el-radio>
            <el-radio label="legal">法定</el-radio>
            <el-radio label="week">星期</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="margin-right:0" label="" prop="areaData">
          <el-cascader style="width:700px" v-model="areaData" placeholder="请输入关键词" :options="options" :props="{ multiple: true }" filterable></el-cascader>

        </el-form-item>
      </el-col>

    </el-row>
    <!-- 性别 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="性别:" prop="sex">
          <el-radio-group v-model="formData.sex">
            <el-radio label="0">不限制</el-radio>
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 联网方式 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="联网方式:" prop="networking">
          <el-radio-group v-model="formData.networking">
            <el-radio label="0">不限制</el-radio>
            <el-radio label="1">wifi</el-radio>
            <el-radio label="custom">自定义</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>

      <el-col :span="24" v-if="formData.networking=='custom'">
        <el-checkbox style="margin:0 0 15px 100px" :indeterminate="networkingCustomData.isIndeterminate" v-model="networkingCustomData.checkAll" @change="commonChangeCheckAll($event,'networkingCustomData')">全选</el-checkbox>
        <el-form-item style="margin-right:0" label="">
          <el-checkbox-group @change="commonSelectOption($event,'networkingCustomData')" class="time-slot" v-model="networkingCustomData.values">
            <el-checkbox v-for="item in networkingCustomData.options" :key="item.label" :label="item.label">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 扫码工具 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="扫码工具:" prop="scanContent">
          <el-radio-group v-model="formData.scanContent">
            <el-radio label="0">不限制</el-radio>
            <el-radio label="1">微信</el-radio>
            <el-radio label="2">支付宝</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>

    </el-row>
    <!-- 时段 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="时段:" prop="timeType">
          <el-radio-group v-model="formData.timeType">
            <el-radio label="0">不限制</el-radio>
            <el-radio label="1">时间段</el-radio>
            <el-radio label="2">自定义</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="24" v-if="formData.timeType=='1'">
        <el-checkbox style="margin:0 0 15px 100px" :indeterminate="timeType1Data.isIndeterminate" v-model="timeType1Data.checkAll" @change="commonChangeCheckAll($event,'timeType1Data')">全选</el-checkbox>
        <el-form-item style="margin-right:0" label="">
          <el-checkbox-group @change="commonSelectOption($event,'timeType1Data')" class="time-slot" v-model="timeType1Data.values">
            <el-checkbox v-for="item in timeType1Data.options" :key="item.label" :label="item.label">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
      <el-col :span="24" v-if="formData.timeType=='2'">
        <el-table :data="rangeListData" class="table-wrap time-list" :border="true" size="mini" :header-cell-style="{background:'#e5e9f2'}" height="250">
          <el-table-column align="center" width="80" label="序号" type="index"></el-table-column>
          <el-table-column align="center" label="时间段">
            <template slot-scope="scope">
              <el-slider @change="changeSlider(scope.row)" v-model="scope.row.sliderValue" range :max="24" :min="0" :step="1">
              </el-slider>
            </template>
          </el-table-column>
          <el-table-column align="center" label="时间范围" width="300">
            <template slot-scope="scope">
              <div style="display:flex;align-items:center">
                <el-time-select :clearable="false" @change="changeTime(scope.row,'startTime')" placeholder="起始时间" v-model="scope.row.startTime" :picker-options="{
      start: '00:00',
      step: '01:00',
      end: '23:00',
      maxTime:scope.row.endTime
    }">
                </el-time-select>
                <span style="padding:0 10px">至</span>
                <el-time-select :clearable="false" :disabled="!scope.row.startTime" @change="changeTime(scope.row,'endTime')" placeholder="结束时间" v-model="scope.row.endTime" :picker-options="{
     start: '00:00',
      step: '01:00',
      end: '24:00',
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

        <div style="width:800px;text-align:center;margin-left:80px">
          <el-button style="margin-top:20px" type="primary" size="mini" class="btn" @click="addTimeRange">新增</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 节假日 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="节假日:" prop="holidays">
          <el-radio-group v-model="formData.holidays">
            <el-radio label="0">不限制</el-radio>
            <el-radio label="legal">法定</el-radio>
            <el-radio label="week">星期</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>

      <el-col :span="24" v-if="formData.holidays=='legal'">
        <el-checkbox style="margin:0 0 15px 100px" :indeterminate="legalData.isIndeterminate" v-model="legalData.checkAll" @change="commonChangeCheckAll($event,'legalData')">全选</el-checkbox>
        <el-form-item style="margin-right:0" label="">
          <el-checkbox-group @change="commonSelectOption($event,'legalData')" v-model="legalData.values">
            <el-checkbox v-for="item in legalData.options" :key="item.label" :label="item.label">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>

      <el-col :span="24" v-if="formData.holidays=='week'">
        <el-checkbox style="margin:0 0 15px 100px" :indeterminate="weekData.isIndeterminate" v-model="weekData.checkAll" @change="commonChangeCheckAll($event,'weekData')">全选</el-checkbox>
        <el-form-item style="margin-right:0" label="">
          <el-checkbox-group @change="commonSelectOption($event,'weekData')" v-model="weekData.values">
            <el-checkbox v-for="item in weekData.options" :key="item.label" :label="item.label">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 设备平台 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="设备平台:" prop="devices">
          <el-radio-group v-model="formData.devices">
            <el-radio label="0">不限制</el-radio>
            <el-radio label="1">ios</el-radio>
            <el-radio label="2">Android</el-radio>
            <el-radio label="3">HarmonyOS</el-radio>
            <el-radio label="custom">自定义</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="24" v-if="formData.devices=='custom'">
        <el-checkbox style="margin:0 0 15px 100px" :indeterminate="devicesCustomData.isIndeterminate" v-model="devicesCustomData.checkAll" @change="commonChangeCheckAll($event,'devicesCustomData')">全选</el-checkbox>
        <el-form-item style="margin-right:0" label="">
          <el-checkbox-group @change="commonSelectOption($event,'devicesCustomData')" v-model="devicesCustomData.values">
            <el-checkbox v-for="item in devicesCustomData.options" :key="item.label" :label="item.label">{{item.name}}</el-checkbox>
          </el-checkbox-group>
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


let timeSlotOptions = [
  { name: "0点 ~ 3点", label: "0-3" },
  { name: "3点 ~ 6点", label: "3-6" },
  { name: "6点 ~8点", label: "6-8" },
  { name: "8点 ~10点", label: "8-10" },
  { name: "10点 ~12点", label: "10-12" },
  { name: "12点 ~ 14点", label: "12-14" },
  { name: "14点 ~16点", label: "14-16" },
  { name: "16点 ~18点", label: "16-18" },
  { name: "18点 ~20点", label: "18-20" },
  { name: "20点 ~22点", label: "20-22" },
  { name: "22点 ~24点", label: "22-24" },
]
let networkingOptions = [
  { name: "wifi", label: "1" },
  { name: "移动", label: "2" },
  { name: "联通", label: "3" },
  { name: "电信", label: "4" }
]

let legalOptions = [
  { name: "法定节假日", label: "1" },
  { name: "法定工作日", label: "2" }
]
let weekOptions = [
  { name: "星期一", label: "3" },
  { name: "星期二", label: "4" },
  { name: "星期三", label: "5" },
  { name: "星期四", label: "6" },
  { name: "星期五", label: "7" },
  { name: "星期六", label: "8" },
  { name: "星期日", label: "9" }
]
let devicesCustomOptions = [
  { name: "ios", label: "1" },
  { name: "Android", label: "2" },
  { name: "HarmonyOS", label: "3" }
]


let options = [{
  value: 'zhinan',
  label: '指南',
  children: [{
    value: 'shejiyuanze',
    label: '设计原则',
    children: [{
      value: 'yizhi',
      label: '一致'
    }, {
      value: 'fankui',
      label: '反馈'
    }, {
      value: 'xiaolv',
      label: '效率'
    }, {
      value: 'kekong',
      label: '可控'
    }]
  }, {
    value: 'daohang',
    label: '导航',
    children: [{
      value: 'cexiangdaohang',
      label: '侧向导航'
    }, {
      value: 'dingbudaohang',
      label: '顶部导航'
    }]
  }]
}, {
  value: 'zujian',
  label: '组件',
  children: [{
    value: 'basic',
    label: 'Basic',
    children: [{
      value: 'layout',
      label: 'Layout 布局'
    }, {
      value: 'color',
      label: 'Color 色彩'
    }, {
      value: 'typography',
      label: 'Typography 字体'
    }, {
      value: 'icon',
      label: 'Icon 图标'
    }, {
      value: 'button',
      label: 'Button 按钮'
    }]
  }, {
    value: 'form',
    label: 'Form',
    children: [{
      value: 'radio',
      label: 'Radio 单选框'
    }, {
      value: 'checkbox',
      label: 'Checkbox 多选框'
    }, {
      value: 'input',
      label: 'Input 输入框'
    }, {
      value: 'input-number',
      label: 'InputNumber 计数器'
    }, {
      value: 'select',
      label: 'Select 选择器'
    }, {
      value: 'cascader',
      label: 'Cascader 级联选择器'
    }, {
      value: 'switch',
      label: 'Switch 开关'
    }, {
      value: 'slider',
      label: 'Slider 滑块'
    }, {
      value: 'time-picker',
      label: 'TimePicker 时间选择器'
    }, {
      value: 'date-picker',
      label: 'DatePicker 日期选择器'
    }, {
      value: 'datetime-picker',
      label: 'DateTimePicker 日期时间选择器'
    }, {
      value: 'upload',
      label: 'Upload 上传'
    }, {
      value: 'rate',
      label: 'Rate 评分'
    }, {
      value: 'form',
      label: 'Form 表单'
    }]
  }, {
    value: 'data',
    label: 'Data',
    children: [{
      value: 'table',
      label: 'Table 表格'
    }, {
      value: 'tag',
      label: 'Tag 标签'
    }, {
      value: 'progress',
      label: 'Progress 进度条'
    }, {
      value: 'tree',
      label: 'Tree 树形控件'
    }, {
      value: 'pagination',
      label: 'Pagination 分页'
    }, {
      value: 'badge',
      label: 'Badge 标记'
    }]
  }, {
    value: 'notice',
    label: 'Notice',
    children: [{
      value: 'alert',
      label: 'Alert 警告'
    }, {
      value: 'loading',
      label: 'Loading 加载'
    }, {
      value: 'message',
      label: 'Message 消息提示'
    }, {
      value: 'message-box',
      label: 'MessageBox 弹框'
    }, {
      value: 'notification',
      label: 'Notification 通知'
    }]
  }, {
    value: 'navigation',
    label: 'Navigation',
    children: [{
      value: 'menu',
      label: 'NavMenu 导航菜单'
    }, {
      value: 'tabs',
      label: 'Tabs 标签页'
    }, {
      value: 'breadcrumb',
      label: 'Breadcrumb 面包屑'
    }, {
      value: 'dropdown',
      label: 'Dropdown 下拉菜单'
    }, {
      value: 'steps',
      label: 'Steps 步骤条'
    }]
  }, {
    value: 'others',
    label: 'Others',
    children: [{
      value: 'dialog',
      label: 'Dialog 对话框'
    }, {
      value: 'tooltip',
      label: 'Tooltip 文字提示'
    }, {
      value: 'popover',
      label: 'Popover 弹出框'
    }, {
      value: 'card',
      label: 'Card 卡片'
    }, {
      value: 'carousel',
      label: 'Carousel 走马灯'
    }, {
      value: 'collapse',
      label: 'Collapse 折叠面板'
    }]
  }]
}, {
  value: 'ziyuan',
  label: '资源',
  children: [{
    value: 'axure',
    label: 'Axure Components'
  }, {
    value: 'sketch',
    label: 'Sketch Templates'
  }, {
    value: 'jiaohu',
    label: '组件交互文档'
  }]
}]


module.exports = {
  props: {
    // type用来标记当前组件是当做dialog使用还是page使用
    type: {
      type: String,
      default: 'page'
    },
  },
  data() {
    let self = this  // 加上这一句就OK了

    return {
      formData: {

        id: "", // 
        name: "", // 方案名称
        pageNum: "", // 
        pageSize: "", // 
        createTime: "", // 
        createUser: "", // 

        remarks: "", // 备注
        areaType: "0", // '0不限制1省市区2线级',
        areaContent: "", // '区域内容'
        networking: "0", // 联网方式 0不限1wifi2移动3联调4电信
        scanContent: "0", // 扫码工具 0不限1微信2支付宝
        timeType: "0", // 时段 0不限1时间段2自定义
        holidays: "0", // 节假日0不限1节假日2工作日3周一4周二5周三6周四7周五8周六9周日
        devices: "0", // 设备0不限1ios2安卓3鸿蒙
        sex: "0", // 0不限1男2女
        status: "", // 状态：0关闭1开启 2删除
        sourceId: "", // 素材源id
        roles: "", // 状态 1商务2运营

        // 以下是前端自定义的
        networking_custom: [],
      },

      // 全选时间段数据
      timeType1Data: {
        options: timeSlotOptions,// 选项
        checkAll: false,// 是否全选
        isIndeterminate: false, //是否全选（只负责样式）
        values: [] //选中的结果
      },
      rangeListData: [], //时间段自定义列表数据

      // 联网方式自定义
      networkingCustomData: {
        options: networkingOptions,// 选项
        checkAll: false,// 是否全选
        isIndeterminate: false, //是否全选（只负责样式）
        values: [] //选中的结果
      },

      // 节假日：法定checkbox
      legalData: {
        options: legalOptions,// 选项
        checkAll: false,// 是否全选
        isIndeterminate: false, //是否全选（只负责样式）
        values: [] //选中的结果
      },
      // 节假日：星期checkbox
      weekData: {
        options: weekOptions,// 选项
        checkAll: false,// 是否全选
        isIndeterminate: false, //是否全选（只负责样式）
        values: [] //选中的结果
      },

      // 自定义设备平台checkbox
      devicesCustomData: {
        options: devicesCustomOptions,// 选项
        checkAll: false,// 是否全选
        isIndeterminate: false, //是否全选（只负责样式）
        values: [] //选中的结果
      },


      formRules: {
        user: [
          { required: true, message: '请输入定向名称', trigger: 'change' },
        ],
        radio1: [
          { required: true, message: '请选择', trigger: 'change' },
        ],

      },

      options: options,
      areaData: ["ziyuan"]



    }
  },
  watch: {

  },
  methods: {

    // 公共方法-切换全选
    commonChangeCheckAll(checkAll, keyName) {
      if (checkAll) {
        let values = [];
        this[keyName].options.map(item => {
          values.push(item.label)
        })
        this[keyName].values = values;
      } else {
        this[keyName].values = [];
      }
      this[keyName].isIndeterminate = false;
    },
    // 公共方法-切换单个选项
    commonSelectOption(value, keyName) {
      let checkedCount = value.length;
      this[keyName].checkAll = checkedCount === this[keyName].options.length;
      this[keyName].isIndeterminate = checkedCount > 0 && checkedCount < this[keyName].options.length;
    },

    // 返回
    goBack() {
      window.history.go(-1);
    },
    // 保存成功后返回其他页面
    saveFn(formName) {

      service({
        url: '/prize/orientation/create',
        method: 'post',
        data: {},
      }).then(({ data }) => { })

      // /prize/orientation/create
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     console.log("校验通过")
      //     //   this.getStrategyAddEdit()
      //     this.goBack();
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
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
      let needAdd = {
        id: this.rangeListData.length + 1,
        startTime: "",
        endTime: "",
        sliderValue: [0, 0]
      }
      this.rangeListData.push(needAdd);
    },

    // 删除
    delTimeRange(row) {
      let index = this.rangeListData.findIndex(item => item.id == row.id);
      this.rangeListData.splice(index, 1)
    },

    // 切换时间段-通过滑块
    changeSlider(row) {
      this.rangeListData.filter(item => {
        if (item.id == row.id) {
          item.startTime = dayjs().hour(row.sliderValue[0]).format('HH:00');
          item.endTime = dayjs().hour(row.sliderValue[1]).format('HH:00');

          if (item.endTime == "00:00") {
            item.endTime = "24:00"
          }
        }
      })
    },
    // 切换时间段-通过时间选择控件
    changeTime(row, name) {
      this.rangeListData.filter(item => {
        if (item.id == row.id) {
          let valueNum = parseInt(row[name].split()[0]);
          let sliderValue = [];
          name == "startTime" ? sliderValue = [valueNum, row.sliderValue[1]] : sliderValue = [row.sliderValue[0], valueNum]
          item.sliderValue = sliderValue;
        }
      })


    },

    // 获取执行方案列表
    getPlanList() {

    }

  },
  created() {




    let query = getUrlQuery()
    // console.log(query)
    if (query.id) {
      //   setTimeout(() => {
      //     this.formData.id = query.id;
      //   })

      this.getDetails()
    }
    // 获取项目列表
    this.getPlanList()
  }
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

/* 时间段限宽度 */
.time-slot {
  width: 800px;
}

.time-slot > .el-checkbox {
  width: 100px !important;
  margin: 0 20px 0 0;
}

/* 表格时间段 */
.time-list {
  width: 800px;
  margin-left: 80px;
}
</style>