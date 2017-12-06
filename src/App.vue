<template>
  <el-container>
    <el-aside width="200px">
      <el-menu :router="true">
        <el-menu-item index="/"><i class="el-icon-menu"></i>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</el-menu-item>
        <el-menu-item index="/ChannelForm"><i class="el-icon-menu"></i>推广渠道</el-menu-item>
        <el-menu-item index="/ItemList"><i class="el-icon-menu"></i>推广渠道</el-menu-item>
        <el-menu-item index="/item"><i class="el-icon-menu"></i>推广渠道</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>标题</el-header>
      <el-main>
        <router-view ref="aaa"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {

  }
</script>


<style>
  html,body{
    margin: 0;
    padding: 0;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  body > .el-container {
    height: 100vh;
  }
</style>

