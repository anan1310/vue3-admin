
<template>
  <h1>{{ msg }}</h1>
<!-- 具名插槽： -->
  <slot name="header" message="hello"></slot>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>


</template>

<script setup lang="ts">
import { ref} from 'vue'
/*
 defineProps<{
  msg:{
    type:String,
    required:true,
    default:'你好',
  }
}>()
*/
 
defineProps<{msg:String}>()


const count = ref(0)
</script>
<style scoped>

</style>
