<template>
  <div class="setQuotaModify">
    <div class="formInfo" v-if="success == false">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="220px">
        <el-form-item label="账号">
          <el-input v-model="singData.ACCT" class="formInput" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="可设转账日累计限额（最大值）">
          <el-input v-model="singData.DAY_LMT" class="formInput" disabled="disabled"></el-input>
          <!-- <el-input v-if="singData.DAY_LMT" v-model="singData.DAY_LMT" class="formInput" disabled="disabled"></el-input>
          <el-input v-else v-model="singData.BANK_DAY_LMT" class="formInput" disabled="disabled"></el-input> -->
        </el-form-item>
        <el-form-item label="转账日累计限额" prop="addLimitDay">
          <el-input v-model="ruleForm.addLimitDay"
                    class="formInput"
                    @blur="payMoneyblur1"
                    placeholder="转账日累计限额需小于可设置日累计限额"></el-input>
        </el-form-item>
        <el-form-item label="可设转账日累计笔数（最大值）">
          <el-input v-model="singData.E_DAY_TR_COUNT" class="formInput" disabled="disabled"></el-input>
          <!-- <el-input v-if="singData.E_DAY_TR_COUNT" v-model="singData.E_DAY_TR_COUNT" class="formInput" disabled="disabled"></el-input>
          <el-input v-else v-model="singData.BANK_E_DAY_TR_COUNT" class="formInput" disabled="disabled"></el-input> -->
        </el-form-item>
        <el-form-item label="转账日累计笔数" prop="addNumDay">
          <el-input v-model="ruleForm.addNumDay"
                    class="formInput"
                    placeholder="转账日累计笔数需小于可设置日累计笔数"></el-input>
        </el-form-item>
        <el-form-item label="可设转账年累计限额（最大值）">
          <el-input v-model="singData.E_YEAR_LIMIT" class="formInput" disabled="disabled"></el-input>
          <!-- <el-input v-if="singData.E_YEAR_LIMIT" v-model="singData.E_YEAR_LIMIT" class="formInput" disabled="disabled"></el-input>
          <el-input v-else v-model="singData.BANK_E_YEAR_LIMIT" class="formInput" disabled="disabled"></el-input> -->
        </el-form-item>
        <el-form-item label="转账年累计限额" prop="addLimitYear">
          <el-input v-model="ruleForm.addLimitYear"
                    class="formInput"
                    @blur="payMoneyblur2"
                    placeholder="转账年累计限额需小于可设置年累计限额"></el-input>
        </el-form-item>
        <el-form-item label="可设代发日累计限额（最大值）">
          <el-input v-model="singData.DAY_LMT_PAY" class="formInput" disabled="disabled"></el-input>
          <!-- <el-input v-if="singData.DAY_LMT_PAY" v-model="singData.DAY_LMT_PAY" class="formInput" disabled="disabled"></el-input>
          <el-input v-else v-model="singData.BANK_DAY_LMT_WAGE" class="formInput" disabled="disabled"></el-input> -->
        </el-form-item>
        <el-form-item label="代发日累计限额" prop="payLimitDay">
          <el-input v-model="ruleForm.payLimitDay"
                    class="formInput"
                    @blur="payMoneyblur3"
                    placeholder="代发日累计限额需小于可设置日代发限额"></el-input>
        </el-form-item>
        <el-form-item label="可设代发日累计笔数（最大值）">
          <el-input v-model="singData.E_DAY_TR_COUNT_WAGE" class="formInput" disabled="disabled"></el-input>
          <!-- <el-input v-if="singData.E_DAY_TR_COUNT_WAGE" v-model="singData.E_DAY_TR_COUNT_WAGE" class="formInput" disabled="disabled"></el-input>
          <el-input v-else v-model="singData.BANK_E_DAY_TR_COUNT_WAGE" class="formInput" disabled="disabled"></el-input> -->
        </el-form-item>
        <el-form-item label="代发日累计笔数" prop="payNumDay">
          <el-input v-model="ruleForm.payNumDay"
                    class="formInput"
                    placeholder="代发日累计笔数需小于可设置日代发笔数"></el-input>
        </el-form-item>
        <el-form-item label="可设代发年累计限额（最大值）">
          <el-input v-model="singData.E_YEAR_LIMIT_WAGE" class="formInput" disabled="disabled"></el-input>
          <!-- <el-input v-if="singData.E_YEAR_LIMIT_WAGE" v-model="singData.E_YEAR_LIMIT_WAGE" class="formInput" disabled="disabled"></el-input>
          <el-input v-else v-model="singData.BANK_E_YEAR_LIMIT_WAGE" class="formInput" disabled="disabled"></el-input> -->
        </el-form-item>
        <el-form-item label="代发年累计限额" prop="payLimitYear">
          <el-input v-model="ruleForm.payLimitYear"
                    class="formInput"
                    @blur="payMoneyblur4"
                    placeholder="代发年累计限额需小于可设置年代发限额"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="back">上一步</el-button>
          <el-button type="primary" size="medium" @click="submit('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="modifySuccess" v-if="success == true && !needAuthFlage">
      <img src="../../assets/img/groupService/success.png" alt="">
      <div class="makeBtn">
        <el-button type="primary" size="medium" @click="again">继续修改</el-button>
      </div>
    </div>
    <div class="modifySuccess" v-if="success == true && needAuthFlage">
      <p>修改成功，等待授权人审批</p>
      <div class="makeBtn">
        <el-button type="primary" size="medium" @click="again">继续修改</el-button>
      </div>
    </div>
    <reminder :msg="reminderMsg"></reminder>
  </div>
