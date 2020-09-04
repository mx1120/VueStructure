<template>
  <div class="transferQuery">
    <div class="main" v-show="mainShow">
      <div class="clear">
        <!-- <zx-selectBlank :selectWidth='380' v-model="cardNum" class="flt" :transQuery='true'></zx-selectBlank> -->
        <span style="margin-right:10px; font-size: 14px">选择账号：</span>
        <el-select v-model="cardNum" style="width: 260px" remote filterable :remote-method="filterCard">
          <el-option value="-1" label="全部">全部</el-option>
          <el-option
            v-for="(item, index) in acctList"
            :key="index"
            :label="item.ACCT"
            :value="item.ACCT"
          ></el-option>
        </el-select>
        <zx-time style="margin-right: 80px" class="flrt" @time-change='getTime' :timeData='timeData' :threeMonth='true'></zx-time>
      </div>
      <div class="btn noPrint">
        <el-button type='primary' size="medium" @click="query">查询</el-button>
        <el-button type='primary' size="medium" @click="down" :disabled="dis">下载</el-button>
        <el-button type='primary' size="medium" @click="print" :disabled="dis">打印</el-button>
      </div>
      <div class="table">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style='{background: "#E9EBF9", color: "#000", "border-color": "rgb(221, 221, 221)", "text-align": "center"}' :cell-style='{"text-align": "center"}'>
          <el-table-column prop="TRAN_TIME" label="交易时间" width="180">
            <div slot-scope="scope">
              {{(scope.row.TRAN_DATE + scope.row.TRAN_TIME) | noSpaceformat}}
            </div>
          </el-table-column>
          <el-table-column prop="RCV_ACCT_NAME" label="收款户名" width="220"></el-table-column>
          <el-table-column prop="RCV_ACCT" label="收款账号" width="240"></el-table-column>
          <el-table-column prop="TRAN_AMT" label="交易金额(元)" width="110">
            <div slot-scope="scope">
              {{scope.row.TRAN_AMT | filterMoney}}
            </div>
          </el-table-column>
          <el-table-column prop="TRAN_CHAN" label="交易渠道" width="131">
            <div slot-scope="scope">
              {{TRAN_TYPE[scope.row.TRAN_CHAN]}}
            </div>
          </el-table-column>
          <el-table-column prop="TRAN_STATE" label="交易状态" width="150">
            <template slot-scope="scope">
              <span>{{TRAN_STATE[scope.row.TRAN_STATE] || '状态未知'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="128">
            <template slot-scope="scope">
              <div>
                <el-button type='text' @click="goDts(scope.row)">详情</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination noPrint">
        <el-pagination background layout="prev, pager, next, jumper"
                        :total="total"
                        :current-page="page"
                        @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <transferDetail :item='details' v-if="dtsShow" @goback='goback' class="noPrint"></transferDetail>
  </div>
</template>
<script>
import transferDetail from './components/transferDetail'
import { mapGetters } from 'vuex'
import { requestFilter } from '@/assets/js/function/FN'
import * as Config from '@/assets/js/utils/index'

export default {
  name: 'transferQuery',
  data () {
    return {
      timeData: [],
      cardNum: '-1',
      tableData: [],
      dis: false,
      page: 1,
      total: 0,
      mainShow: true,
      dtsShow: false,
      details: '',
      TRAN_TYPE: Config.TRAN_TYPE,
      TRAN_STATE: {
        0: '失败',
        1: '成功',
        2: '未知',
        3: '落地处理中',
        4: '待处理',
        5: '处理中',
        7: '已撤销',
        9: '待审批',
        11: '处理完成，状态未知'
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo',
      tipList: 'getTip',
      acctList: 'getCardList'
    })
  },
  components: {
    transferDetail
  },
  created () {
    // this.cardNum = this.acctList[0].ACCT
    let date = this.$publicFun.timeFormat('yyyy-MM-dd', new Date())
    let endTime = this.$publicFun.timeFormat('yyyy-MM-dd', new Date())
    let sTime = new Date(this.$publicFun.setFastTime(date, -1))
    let starTime = this.$publicFun.timeFormat('yyyy-MM-dd', sTime)
    this.timeData = [starTime, endTime]
  },
  mounted () {
    this.getTransLog()
  },
  methods: {
    // 卡列表筛选
    filterCard (val) {
      console.info(val)
      this.$store.dispatch('searchCardList', val)
    },
    down () {
      let starTime = this.timeData[0] ? this.$publicFun.timeFormat('yyyyMMdd', new Date(this.timeData[0])) : ''
      let endTime = this.timeData[1] ? this.$publicFun.timeFormat('yyyyMMdd', new Date(this.timeData[1])) : ''
      let lData = {
        cherryx: true,
        url: '/app/lyext/down/exportExcel',
        params: {
          bankType: 'E',
          reqMehtod: 'transLogQuery',
          params: {
            CUST_TYPE: 'E',
            CUST_NO: this.userInfo.CUST_NO,
            CORE_NO: '',
            USER_NO: this.userInfo.USER_NO,
            PAY_ACCT: this.cardNum === '-1' ? '' : this.cardNum,
            HX_SYS_ID: this.userInfo.INCORP_NO, // 法人编号
            TRAN_STATE: '',
            START_DATE: this.$publicFun.timeFomat(starTime),
            END_DATE: this.$publicFun.timeFomat(endTime),
            NEXT_KEY: 1,
            PAGE_SIZE: '99999',
            IS_EXPORT: ''
          },
          sorts: ['TRAN_DATE', 'TRAN_TIME', 'TRAN_AMT', 'REAL_FEE', 'PAY_ACCT', 'PAY_ACCT_NAME', 'RCV_ACCT_NAME', 'RCV_ACCT', 'BANK_NAME', 'TRAN_CHAN', 'TRAN_STATE', 'PAY_REM', 'TRAN_RSP_MSG'],
          filedNames: ['交易日期', '交易时间', '交易金额(元)', '手续费', '付款账号', '付款户名', '收款户名', '收款账号', '收款行', '交易渠道', '交易状态', '附言', '备注'],
          formatFileds: ['TRAN_DATE', 'TRAN_TIME'],
          formatAmounts: ['TRAN_AMT', 'REAL_FEE']
        }
      }
      this.$publicFun.cherryAxios_half(this, lData).then(res => {
        if (res.status !== 200) {
          this.$message.error('导出失败')
          return
        }
        let blob = res.data
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        var browser = window.navigator.userAgent.toLowerCase()
        if (browser.indexOf('chrome') >= 0) {
          reader.onload = (e) => {
            var a = document.createElement('a') // 转换完成，创建一个a标签用于下载
            a.download = '转账查询明细.xls'
            a.href = e.target.result
            const link = document.createElement('a')
            a.click()
          }
        } else if (browser.indexOf('firefox') >= 0) {
          reader.onload = (e) => {
            var a = document.createElement('a') // 转换完成，创建一个a标签用于下载
            a.id = 'idName'
            a.download = '转账查询明细.xls'
            a.href = e.target.result
            /* eslint no-unused-vars : 0 */
            const link = document.createElement('a')
            document.body.append(a)
            a.click()
            document.getElementById('idName').remove()
          }
        } else if (browser.indexOf('msie') >= 0 || browser.indexOf('rv:11') >= 0) {
          reader.onload = (e) => {
            var filename = '转账查询明细.xls'
            window.navigator.msSaveOrOpenBlob(blob, filename)
          }
        }
      })
      // let lData = {
      //   bankType: 'E',
      //   reqMehtod: 'transLogQuery',
      //   params: {
      //     CUST_TYPE: 'E',
      //     CUST_NO: this.userInfo.CUST_NO,
      //     CORE_NO: '',
      //     USER_NO: this.userInfo.USER_NO,
      //     PAY_ACCT: this.cardNum === '-1' ? '' : this.cardNum,
      //     FUNC_NO: 'TR',
      //     HX_SYS_ID: this.userInfo.INCORP_NO, // 法人编号
      //     TRAN_STATE: '',
      //     START_DATE: this.$publicFun.timeFomat(starTime),
      //     END_DATE: this.$publicFun.timeFomat(endTime),
      //     NEXT_KEY: this.page,
      //     PAGE_SIZE: '99999',
      //     IS_EXPORT: ''
      //   },
      //   sorts: ['TRAN_DATE', 'TRAN_TIME', 'TRAN_AMT', 'REAL_FEE', 'PAY_ACCT', 'PAY_ACCT_NAME', 'RCV_ACCT_NAME', 'RCV_ACCT', 'BANK_NAME', 'TRAN_CHAN', 'TRAN_STATE', 'PAY_REM', 'TRAN_RSP_MSG'],
      //   filedNames: ['交易日期', '交易时间', '交易金额', '手续费', '付款账号', '付款户名', '收款户名', '收款账号', '收款行', '交易渠道', '交易状态', '附言', '备注'],
      //   formatFileds: ['TRAN_DATE', 'TRAN_TIME'],
      //   formatAmounts: ['TRAN_AMT', 'REAL_FEE']
      // }
      // var xhr = new XMLHttpRequest()
      // var url = window.urlAddress + '/app/lyext/down/exportExcel'
      // // var url = 'sapis/app/lyext/down/downQDFile';
      // xhr.open('POST', url, true)
      // // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      // xhr.setRequestHeader('Content-Type', 'application/json')
      // // xhr.setRequestHeader("Content-Type", type)
      // xhr.responseType = 'blob'
      // xhr.onload = function () { // 定义请求完成的处理函数
      //   if (this.status === 200) {
      //     console.log(this.response, 'this.response')
      //     var blob = this.response
      //     var reader = new FileReader()
      //     reader.readAsDataURL(blob) // 转换为base64，可以直接放入a标签href
      //     reader.onload = function (e) {
      //       var a = document.createElement('a') // 转换完成，创建一个a标签用于下载
      //       a.download = 'filename.xls'
      //       a.href = e.target.result
      //       /* eslint no-unused-vars : 0 */
      //       const link = document.createElement('a')
      //       a.click()
      //     }
      //   } else if (this.status === 504) {
      //     this.$message.error('导出失败，请求超时')
      //   } else {
      //     this.$message.error('导出失败')
      //   }
      // }
      // xhr.send(JSON.stringify(lData))
    },
    query () {
      this.page = 1
      this.getTransLog()
    },
    getTransLog () {
      if (!this.timeData[0]) {
        return this.$message.error('请选择开始时间')
      }
      if (!this.timeData[1]) {
        return this.$message.error('请选择结束时间')
      }
      let sTime = this.timeData[0] && new Date(this.timeData[0]).getTime()
      let eTime = this.timeData[1] && new Date(this.timeData[1]).getTime()
      let longDay = (eTime - sTime) / 3600 / 24 / 1000
      if (longDay > 93) {
        return this.$message.error('查询区间不能大于三个月')
      }
      let starTime = this.timeData[0] ? this.$publicFun.timeFormat('yyyyMMdd', new Date(this.timeData[0])) : ''
      let endTime = this.timeData[1] ? this.$publicFun.timeFormat('yyyyMMdd', new Date(this.timeData[1])) : ''
      let lData = {
        url: 'transLogQuery',
        params: {
          CUST_NO: this.userInfo.CUST_NO,
          CORE_NO: '',
          USER_NO: this.userInfo.USER_NO,
          PAY_ACCT: this.cardNum === '-1' ? '' : this.cardNum,
          TRAN_STATE: '',
          START_DATE: this.$publicFun.timeFomat(starTime),
          END_DATE: this.$publicFun.timeFomat(endTime),
          NEXT_KEY: this.page,
          PAGE_SIZE: '10',
          IS_EXPORT: ''
        }
      }
      this.$publicFun.ajax(this, lData).then((response) => {
        if (response.data.body.STATUS === '1') {
          this.total = Number(response.data.body.TOTAL_NUM)
          this.tableData = requestFilter(response.data.body.listEntity)
          if (this.tableData.length > 0) {
            this.dis = false
          }
        } else {
          this.tableData = []
          this.total = 0
          this.dis = true
          response.data.body.MSG && this.$message.error(response.data.body.MSG)
        }
      })
    },
    getTime (val) {
      this.timeData = val
      // this.page = 1
      // this.getTransLog()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getTransLog()
    },
    goDts (rowVal) {
      this.details = rowVal
      this.dtsShow = true
      this.mainShow = false
    },
    // 返回上一步
    goback () {
      this.mainShow = true
      this.dtsShow = false
    },
    print () {
      window.print()
    }
  }
}
</script>
<style lang="less" scoped>
  .transferQuery {
    .main {
      padding: 20px;
      min-height: 269px;
      background: #FFFFFF;
      box-shadow: 0 1px 5px 0 rgba(0,0,0,0.08);
      border-radius: 2px;
      .clear {
        padding-bottom: 20px;
      }
      .btn {
        text-align: right;
      }
      .table {
        padding-top: 20px;
      }
      .pagination {
        margin-top: 20px;
        text-align: right;
        /deep/ .number {
          background: #fff;
          border: 1px solid #eee;
        }
        /deep/ .btn-prev, .el-icon-more {
          background: #fff;
          border: 1px solid #eee;
        }
        /deep/ .el-icon-more {
          background: #fff;
          border: 1px solid #eee;
        }
        /deep/ .btn-next {
          background: #fff;
          border: 1px solid #eee;
        }
      }
    }
    .tip {
      width: 1200px;
      margin: 40px 0;
      height: 150px;
      background: #FFFFFF;
      box-shadow: 0 1px 5px 0 rgba(0,0,0,0.08);
      border-radius: 2px;
      padding: 30px 20px 20px 20px;
      p {
        font-size: 18px;
      }
      ul {
        font-size: 14px;
        margin-left: 20px;
        margin-top: 10px;
      }
    }
  }
</style>
