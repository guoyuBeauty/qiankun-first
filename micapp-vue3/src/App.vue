<template>
  <div id="app">
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#b3c0d1"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        style="width: 100%"
      >
        <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
          <template slot="title">
            <span> {{ item.navItem }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside>Aside</el-aside>
      <div id="container"></div>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex:this.$route.path,
      navList: [
        { name: "/micapp-vue1", navItem: "我的vue1" },
        { name: "/micapp-vue2", navItem: "我的vue2" },
      ],
    };
  },
  methods: {
    handleSelect(key) {
      // console.log(key, keyPath);
      this.activeIndex = key.toString();
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
body,
html,
#app {
  height: 100vh;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-container {
  height: calc(100% - 61px);
}
#container{
  width: calc(100% - 300px);
}
/* .el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>
