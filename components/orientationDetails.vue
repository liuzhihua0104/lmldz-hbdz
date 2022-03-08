 <template>
  <el-form label-position="right" label-width="100px" :rules="formRules" ref="formData" :model="formData">
    <div class="top-title" v-if="isShowTopTitle==1">奖品定向详情</div>
    <div class="title">
      信息</div>

    <!-- 定向名称 -->
    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="定向名称:" prop="name">
          <el-input :clearable="true" class="inputWidth" maxLength="30" v-model="formData.name" placeholder="请输入内容"></el-input>
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
        <el-form-item style="margin-right:0" label="区域:" prop="areaType">
          <el-radio-group v-model="formData.areaType" @change="changeAreaType">
            <el-radio label="0">不限制</el-radio>
            <el-radio label="1">省市区</el-radio>
            <el-radio label="2">城市线级</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="24" v-if="formData.areaType==1">
        <el-form-item style="margin-right:0" label="" prop="areaJson">
          <el-cascader :collapse-tags="true" class="area-cascader" :key="cascaderIdx" :clearable="true" ref="areaLevel" style="width:700px" @change="handleChange('areaLevel')" v-model="formData.areaJson" placeholder="请输入关键词" :options="areaOptions" :props="{ multiple: true }" filterable></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="24" v-if="formData.areaType==2">
        <el-form-item style="margin-right:0" label="" prop="areaJson">
          <el-cascader :collapse-tags="true" clearable ref="areaLevel" style="width:700px" @change="handleChange('areaLevel')" v-model="formData.areaJson" placeholder="请输入关键词" :options="lineOptions" :props="{ multiple: true }" filterable></el-cascader>
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
        <el-checkbox style="margin:0 0 15px 100px" :indeterminate="formData.networkingCustomData_isIndeterminate" v-model="formData.networkingCustomData_checkAll" @change="commonChangeCheckAll($event,'networkingCustomData')">全选</el-checkbox>
        <el-form-item style="margin-right:0" label="" prop="networkingCustomData_values">
          <el-checkbox-group @change="commonSelectOption($event,'networkingCustomData')" class="time-slot" v-model="formData.networkingCustomData_values">
            <el-checkbox v-for="item in formData.networkingCustomData_options" :key="item.label" :label="item.label">{{item.name}}</el-checkbox>
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
        <el-checkbox style="margin:0 0 15px 100px" :indeterminate="formData.timeType1Data_isIndeterminate" v-model="formData.timeType1Data_checkAll" @change="commonChangeCheckAll($event,'timeType1Data')">全选</el-checkbox>
        <el-form-item style="margin-right:0" label="" prop="timeType1Data_isIndeterminate">
          <el-checkbox-group @change="commonSelectOption($event,'timeType1Data')" class="time-slot" v-model="formData.timeType1Data_values">
            <el-checkbox v-for="item in formData.timeType1Data_options" :key="item.label" :label="item.label">{{item.name}}</el-checkbox>
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
        <el-checkbox style="margin:0 0 15px 100px" :indeterminate="formData.legalData_isIndeterminate" v-model="formData.legalData_checkAll" @change="commonChangeCheckAll($event,'legalData')">全选</el-checkbox>
        <el-form-item style="margin-right:0" label="" prop="legalData_values">
          <el-checkbox-group @change="commonSelectOption($event,'legalData')" v-model="formData.legalData_values">
            <el-checkbox v-for="item in formData.legalData_options" :key="item.label" :label="item.label">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>

      <el-col :span="24" v-if="formData.holidays=='week'">
        <el-checkbox style="margin:0 0 15px 100px" :indeterminate="formData.weekData_isIndeterminate" v-model="formData.weekData_checkAll" @change="commonChangeCheckAll($event,'weekData')">全选</el-checkbox>
        <el-form-item style="margin-right:0" label="" prop="weekData_values">
          <el-checkbox-group @change="commonSelectOption($event,'weekData')" v-model="formData.weekData_values">
            <el-checkbox v-for="item in formData.weekData_options" :key="item.label" :label="item.label">{{item.name}}</el-checkbox>
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
        <el-checkbox style="margin:0 0 15px 100px" :indeterminate="formData.devicesCustomData_isIndeterminate" v-model="formData.devicesCustomData_checkAll" @change="commonChangeCheckAll($event,'devicesCustomData')">全选</el-checkbox>
        <el-form-item style="margin-right:0" label="" prop="devicesCustomData_values">
          <el-checkbox-group @change="commonSelectOption($event,'devicesCustomData')" v-model="formData.devicesCustomData_values">
            <el-checkbox v-for="item in formData.devicesCustomData_options" :key="item.label" :label="item.label">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <div class="btns" v-if="isLook==0">
        <el-button class="back" @click="goBack">返回</el-button>
        <el-button type="primary" @click="saveFn('formData')">保存</el-button>
      </div>
    </el-form-item>

  </el-form>
