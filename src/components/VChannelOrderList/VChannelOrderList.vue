<template>
  <div class="page-container">

    <el-row>
      <el-col :span="5">
        <el-button class="add-button" @click.native="downDeliveryManifest" type="primary" icon="el-icon-download">发货清单下载</el-button>
      </el-col>
      <el-col :span="5">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :file-list="excelFiles">
          <el-button type="primary" icon="el-icon-upload">核销发货清单</el-button>
          <div slot="tip" class="el-upload__tip">只能上传.xslx文件，且不超过500kb</div>
        </el-upload>
      </el-col>
    </el-row>

    <el-table
      :data="vChannelOrders"
      border
      style="width: 100%">

      <el-table-column
        prop="queueNum"
        label="流水号"
        width="100">
      </el-table-column>

      <el-table-column
        prop="userName"
        label="用户名"
        width="100">
      </el-table-column>

      <el-table-column
        fixed
        prop="orderNo"
        label="订单编号"
        width="100">
      </el-table-column>

      <el-table-column
        prop="express"
        label="快递"
        width="100">
      </el-table-column>

      <el-table-column
        prop="orderName"
        label="订单名称"
        width="100">
      </el-table-column>

      <el-table-column
        prop="totalAmount"
        label="应付金额"
        width="100">
      </el-table-column>

      <el-table-column
        prop="payAmount"
        label="实付金额"
        width="100">
      </el-table-column>

      <el-table-column
        prop="count"
        label="数量"
        width="100">
      </el-table-column>

      <el-table-column
        prop="itemName"
        label="商品名称(书名)"
        width="100">
      </el-table-column>

      <el-table-column
        prop="updateAt"
        label="时间"
        width="100">
      </el-table-column>

      <el-table-column
        prop="endTime"
        label="结束时间"
        width="100">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button @click.native="onDoDelivery(scope.$index)" type="text" size="small">发货</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog
      title="输入配送信息"
      :visible.sync="showExpressDialog"
      width="30%"
      :before-close="handleExpressDialogClose">
      <ExpressForm />
      <span slot="footer" class="dialog-footer">
        <el-button @click="showExpressDialog = false">取 消</el-button>
        <el-button type="primary" @click="showExpressDialog = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import ExpressForm from './ExpressForm'
  import {loadChannelOrders} from '../../http/api'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import * as types from '../../store/types'
  import store from '../../store'
  export default {
    components: { ExpressForm },
    data() {
      return {
        excelFiles: [],
        showExpressDialog: false
      }
    },
    beforeRouteEnter(to, form, next) {
      var {channelId} = to.params
      var {pageNum} = to.query
      loadChannelOrders(channelId, pageNum).then( res => {
        next(vm => {
          vm.vChannelOrdersLoaded(res.data)
        })
      })
    },
    computed: {
      ...mapState(['vChannelOrders'])
    },
    methods: {
      ...mapMutations({
        vChannelOrdersLoaded: types.V_CHANNEL_ORDERS_LOADED
      }),
      handleExpressDialogClose() {

      },
      // 发货
      onDoDelivery(index) {
        var order = this.vChannelOrders[index]
        this.showExpressDialog = true
      }
    }
  }
</script>
