<template>
  <div class="container">

    <el-button class="add-button" @click="toCreateItemForm" type="primary" icon="el-icon-circle-plus">添加商品(书籍)</el-button>

    <el-table
      :data="items"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="商品名称"
        width="100">
      </el-table-column>

      <el-table-column
        prop="isbn"
        label="ISBN"
        width="80">
      </el-table-column>

      <el-table-column
        prop="press"
        label="出版社"
        width="150">
      </el-table-column>

      <el-table-column
        prop="authors"
        label="作者"
        width="100">
      </el-table-column>

      <el-table-column
        prop="translator"
        label="译者"
        width="100">
      </el-table-column>

      <el-table-column
        prop="describe"
        label="描述"
        width="250">
      </el-table-column>

      <el-table-column
        prop="shopUrl"
        label="商品链接"
        width="100">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click.native="onEditItem(scope.$index)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import {loadItems} from '../../http/api'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import * as types from '../../store/types'
  import store from '../../store'
  export default {
    methods: {
      ...mapMutations({
        itemsLoaded: types.ITEMS_LOADED
      }),
      toCreateItemForm(){
        this.$router.push({ name: 'create_item' })
      },
      onEditItem(index) {
        var item = this.items[index]
        this.$router.push({ name: 'update_item', params: { itemId: item.id } })
      }
    },
    beforeRouteEnter(to, from, next) {
      var {pageNum} = to.query
      loadItems(pageNum).then( res => {
        next(vm => {
          vm.itemsLoaded(res.data)
        })
      })
    },
    computed: {
      ...mapState(['items'])
    },
    data() {
      return {
      }
    }
  }
</script>


<style scoped>

  .add-button{
    margin-bottom: 20px;
  }


  .container {

  }
</style>