</template>
 


<script>
// 处理地址栏参数
// function getUrlQuery() {
//   let search = location.search
//   let obj = {}
//   if (search) {
//     let query = search.substring(1).split('&')
//     query.forEach((queryItem) => {
//       let keyValue = queryItem.split('=')
//       let [key, value] = keyValue
//       if (key) {
//         obj[key] = value
//       }
//     })
//   }
//   return obj
// }

// 递归处理城市数据
function parseJson(arr) {
  arr = arr.slice()
  function toParse(arr) {
    // console.log(arr)
    arr.forEach(function (item) {
      item.value = item.code;
      item.label = item.name;


      if (item.children && item.children.length > 0 && Array.isArray(item.children)) {
        toParse(item["children"])
      } else {
        delete item.children
      }

      delete item.level
      delete item.pcode
      delete item.pname
      delete item.tier
      delete item.code
      delete item.name
    })
    return arr
  }
  return toParse(arr)
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
  { name: "星期一", label: "4" },
  { name: "星期二", label: "5" },
  { name: "星期三", label: "6" },
  { name: "星期四", label: "7" },
  { name: "星期五", label: "8" },
  { name: "星期六", label: "9" },
  { name: "星期日", label: "3" }
]
let devicesCustomOptions = [
  { name: "ios", label: "1" },
  { name: "Android", label: "2" },
  { name: "HarmonyOS", label: "3" }
]


