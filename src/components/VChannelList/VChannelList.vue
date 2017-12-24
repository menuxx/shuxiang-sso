<template>
  <div class="page-container">
    <el-button class="add-button" @click="toCreateVChannelForm" type="primary" icon="el-icon-circle-plus">添加渠道(推荐人)</el-button>
    <el-table
      :data="vChannels"
      border
      style="width: 100%">

      <el-table-column
        fixed
        prop="itemName"
        label="商品名称(书名)"
        width="100">
      </el-table-column>

      <el-table-column
        fixed
        prop="ownerName"
        label="大V名称"
        width="100">
      </el-table-column>

      <el-table-column
        prop="ownerAvatar"
        label="大V头像"
        width="100">
      </el-table-column>

      <el-table-column
        prop="expressFee"
        label="渠道邮费"
        width="100">
      </el-table-column>

      <el-table-column
        prop="payFee"
        label="渠道价格"
        width="100">
      </el-table-column>

      <el-table-column
        prop="stock"
        label="库存"
        width="100">
      </el-table-column>

      <el-table-column
        prop="giftTxt"
        label="赠言"
        width="100">
      </el-table-column>

      <el-table-column
        prop="itemName"
        label="开始时间"
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
        width="200">
        <template slot-scope="scope">
          <el-button @click.native="onShowShareImageDialog(scope.$index)" type="text" size="small">分享图片</el-button>
          <el-button @click.native="toVChannelOrderList(scope.$index)" type="text" size="small">查看订单</el-button>
          <el-button @click.native="toEditVChannelForm(scope.$index)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      title="扫描二维码，在微信中打开图片"
      :visible.sync="showShareImageDialog"
      width="80%"
      :before-close="handleShareImageDialogClose">
      <el-row>
        <el-col :span="10">
          <PhoneShareImage />
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="10">
          <qrcode value="http://www.baidu.com/" :options="{ size: 300 }"></qrcode>
        </el-col>
      </el-row>

    </el-dialog>

  </div>
</template>
<script>
  // https://github.com/xkeshi/vue-qrcode
  import Qrcode from '@xkeshi/vue-qrcode'
  import PhoneShareImage from './PhoneShareImage'
  import {loadChannels} from '../../http/api'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import * as types from '../../store/types'
  import store from '../../store'
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {
      ElCol,
      PhoneShareImage,
      Qrcode
    },
    methods: {
      ...mapMutations({
        vChannelsLoaded: types.V_CHANNELS_LOADED
      }),
      toVChannelOrderList(index) {
        var channel = this.vChannels[index]
        this.$router.push({ name: 'v_channel_orders', params: { channelId: channel.id } })
      },
      toEditVChannelForm(index) {
        var channel = this.vChannels[index]
        this.$router.push({ name: 'update_v_channel', params: { channelId: channel.id } })
      },
      toCreateVChannelForm(){
        this.$router.push({ name: 'create_v_channel' })
      },
      handleShareImageDialogClose() {
        this.showShareImageDialog = false
      },
      onShowShareImageDialog(index) {
        var channel = this.vChannels[index]
        this.showShareImageDialog = true
      }
    },
    beforeRouteEnter(to, from, next) {
      var {pageNum} = to.query
      loadChannels(pageNum).then( res => {
        next(vm => {
          vm.vChannelsLoaded(res.data)
        })
      })
    },
    computed: {
      ...mapState(['vChannels'])
    },
    data() {
      return {
        showShareImageDialog: false
      }
    }

  }
</script>
