<template>
  <div class="page-container">

    <el-alert
      title="确认配送后，会以短信方式通知订单收货人"
      type="success">
    </el-alert>

    <el-form ref="form" :model="formModel" label-width="80px">
      <el-form-item label="活动名称">
        <el-select v-model="formModel.channelName" placeholder="快递公司">
          <el-option v-for="(express, index) in expresses" :label="express.channelName" :value="index" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="快递编号">
        <el-input v-model="formModel.expressNo"></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
  import {loadExpresses} from '../../http/api'
  export default {
    data() {
      return {
        expresses: [],
        formModel: {
          expressNo: '',
          channelName: ''
        }
      }
    },
    created() {
      loadExpresses().then(res => {
        this.expresses = res.data
        this.formModel.channelName = res.data[0].channelName
      })
    },
    methods: {
      // 下载发货清单
      downDeliveryManifest() {

      }
    }
  }
</script>