module.exports = {
  props: ["type", "isLook", "id", "isShowTopTitle"],

  data() {
    let self = this  // 加上这一句就OK了
    return {
      formData: {

        id: "", // 
        name: "", // 方案名称  
        remarks: "", // 备注
        areaType: "0", // '0不限制1省市区2线级',
        areaContent: "", // '区域内容,库里存的'
        areaJson: [], // 回显省市区,是个二维数组
        networking: "0", // 联网方式 0不限1wifi2移动3联调4电信
        scanContent: "0", // 扫码工具 0不限1微信2支付宝
        timeType: "0", // 时段 0不限1时间段2自定义
        holidays: "0", // 节假日0不限1节假日2工作日3周一4周二5周三6周四7周五8周六9周日
        devices: "0", // 设备0不限1ios2安卓3鸿蒙
        sex: "0", // 0不限1男2女


        // 全选时间段数据
        timeType1Data_options: timeSlotOptions,// 选项
        timeType1Data_checkAll: false,// 是否全选
        timeType1Data_isIndeterminate: false, //是否全选（只负责样式）
        timeType1Data_values: [], //选中的结果
        // 联网方式自定义rose
        networkingCustomData_options: networkingOptions,// 选项
        networkingCustomData_checkAll: false,// 是否全选
        networkingCustomData_isIndeterminate: false, //是否全选（只负责样式）
        networkingCustomData_values: [], //选中的结果
        //  节假日：法定checkbox
        legalData_options: legalOptions,// 选项
        legalData_checkAll: false,// 是否全选
        legalData_isIndeterminate: false, //是否全选（只负责样式）
        legalData_values: [], //选中的结果
        //  节假日：星期checkbox
        weekData_options: weekOptions,// 选项
        weekData_checkAll: false,// 是否全选
        weekData_isIndeterminate: false, //是否全选（只负责样式）
        weekData_values: [], //选中的结果
        // 设备平台自定义
        devicesCustomData_options: devicesCustomOptions,// 选项
        devicesCustomData_checkAll: false,// 是否全选
        devicesCustomData_isIndeterminate: false, //是否全选（只负责样式）
        devicesCustomData_values: [], //选中的结果
      },



      rangeListData: [], //时间段自定义列表数据


      formRules: {
        name: [
          { required: true, message: '请输入定向名称', trigger: 'change' },
        ],
        remarks: [
          { required: true, message: '请输入备注', trigger: 'change' },
        ],
        areaType: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        areaJson: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        sex: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        networking: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        scanContent: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        timeType: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        holidays: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        devices: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        timeType1Data_values: [
          { required: true, message: '请选择时间段', trigger: 'change' },
        ],
        networkingCustomData_values: [
          { required: true, message: '请选择联网方式', trigger: 'change' },
        ],
        legalData_values: [
          { required: true, message: '请选择法定日', trigger: 'change' },
        ],
        weekData_values: [
          { required: true, message: '请选择星期', trigger: 'change' },
        ],
        devicesCustomData_values: [
          { required: true, message: '请选择设备', trigger: 'change' },
        ],

      },

      areaOptions: [], //省市县
      lineOptions: [], //线级城市级


      checkedNodeList: [], //子节点全选后，只留下父节点，后端需要的
      cascaderIdx: 0 //防止级联组件报错



    }
  },
  watch: {
    config: {
      handler() {
        this.cascaderIdx++
      },
      deep: true
    }
  },

  methods: {
    // 切换选中的省市区
    handleChange(value) {
      let checkedNodeList = this.$refs[value].getCheckedNodes();
      checkedNodeList = checkedNodeList.filter(item => !(item.parent && item.parent.checked)); // 核心
      // 后台只要父级别
      this.checkedNodeList = checkedNodeList
    },

    // 公共方法-切换全选
    commonChangeCheckAll(checkAll, keyName) {
      if (checkAll) {
        let values = [];
        this.formData[`${keyName}_options`].map(item => {
          values.push(item.label)
        })
        this.formData[`${keyName}_values`] = values;
      } else {
        this.formData[`${keyName}_values`] = [];
      }
      this.formData[`${keyName}_isIndeterminate`] = false;
    },
    // 公共方法-切换单个选项
    commonSelectOption(value, keyName) {
      let checkedCount = value.length;
      this.formData[`${keyName}_checkAll`] = checkedCount === this.formData[`${keyName}_options`].length;
      this.formData[`${keyName}_isIndeterminate`] = checkedCount > 0 && checkedCount < this.formData[`${keyName}_options`].length;
    },


    // 处理保存参数
    doSaveParams() {
      let paramsForm = {
        name: this.formData.name, // 方案名称
        remarks: this.formData.remarks, // 备注
        areaType: this.formData.areaType, // 区域
        sex: this.formData.sex, // 性别
        scanContent: this.formData.scanContent, // 扫码工具
        timeType: this.formData.timeType, // 时段
      }

      if (this.formData.id) {
        paramsForm.id = this.formData.id;
      }

      // 处理区域-省市区
      if (["1", "2"].includes(this.formData.areaType)) {
        paramsForm.areaJson = JSON.stringify(this.formData.areaJson);

        // 编辑的情况
        if (this.checkedNodeList.length) {
          let areaContentArr = [];
          this.checkedNodeList.map(item => {
            areaContentArr.push(item.data.value)
          })
          paramsForm.areaContent = areaContentArr.join();
        } else {
          // 编辑模式下未动选中的省市县
          paramsForm.areaContent = this.formData.areaContent
        }

      }

      // 处理联网方式  
      if (this.formData.networking == "custom") {
        paramsForm.networking = this.formData.networkingCustomData_values.join()
      } else {
        paramsForm.networking = this.formData.networking
      }


      // 处理时段
      if (this.formData.timeType == "1") {
        paramsForm.timeContent = this.formData.timeType1Data_values.join() // 时间段
      } else if (this.formData.timeType == "2") {
        let timeContent = [];
        this.rangeListData.map(item => {
          timeContent.push(`${item.sliderValue[0]}-${item.sliderValue[1]}`)
        })
        paramsForm.timeContent = timeContent.join()
      }


      // 处理节假日
      if (this.formData.holidays == "0") {
        paramsForm.holidays = this.formData.holidays // 不限制
      } else if (this.formData.holidays == "legal") {
        paramsForm.holidays = this.formData.legalData_values.join() // 法定
      } else if (this.formData.holidays == "week") {
        paramsForm.holidays = this.formData.weekData_values.join() // 星期
      }


      // 处理设备平台
      if (this.formData.devices == "custom") {
        paramsForm.devices = this.formData.devicesCustomData_values.join() // 自定义
      } else {
        paramsForm.devices = this.formData.devices;
      }

      sessionStorage.setItem("paramsForm", JSON.stringify(paramsForm))

      return paramsForm;

    },


    // 保存成功后返回其他页面
    saveFn(formName) {
      let self = this;
      console.log(self.doSaveParams())

      this.$refs[formName].validate((valid) => {
        if (valid) {
          service({
            url: '/prize/orientation/create',
            method: 'post',
            data: self.doSaveParams(),
          }).then(({ data }) => {
            self.goBack();
          })

        } else {
          return false
        }
      })
    },
    // 返回
    goBack() {
      if (this.type == "page") {
        window.history.go(-1);
      } else if (this.type == "dialog") {
        this.$emit("formSaveOk")
      }
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

      let data = JSON.parse(sessionStorage.getItem("paramsForm"));
      console.log(data)

      let form = {
        name: data.name, // 方案名称
        remarks: data.remarks, // 备注
        areaType: data.areaType, // 区域
        sex: data.sex, // 性别
        scanContent: data.scanContent, // 扫码工具
        timeType: data.timeType, // 时段
        areaJson: JSON.parse(data.areaJson), //回显省市县||限级    
        areaContent: data.areaContent, //区域内容,库里存的'
      }

      // 判断时段是否是自定义时间段||自定义
      if (data.timeType == 1) {
        let values = data.timeContent.split(",");
        form.timeType1Data_values = values;
        // 是否全选
        let optLength = this.formData.timeType1Data_options.length;
        form.timeType1Data_checkAll = values.length == optLength
        // 全选按钮样式
        form.timeType1Data_isIndeterminate = !(values.length == optLength);
      } else if (data.timeType == 2) {
        let values = data.timeContent.split(",");
        let rangeListData = [];
        values.map((item, index) => {
          let arr = item.split("-");
          let endTime = dayjs().hour(Number(arr[1])).format('HH:00');

          rangeListData.push({
            id: index + 1,
            sliderValue: [Number(arr[0]), Number(arr[1])],
            startTime: dayjs().hour(Number(arr[0])).format('HH:00'),
            endTime: endTime == "00:00" ? "24:00" : endTime,
          })
        })
        this.rangeListData = rangeListData; //自定义时间列表数据

      }


      // 判断联网方式     
      if (data.networking == 0) {
        form.networking = "0" //不限制
      } else if (data.networking == 1) {
        form.networking = "1" //wifi
      } else {
        form.networking = "custom" // 自定义
        let values = data.networking.split(",");
        form.networkingCustomData_values = values;
        // 是否全选
        let optLength = this.formData.networkingCustomData_options.length;
        form.networkingCustomData_checkAll = values.length == optLength
        // 全选按钮样式
        form.networkingCustomData_isIndeterminate = !(values.length == optLength)
      }

      // 判断节假日
      if (data.holidays == 0) {
        form.holidays = "0" //不限制
      } else if (_.intersection(["1", "2"], data.holidays.split(",")).length) {
        form.holidays = "legal";
        //法定
        let values = data.holidays.split(",");
        form.legalData_values = values;
        // 是否全选
        let optLength = this.formData.legalData_options.length;
        form.legalData_checkAll = values.length == optLength
        // 全选按钮样式
        form.legalData_isIndeterminate = !(values.length == optLength)


      } else if (_.intersection(["3", "4", "5", "6", "7", "8", "9"], data.holidays.split(",")).length) {
        form.holidays = "week";
        // form.weekData_values = data.holidays.split(""); //星期
        //法定
        let values = data.holidays.split(",");
        form.weekData_values = values;
        // 是否全选
        let optLength = this.formData.weekData_options.length;
        form.weekData_checkAll = values.length == optLength
        // 全选按钮样式
        form.weekData_isIndeterminate = !(values.length == optLength)
      }


      // 处理设备平台
      if (data.devices == 0) {
        form.devices = "0" //不限
      } else if (["1", "2", "3"].includes(data.devices)) {
        form.devices = data.devices;
      } else {
        form.devices = "custom" //自定义
        let values = data.devices.split(",");
        form.devicesCustomData_values = values;
        // 是否全选
        let optLength = this.formData.devicesCustomData_options.length;
        form.devicesCustomData_checkAll = values.length == optLength
        // 全选按钮样式
        form.devicesCustomData_isIndeterminate = !(values.length == optLength)

      }

      this.formData = { ...this.formData, ...form };

    },

    // 时间范围新增按钮
    addTimeRange() {
      let needAdd = {
        id: this.rangeListData.length + 1,
        startTime: "00:00",
        endTime: "24:00",
        sliderValue: [0, 24]
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

    // 获取区域信息
    getArea() {
      // service({
      //   url: '/prize/area/list',
      //   method: 'post',
      //   data: {
      //     level: "area"
      //   },
      // }).then(({ data }) => {
      let data = parseJson(areaList.data);
      // 去除后端代码中多余的“一线、二线。。。”
      data.map(item => {
        let newChildren = [];
        if (item.children && item.children.length) {
          item.children.map(ele => {
            if (![10, 11, 12, 13, 14, 15].includes(ele.value)) {
              newChildren.push(ele)
            }
          })
          item.children = newChildren;

        } else {
          delete item.children
        }
      })
      this.areaOptions = data;

      // })
    },
    // 获取区域信息
    getLine() {
      // service({
      //   url: '/prize/area/list',
      //   method: 'post',
      //   data: {
      //     level: "line"
      //   },
      // }).then(({ data }) => {
      let data = parseJson(lineList.data);
      this.lineOptions = data;

      console.log(data)

      // })
    },
    // 切换areaType
    changeAreaType() {
      this.formData.areaContent = "";
      this.formData.areaJson = [];
    },



  },
  created() {
    this.getArea(); //获取省市县城市
    this.getLine(); //获取线级城市
    console.log(this.id)
    if (this.id) {
      this.formData.id = this.id;
      // console.log("id-" + this.id)
      // console.log("isLook-" + this.isLook)
      // console.log("isShowTopTitle-" + this.isShowTopTitle)
      // console.log("type-" + this.type)

      this.getDetails()
    }
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

/* 顶部标题 */
.top-title {
  font-size: 20px;
  font-weight: 600;
  line-height: 60px;
}
</style>