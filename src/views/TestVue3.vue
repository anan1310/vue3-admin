<template>

<div class="container">
  你好：<input type="text" v-model="msg">
  <HelloWorld :msg="msg" >
    <!-- 使用具名插槽 -->
    <template #header="{message}">
      {{ message}}
    </template>
    </HelloWorld>
    <el-button type="primary">Primary</el-button>
</div>
</template>

<script setup lang="ts">
import HelloWorld from "../components/HelloWorld.vue";
import { ref} from 'vue'
const msg = ref("vue3你好")
</script>

<style scoped>

</style>