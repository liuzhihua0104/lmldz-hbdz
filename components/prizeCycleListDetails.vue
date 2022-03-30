 <template>
  <el-form :disabled="!islook==1" label-position="right" label-width="200px" :rules="formRules" ref="formData" :model="formData">

    <div class="top-title" v-if="isshowtoptitle==1">奖品周期方案详情</div>
    <div class="title">
      基本信息</div>
    <el-row>
      <el-col :span="18">
        <el-form-item style="margin-right:0" label="奖品周期方案名称:" prop="name">
          <el-input :clearable="true" class="inputWidth" maxLength="30" v-model="formData.name" placeholder="请输入奖品周期方案名称，30个字符以内"></el-input>
        </el-form-item>
        <el-form-item style="margin-right:0" label="备注:" prop="remarks">
          <el-input :clearable="true" class="inputWidth" type="textarea" :rows="4" v-model="formData.remarks" placeholder="请输入内容，100个字符以内">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <div class="title">
      配置信息</div>

    <el-row>
      <el-col :span="24">
        <el-form-item style="margin-right:0" label="条件:" prop="condition">
          <el-switch v-model="formData.condition" :active-value="1" :inactive-value="0">
          </el-switch>
        </el-form-item>

        <div class="wrap" style="border:1px solid #eaedf3;padding:20px 100px 20px 0;margin-bottom:20px">
          <el-form-item style="margin-right:0" label="触发条件使用次数:" prop="useNum">
            <el-input placeholder="请输入数字" :clearable="true" class="inputWidth" v-model="formData.useNum"></el-input>
          </el-form-item>

          <el-form-item style="margin-right:0" label="间隔次数:" prop="intervalNum">
            <el-input placeholder="请输入数字" :clearable="true" class="inputWidth" v-model="formData.intervalNum"></el-input>
          </el-form-item>

          <el-form-item style="margin-right:0" label="" prop="relationship">
            <el-select v-model="formData.relationship">
              <el-option label="或" :value="1"></el-option>
              <el-option label="且" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="margin-right:0" label="间隔时间:" prop="intervalTime">
            <el-input v-model="formData.intervalTime" placeholder="请输入数字" class="input-with-select">
              <el-select v-model="formData.unit" slot="append" style="width:100px">
                <el-option label="天" :value="1"></el-option>
                <el-option label="小时" :value="2"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

        </div>

        <el-form-item style="margin-right:0" label="时间周期:" prop="time">
          <el-switch v-model="formData.time" :active-value="1" :inactive-value="0">
          </el-switch>
        </el-form-item>

        <!-- 时段 -->

        <div class="wrap" style="text-align:center;border:1px solid #eaedf3;padding:20px 0">
          <el-table max-height="250px" :data="rangeListData" class="table-wrap time-list" :border="true" size="mini" :header-cell-style="{background:'#e5e9f2'}">
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

          <!-- <div v-if="islook!=1" style="width:800px;text-align:center;margin-left:80px"> -->
        
            <el-button style="margin-top:20px" type="primary" size="mini" class="btn" @click="addTimeRange">新增</el-button>
    

        </div>

        <!-- <div class="btns" v-if="islook==0">
        <el-button class="back" @click="goBack">返回</el-button>
        <el-button type="primary" @click="saveFn('formData')">保存</el-button>
      </div> -->
        <div style="text-align:center;margin-top:20px">
          <el-button class="back" @click="goBack">返回</el-button>
          <el-button type="primary" @click="saveFn('formData')">保存</el-button>
        </div>

      </el-col>
    </el-row>
  </el-form>
</template>
 


<script>

// 递归处理城市数据
function parseJson(arr) {
  arr = arr.slice()
  function toParse(arr) {
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
module.exports = {
  props: ["type", "islook", "id", "isshowtoptitle", "prizeid", "sourceid"],

  data() {
    let self = this  // 加上这一句就OK了
    return {
      formData: {
        id: "", // 
        name: "", // 方案名称  
        remarks: "", // 备注
        condition: 1, //条件
        useNum: "", // 使用次数
        intervalNum: "", // 间隔次数
        relationship: 1, // 或||且
        intervalTime: "", // 间隔时间
        unit: 1, //天||小时
        time: 1, //时间周期
      },

      rangeListData: [], //时间段自定义列表数据


      formRules: {
        name: [
          { required: true, message: '请输入定向名称', trigger: 'change' },
        ],
        useNum: [
          { required: true, message: '请填入数字', pattern: /^[0-9]?$|^[1-9]{1}[0-9]*$/ }  //大于等于0的正整数
        ],
        intervalNum: [
          { required: true, message: '请填入数字', pattern: /^[0-9]?$|^[1-9]{1}[0-9]*$/ }  //大于等于0的正整数
        ],
        intervalTime: [
          { required: true, message: '请填入数字', pattern: /^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/ }  // 大于等于0，最多保留两位小数
        ],


      },





    }
  },
  watch: {
  },
  mounted() {
    window.detailData = this;
  },

  methods: {



    // 处理保存参数
    doSaveParams() {
      let paramsForm = {
        name: this.formData.name, // 方案名称
        remarks: this.formData.remarks, // 备注
        areaType: this.formData.areaType, // 区域
        sex: this.formData.sex, // 性别
        scanContent: this.formData.scanContent, // 扫码工具
        timeType: this.formData.timeType, // 时段
        devices: this.formData.devices// 设备
      }

      if (this.formData.id) {
        paramsForm.id = this.formData.id;
      }

      // 奖品ID
      if (this.prizeid) {
        paramsForm.sourceId = this.prizeid
      }

      // 素材源ID
      if (this.sourceid) {
        paramsForm.sourceId = this.sourceid
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

      return paramsForm;

    },


    // 保存成功后返回其他页面
    saveFn(formName) {
      let self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let params = self.doSaveParams();
          service({
            url: '/prize/orientation/create',
            method: 'post',
            data: params,
          }).then(({ id }) => {


          }).catch((err) => {
            this.$message.error(err.msg);
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
      let data = JSON.parse(sessionStorage.getItem("rows"));
      console.log(data)
      let form = {
        name: data.name, // 方案名称
        remarks: data.remarks, // 备注
        areaType: String(data.areaType), // 区域
        sex: String(data.sex), // 性别
        scanContent: data.scanContent, // 扫码工具
        timeType: data.timeType, // 时段
        areaJson: JSON.parse(data.areaJson), //回显省市县||限级    
        areaContent: data.areaContent, //区域内容,库里存的'
        devices: data.devices, //设备
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
        //法定
        let values = data.holidays.split(",");
        form.weekData_values = values;
        // 是否全选
        let optLength = this.formData.weekData_options.length;
        form.weekData_checkAll = values.length == optLength
        // 全选按钮样式
        form.weekData_isIndeterminate = !(values.length == optLength)
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





  },
  created() {

    if (this.id) {
      this.formData.id = this.id;
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
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  line-height: 60px;
}

.dialogWidth > .el-dialog {
  width: 1000px !important;
}
</style>