</template>
<script>
import reminder from './components/reminder'
import { formatMoney } from '../../assets/js/function/formatMoney.js'
export default {
  name: 'setQuotaModify',
  data () {
    // 自定义校验
    let validateLimitDay = (rule, value, callback) => {
      console.log(rule, value, 'valuevaluevaluevaluevaluevaluevaluevaluevaluevaluevaluevaluevalue')
      console.log(this.ruleForm.addLimitDay, this.singData.DAY_LMT, 'rulerulerulerulerulerulerulerulerulerulerulerule')
      if (value === '') {
        callback(new Error('请输入转账日累计限额'))
      } else {
        if ((this.ruleForm.addLimitDay * 1) > (this.singData.DAY_LMT * 1)) {
          callback(new Error('转账日累计限额需小于可设置日累计限额'))
        } else {
          callback()
        }
      }
    }
    let validateNumDay = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入转账日累计笔数'))
      } else {
        if ((this.ruleForm.addNumDay * 1) > (this.singData.E_DAY_TR_COUNT * 1)) {
          callback(new Error('转账日累计笔数需小于可设置日累计笔数'))
        } else {
          callback()
        }
      }
    }
    let validateLimitYear = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入转账年累计限额'))
      } else {
        if ((this.ruleForm.addLimitYear * 1) > (this.singData.E_YEAR_LIMIT * 1)) {
          callback(new Error('转账年累计限额需小于可设置年累计限额'))
        } else {
          callback()
        }
      }
    }
    let validatepayLimitDay = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入代发日累计限额'))
      } else {
        if ((this.ruleForm.payLimitDay * 1) > (this.singData.DAY_LMT_PAY * 1)) {
          callback(new Error('代发日累计限额需小于可设置日代发限额'))
        } else {
          callback()
        }
      }
    }
    let validatepayNumDay = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入代发年累计笔数'))
      } else {
        if ((this.ruleForm.payNumDay * 1) > (this.singData.E_DAY_TR_COUNT_WAGE * 1)) {
          callback(new Error('代发年累计笔数需小于可设置年累计笔数'))
        } else {
          callback()
        }
      }
    }
    let validatepayLimitYear = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入代发年累计限额'))
      } else {
        if ((this.ruleForm.payLimitYear * 1) > (this.singData.E_YEAR_LIMIT_WAGE * 1)) {
          callback(new Error('代发年累计限额需小于可设置年代发限额'))
        } else {
          callback()
        }
      }
    }
    return {
      singData: { // 签约信息查询
        ACCT: '', // 账号
        IS_LMT_SET: '', // 是否设置限额
        DAY_LMT: '', // 当日转账限额
        DAY_LMT_PAY: '', // 当日代发工资限额
        LAND_LMT: '', // 当日转账落地限额
        LAND_LMT_PAY: '', // 当日代发工资落地限额
        E_DAY_TR_COUNT: '', // 当日转账累计笔数
        E_DAY_TR_COUNT_WAGE: '', // 当日代发工资累计笔数
        E_YEAR_LIMIT: '', // 当日转账年累计限额
        E_YEAR_LIMIT_WAGE: '', // 当日代发工资年累计限额
        BANK_DAY_LMT: '', // 银行转账限日累计限额
        BANK_DAY_LMT_WAGE: '', // 银行代发工资限日累计限额
        BANK_E_DAY_TR_COUNT: '', // 银行转账限日累交易笔数
        BANK_E_DAY_TR_COUNT_WAGE: '', // 银行代发工资限日累计交易笔数
        BANK_E_YEAR_LIMIT: '', // 银行转账限年累交易限额
        BANK_E_YEAR_LIMIT_WAGE: '', // 银行代发工资限年累交易限额
        BANK_LAND_LMT: '', // 银行转账落地限额
        BANK_LAND_LMT_PAY: '' // 银行代发工资落地限额
      },
      needAuthFlage: true, // 是否显示授权成功页面
      ruleForm: {
        addLimitDay: '', // 转账日累计限额
        addNumDay: '', // 转账日累计笔数
        addLimitYear: '', // 转账年累计限额
        payLimitDay: '', // 代发日累计限额
        payNumDay: '', // 代发年累计笔数
        payLimitYear: '' // 代发年累计限额
      },
      rules: {
        addLimitDay: [
          { required: true, validator: validateLimitDay, trigger: 'blur' }
        ],
        addNumDay: [
          { required: true, validator: validateNumDay, trigger: 'blur' }
        ],
        addLimitYear: [
          { required: true, validator: validateLimitYear, trigger: 'blur' }
        ],
        payLimitDay: [
          { required: true, validator: validatepayLimitDay, trigger: 'blur' }
        ],
        payNumDay: [
          { required: true, validator: validatepayNumDay, trigger: 'blur' }
        ],
        payLimitYear: [
          { required: true, validator: validatepayLimitYear, trigger: 'blur' }
        ]
      },
      success: false,
      // 温馨提示
      reminderMsg: [
        '您仅可在此页面将转账限额调低，不能调高。需要调高限额的请前往开户行办理。',
        '批量转账，代发工资按照明细笔数统计日累计交易笔数。'
      ]
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.getUserInfo
    }
  },
  created () {
    this.singData = this.$route.query
    // this.singData.DAY_LMT = formatMoney(this.singData.DAY_LMT)
    // this.singData.E_YEAR_LIMIT = formatMoney(this.singData.E_YEAR_LIMIT)
    // this.singData.E_YEAR_LIMIT_WAGE = formatMoney(this.singData.E_YEAR_LIMIT_WAGE)
    // this.singData.DAY_LMT_PAY = formatMoney(this.singData.DAY_LMT_PAY)
    if (this.singData.IS_LMT_SET === '0') { // 未设置限额，用银行级限额
      this.singData.DAY_LMT = formatMoney(this.singData.BANK_DAY_LMT)
      this.singData.E_DAY_TR_COUNT = this.singData.BANK_E_DAY_TR_COUNT
      this.singData.E_YEAR_LIMIT = formatMoney(this.singData.BANK_E_YEAR_LIMIT)
      this.singData.DAY_LMT_PAY = formatMoney(this.singData.BANK_DAY_LMT_WAGE)
      this.singData.E_DAY_TR_COUNT_WAGE = this.singData.BANK_E_DAY_TR_COUNT_WAGE
      this.singData.E_YEAR_LIMIT_WAGE = formatMoney(this.singData.BANK_E_YEAR_LIMIT_WAGE)
    } else { // 设置限额后 回显限额数据
      this.ruleForm.addLimitDay = formatMoney(this.singData.DAY_LMT)
      this.ruleForm.payLimitDay = formatMoney(this.singData.DAY_LMT_PAY)
      this.ruleForm.addNumDay = this.singData.E_DAY_TR_COUNT
      this.ruleForm.payNumDay = this.singData.E_DAY_TR_COUNT_WAGE
      this.ruleForm.addLimitYear = formatMoney(this.singData.E_YEAR_LIMIT)
      this.ruleForm.payLimitYear = formatMoney(this.singData.E_YEAR_LIMIT_WAGE)
    }
  },
  watch: {
    'ruleForm.addLimitDay' (newVal) {
      const format = /\d{0,12}(\.\d{0,2})?/
      const match = newVal.match(format)
      let newValue = match[0].replace('-', '').replace(/^(-?)0+(\d)/, '$1$2').replace(/^(-?)\./, '$10.')
      this.ruleForm.addLimitDay = newValue
    },
    'ruleForm.payLimitDay' (newVal) {
      const format = /\d{0,12}(\.\d{0,2})?/
      const match = newVal.match(format)
      let newValue = match[0].replace('-', '').replace(/^(-?)0+(\d)/, '$1$2').replace(/^(-?)\./, '$10.')
      this.ruleForm.payLimitDay = newValue
    },
    'ruleForm.addNumDay' (newVal) {
      const format = /\d{0,10}(\d{0,2})?/
      const match = newVal.match(format)
      let newValue = match[0].replace('-', '').replace(/^(-?)0+(\d)/, '$1$2').replace(/^(-?)\./, '$10.')
      this.ruleForm.addNumDay = newValue
    },
    'ruleForm.payNumDay' (newVal) {
      const format = /\d{0,10}(\d{0,2})?/
      const match = newVal.match(format)
      let newValue = match[0].replace('-', '').replace(/^(-?)0+(\d)/, '$1$2').replace(/^(-?)\./, '$10.')
      this.ruleForm.payNumDay = newValue
    },
    'ruleForm.addLimitYear' (newVal) {
      const format = /\d{0,12}(\.\d{0,2})?/
      const match = newVal.match(format)
      let newValue = match[0].replace('-', '').replace(/^(-?)0+(\d)/, '$1$2').replace(/^(-?)\./, '$10.')
      this.ruleForm.addLimitYear = newValue
    },
    'ruleForm.payLimitYear' (newVal) {
      const format = /\d{0,12}(\.\d{0,2})?/
      const match = newVal.match(format)
      let newValue = match[0].replace('-', '').replace(/^(-?)0+(\d)/, '$1$2').replace(/^(-?)\./, '$10.')
      this.ruleForm.payLimitYear = newValue
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    payMoneyblur1 () {
      this.ruleForm.addLimitDay = Number(this.ruleForm.addLimitDay).toFixed(2)
    },
    payMoneyblur2 () {
      this.ruleForm.addLimitYear = Number(this.ruleForm.addLimitYear).toFixed(2)
    },
    payMoneyblur3 () {
      this.ruleForm.payLimitDay = Number(this.ruleForm.payLimitDay).toFixed(2)
    },
    payMoneyblur4 () {
      this.ruleForm.payLimitYear = Number(this.ruleForm.payLimitYear).toFixed(2)
    },
    submit (formName) {
      if (!this.ruleForm.addLimitDay) {
        return this.$message.error('请输入转账日累计限额')
      } else if (!this.ruleForm.addNumDay) {
        return this.$message.error('请输入转账日累计笔数')
      } else if (!this.ruleForm.addLimitYear) {
        return this.$message.error('请输入转账年累计限额')
      } else if (!this.ruleForm.payLimitDay) {
        return this.$message.error('请输入代发日累计额度')
      } else if (!this.ruleForm.payNumDay) {
        return this.$message.error('请输入代发日累计笔数')
      } else if (!this.ruleForm.payLimitYear) {
        return this.$message.error('请输入代发年累计限额')
      } else {
        this.$refs.ruleForm.validate((result, obj) => {
          if (result) {
            this.eLmtSet()
          }
        })
      }
    },
    eLmtSet () {
      let lData = {
        url: 'eLmtSet',
        params: {
          'CUST_NO': this.userInfo.CUST_NO, // 客户号
          'USER_NO': this.userInfo.USER_NO, // 用户号
          'ACCT': this.singData.ACCT, // 账户
          'DAY_LMT': this.ruleForm.addLimitDay, // 日累计限额
          'DAY_LMT_PAY': this.ruleForm.payLimitDay, // 代发工资额度
          'E_DAY_TR_COUNT': this.ruleForm.addNumDay, // 转账日累计交易笔数
          'E_DAY_TR_COUNT_WAGE': this.ruleForm.payNumDay, // 代发工资日累计交易笔数
          'E_YEAR_LIMIT': this.ruleForm.addLimitYear, // 转账年累计限额
          'E_YEAR_LIMIT_WAGE': this.ruleForm.payLimitYear // 代发工资年累计限额
        }
      }
      this.Ukeycheck(lData)
      // this.$publicFun.ajax(this, lData).then((response) => {
      //   console.log(response, 'eLmtSet')
      //   if (response.data.head.H_STATUS === '1' || response.data.head.H_STATUS === 'needAuth') {
      //     this.success = true
      //     if (response.data.head.H_STATUS === 'needAuth') {
      //       this.needAuthFlage = true
      //     } else {
      //       this.needAuthFlage = false
      //     }
      //   } else {
      //     this.$message.error(response.data.body.MSG)
      //   }
      // })
    },
    Ukeycheck (lData) {
      lData.params.TRANS_NAME = '限额设置'
      lData.params.TRANS_CODE = 'eLmtSet'
      lData.params.DAY_TR_COUNT = this.ruleForm.addNumDay
      lData.params.YEAR_LIMIT = this.ruleForm.addLimitYear
      lData.params.SN_FIELD = 'DAY_LMT|DAY_TR_COUNT|YEAR_LIMIT|DAY_LMT_PAY|E_DAY_TR_COUNT_WAGE|E_YEAR_LIMIT_WAGE'
      lData.params.SN_FIELD_NAME = '转账日累计额度|转账日累计次数|转账年累计限额|代发工资日累计额度|代发工资日累计次数|代发工资累计限额'
      lData.params.AUTH_TYPE = '02' // 验签类型 01：短信  02：ukey
      // 获取签名数据
      this.$publicFun.uKeyValidCheck(lData, this.submits, this)
    },
    submits (lData) {
      this.$publicFun.ajax(this, lData).then(
        (response) => {
          console.log(response, 'eLmtSet')
          if (response.data.head.H_STATUS === '1' || response.data.head.H_STATUS === 'needAuth') {
            this.success = true
            if (response.data.head.H_STATUS === 'needAuth') {
              this.needAuthFlage = true
            } else {
              this.needAuthFlage = false
            }
          } else {
            this.$message.error(response.data.body.MSG)
          }
        }
      )
    },
    again (formName) {
      this.success = false
      this.ruleForm.addLimitDay = this.singData.DAY_LMT
      this.ruleForm.payLimitDay = this.singData.DAY_LMT_PAY
      this.ruleForm.addNumDay = this.singData.E_DAY_TR_COUNT
      this.ruleForm.payNumDay = this.singData.E_DAY_TR_COUNT_WAGE
      this.ruleForm.addLimitYear = this.singData.E_YEAR_LIMIT
      this.ruleForm.payLimitYear = this.singData.E_YEAR_LIMIT_WAGE
      // let lData = {
      //   url: 'eLmtSet',
      //   params: {
      //     'CUST_NO': this.userInfo.CUST_NO, // 客户号
      //     'USER_NO': this.userInfo.USER_NO, // 用户号
      //     'ACCT': this.singData.ACCT, // 账户
      //     'DAY_LMT': this.ruleForm.addLimitDay, // 日累计限额
      //     'DAY_LMT_PAY': this.ruleForm.payLimitDay, // 代发工资额度
      //     'E_DAY_TR_COUNT': this.ruleForm.addNumDay, // 转账日累计交易笔数
      //     'E_DAY_TR_COUNT_WAGE': this.ruleForm.payNumDay, // 代发工资日累计交易笔数
      //     'E_YEAR_LIMIT': this.ruleForm.addLimitYear, // 转账年累计限额
      //     'E_YEAR_LIMIT_WAGE': this.ruleForm.payLimitYear, // 代发工资年累计限额
      //   }
      // }
      // this.$publicFun.ajax(this, lData).then((response) => {
      //   console.log(response, 'eLmtSet')
      //   if (response.data.head.H_STATUS === '1') {
      //     this.success = false
      //   } else {
      //     this.$message.error(response.data.body.MSG)
      //   }
      // })
    }
  },
  components: {
    reminder
  }
}
</script>

<style lang="less" scoped>
/deep/.el-form-item{
  margin-bottom: 16px;
}
/deep/.el-input__inner,/deep/.el-form-item__label{
  height: 36px;
  line-height: 36px;
}
.setQuotaModify {
  .formInfo {
    margin-top: 20px;
    background: #fff;
    padding-top: 45px;
    form {
      width: 500px;
      margin: 0 auto;
    }
  }
  .modifySuccess {
    background: #ffffff;
    margin-top: 20px;
    text-align: center;
    .makeBtn {
      margin-top: 40px;
      padding-bottom: 20px;
    }
    p{
      font-size: 36px;
      line-height: 100px;
    }
  }
  .formInput {
    width: 305px;
  }
}
</style>
