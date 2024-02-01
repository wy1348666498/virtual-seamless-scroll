<template>
  <h2>纵向滚动</h2>
  <div class="list-box">
    <VirtualSeamlessScroll :list="listData">
      <template #item="{ item }">
        <div class="i-item">
          <span>{{ item.index }}</span>
          <span>{{ item.name }}</span>
          <span>{{ item.num }}</span>
        </div>
      </template>
    </VirtualSeamlessScroll>
  </div>
  <h2>横向滚动</h2>
  <div class="list-box">
    <VirtualSeamlessScroll :list="listData" direction="horizontal">
      <template #item="{ item }">
        <div class="i-item i-item1">
          <span>{{ item.index }}</span>
          <span>{{ item.name }}</span>
          <span>{{ item.num }}</span>
        </div>
      </template>
    </VirtualSeamlessScroll>
  </div>
</template>

<script setup>
import { VirtualSeamlessScroll } from "../packages/index.js";
import { ref } from "vue";

let index = 1;
const listData = ref(
  Array.from({ length: 10000 }, () => ({
    index: index++,
    name: "虚拟列表无缝滚动组件",
    num: Math.floor(Math.random() * 10),
  }))
);
</script>

<style scoped>
.list-box {
  width: 300px;
  height: 200px;
}
.i-item {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
}
.i-item1 {
  height: 60px;
  line-height: 60px;
}
</style>
