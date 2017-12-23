<template>
  <div class="container">
    <el-button class="add-button" @click="toCreateItemForm" type="primary" icon="el-icon-circle-plus">添加商品(书籍)</el-button>
    <el-table
      :data="tableData"
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
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  export default {
    methods: {
      toCreateItemForm(){
        this.$router.push({ name: 'create_item' })
      }
    },
    data() {
      return {
        tableData: [{
          name: '《活着》',
          isbn: 'isbn',
          press: '新华出版社',
          authors: '悦瑞英',
          translator: '尹昶胜',
          describe: '例如：读这本书收获的不仅是...',
          shopUrl: 'www.baidu.com'
        }, {
          name: '《活着》',
          isbn: 'isbn',
          press: '新华出版社',
          authors: '悦瑞英',
          translator: '尹昶胜',
          describe: '例如：读这本书收获的不仅是...',
          shopUrl: 'www.baidu.com'
        }, {
          name: '《活着》',
          isbn: 'isbn',
          press: '新华出版社',
          authors: '悦瑞英',
          translator: '尹昶胜',
          describe: '例如：读这本书收获的不仅是...',
          shopUrl: 'www.baidu.com'
        }, {
          name: '《活着》',
          isbn: 'isbn',
          press: '新华出版社',
          authors: '悦瑞英',
          translator: '尹昶胜',
          describe: '例如：读这本书收获的不仅是...',
          shopUrl: 'www.baidu.com'
        }, {
          name: '《活着》',
          isbn: 'isbn',
          press: '新华出版社',
          authors: '悦瑞英',
          translator: '尹昶胜',
          describe: '例如：读这本书收获的不仅是...',
          shopUrl: 'www.baidu.com'
        }, {
          name: '《活着》',
          isbn: 'isbn',
          press: '新华出版社',
          authors: '悦瑞英',
          translator: '尹昶胜',
          describe: '例如：读这本书收获的不仅是...',
          shopUrl: 'www.baidu.com'
        }]
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

