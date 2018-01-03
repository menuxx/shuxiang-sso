<template>
  <div class="page-container">
    <el-button class="add-button" @click="toGenerateTableCode" type="primary" icon="el-icon-circle-plus">批量生成桌码</el-button>
    <el-table
      :data="codeTasks"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.batches" style="width: 100%">
            <el-table-column
              label="数量"
              prop="count">
            </el-table-column>
            <el-table-column
              label="开始码"
              prop="startCode">
            </el-table-column>
            <el-table-column
              label="结束吗"
              prop="endCode">
            </el-table-column>
            <el-table-column
              label="批次号"
              prop="batchNum">
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="createAt">
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status == 2"
                  @click.native.prevent="downloadFile(scope.row)"
                  type="text"
                  size="small">
                  下载
                </el-button>
                <el-button v-if="scope.row.status == 1"
                  @click.native.prevent="onRefreshTaskStatus(scope.row)"
                  type="text"
                  size="small">
                  刷新
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        prop="remark">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createAt">
      </el-table-column>
    </el-table>

    <el-dialog
      title="生成书码"
      :visible.sync="generateFormDialog"
      width="30%">
      <el-form ref="genForm" :model="generateFormModel" :role="generateFormRole">
        <el-form-item label="数量" :label-width="'40'">
          <el-input-number v-model="generateFormModel.totalNum" :min="1" label="本次需要产生码的个数"></el-input-number>
        </el-form-item>
        <el-form-item label="备注" :label-width="'40'">
          <el-input v-model="generateFormModel.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="generateFormDialog = false">取 消</el-button>
        <el-button native-type="submit" type="primary" @click.native="onFormSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  import {mapMutations, mapActions, mapState} from 'vuex'
  import {getFilename} from '../../http/util'
  import {getMyAuthToken} from '../../http/auth'
  import {createItemCodeTask, loadCodeTasks} from '../../http/api'
  import * as types from '../../store/types'
  import download from 'downloadjs'
  import http from '../../http'
  export default {
    beforeRouteEnter(to, form, next) {
      loadCodeTasks().then( res => {
        next( vm => {
          vm.itemCodeTasksLoaded(res.data)
        })
      })
    },
    computed: {
      ...mapState(['codeTasks'])
    },
    data() {
      return {
        generateFormRole: {
          totalNum: [
            { required: true, message: '生成数量一定要有', trigger: 'blur' },
            { type: 'number', message: '生成数量一定要是大于1的数字', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注必填', trigger: 'blur' }
          ]
        },
        generateFormModel: {
          totalNum: 1, // 生成的数量
          remark: ''  // 生成任务备注
        },
        generateFormDialog: false
      }
    },
    methods: {
      ...mapActions(['getCodeTask']),
      ...mapMutations({
        itemCodeTasksLoaded: types.ITEM_CODE_TASKS_LOADED,
        itemCodeTaskUpdated: types.ITEM_CODE_TASK_UPADTED
      }),
      toGenerateTableCode(){
        this.generateFormDialog = true
      },
      downloadFile(batch) {
        fetch("/api/item_code/download/batch/" + batch.id, {
          headers: new Headers({
            'X-Authorization': 'token ' + getMyAuthToken()
          })
        }).then( res => {
          res.blob().then( body => {
            var filename = getFilename(res.headers.get("Content-Disposition"))
            var contentType = res.headers.get('Content-Type')
            download(body, filename, contentType)
          })
        })
      },
      onRefreshTaskStatus(index) {
        var task = this.codeTasks[index]
        this.getCodeTask(task.taskId)
      },
      onFormSubmit() {
        this.$refs.genForm.validate( valid => {
          if (valid) {
            var {totalNum, remark} = this.generateFormModel
            createItemCodeTask(totalNum, remark).then( res => {
              if ( res.data.code === 1 ) {
                var task = res.data.data
                this.$message.success('生成任务已派发，等待生成结果完成')
                this.generateFormDialog = false
                this.itemCodeTaskUpdated(task)
              }
            })
          } else {
            this.$message.error('检查表单填写请是否正确')
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
