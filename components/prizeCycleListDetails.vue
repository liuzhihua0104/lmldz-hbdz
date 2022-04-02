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
            <el-table-column align="center" width="50" label="序号" type="index"></el-table-column>
            <!-- <el-table-column align="center" label="时间段" width="150px">
              <template slot-scope="scope">
                <el-slider @change="changeSlider(scope.row)" v-model="scope.row.sliderValue" range :max="366" :min="1" :step="1">
                </el-slider>
              </template>
            </el-table-column> -->
            <el-table-column align="center" label="时间范围" width="400px">
              <template slot-scope="scope">
                <div style="display:flex;align-items:center">

                  <el-cascader @focus="startFocus" @change="changeStarTime(scope.row)" v-model="scope.row.startTime" :options="dateOptions" clearable :show-all-levels="false" filterable></el-cascader>

                  <span style="padding:0 10px">至</span>

                  <el-cascader @focus="endFocus(scope.row)" :disabled="!scope.row.startTime.length" v-model="scope.row.endTime" :options="dateOptions" clearable :show-all-levels="false" filterable></el-cascader>

                </div>

              </template>
            </el-table-column>

            <el-table-column align="center" label="单人可派奖总次数" width="140px" style="display:flex">
              <template slot-scope="scope">
                <el-input :clearable="true" v-model="scope.row.count" placeholder="请输入数字">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="重置时间" width="140px" style="display:flex">
              <template slot-scope="scope">
                <el-input :clearable="true" v-model="scope.row.resetTime" placeholder="请输入数字">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" style="display:flex">
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

function getAllDay() {

  let dateOptions = []; // 月份和日子分级
  for (let month = 1; month <= 12; month++) {
    let minMonth = [4, 6, 9, 11] // 4月、6月、9月、11月为30天
    let maxMonth = [1, 3, 5, 7, 8, 10, 12] //1月、3月、5月、7月、8月、10月、12月为31天
    let maxDay;
    if (minMonth.includes(month)) {
      maxDay = 30;
    } else if (maxMonth.includes(month)) {
      maxDay = 31;
    } else {
      maxDay = 29   //2月份最大29
    }

    let obj = {
      label: month + "月",
      value: month,
      children: []
    }

    for (let day = 1; day <= maxDay; day++) {
      let dateItem = {
        label: `${month >= 10 ? month : ("0" + month)}-${day >= 10 ? day : ("0" + day)}`,
        value: `${month >= 10 ? month : ("0" + month)}-${day >= 10 ? day : ("0" + day)}`,
        dayValue: day

      }

      obj.children.push(dateItem)
    }
    dateOptions.push(obj)

  }

  console.log(dateOptions)

  return dateOptions

}


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

      dateOptions: getAllDay()





    }
  },
  watch: {
  },
  mounted() {
    window.detailData = this;
  },

  methods: {
    // 选择完第一个时间后，最大只能选择3个自然月内的日期，确定后面禁止选中的日期
    // 例如：01-01=》03-31之后不可选 ；01-02=》04-01之后不可选
    endFocus(row) {
      console.log("点击结束按钮")
      console.log(row)

      // 用户点击清除的情况，所有的都能点击
      if (row.startTime.length == 0) {
        this.dateOptions = getAllDay();

        // 当前这条数据的结束时间清除,如果不清除会受3个月的限制
        this.rangeListData.filter(item => {
          item.endTime = [];
        })
        return
      }
      let targetMonth = (Number(row.startTime[0]) + 3)
      let targetDay = (Number(row.startTime[1].split("-")[1]))

      // 如果是1号，可选日的最大日期应该取前一个月的最后一天
      let minMonth = [4, 6, 9, 11] // 4月、6月、9月、11月为30天
      let maxMonth = [1, 3, 5, 7, 8, 10, 12] //1月、3月、5月、7月、8月、10月、12月为31天

      if (targetDay == 1) {
        targetMonth = targetMonth - 1 >= 12 ? 12 : targetMonth - 1;  // 不能跨年      
        if (minMonth.indexOf(targetMonth) != -1) {
          targetDay = 30
        } else if (maxMonth.indexOf(targetMonth) != -1) {
          targetDay = 31
        } else {
          targetDay = 29
        }
      } else {
        targetDay = targetDay - 1;
      }

      this.dateOptions.map(item => {
        item.children.map(element => {
          // 当月的只要大于这个日期就禁止选择
          if (item.value == targetMonth && (element.dayValue > targetDay)) {
            element.disabled = true;
          } else if (item.value > targetMonth) {
            // 之后的月份全部禁止选择
            element.disabled = true;
            item.disabled = true;
          }
        })
      })

      // 以下处理之前不能选择的日期
      let earlyMonth = row.startTime[0];
      let earlyDay = Number(row.startTime[1].split("-")[1]);
      this.dateOptions.map(item => {
        item.children.map(element => {
          // 当月的只要大于这个日期就禁止选择
          if (item.value == earlyMonth && (element.dayValue <= earlyDay)) {
            element.disabled = true;
          } else if (item.value < earlyMonth) {
            // 之后的月份全部禁止选择
            element.disabled = true;
            item.disabled = true;
          }
        })
      })
    },

    // 开始时间获取焦点后所有的都放开可以选择，供开始控件使用
    startFocus() {
      console.log("开始按钮")
      this.dateOptions = getAllDay();
    },

    // 每次修改前面的日期都要清除后面的日期
    changeStarTime(row) {
      this.rangeListData.filter(item => {
        if (item.id == row.id) {
          item.endTime = []
        }
      })




    },

    // 处理保存参数
    doSaveParams() {
      let paramsForm = {
        name: this.formData.name, // 方案名称·
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


      this.formData = { ...this.formData, ...form };

    },

    // 时间范围新增按钮
    addTimeRange() {
      let needAdd = {
        id: this.rangeListData.length + 1,
        startTime: [],
        endTime: [],
      }
      this.rangeListData.push(needAdd);
    },

    // 删除
    delTimeRange(row) {
      let index = this.rangeListData.findIndex(item => item.id == row.id);
      this.rangeListData.splice(index, 1)
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