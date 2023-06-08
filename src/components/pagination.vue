<template>
  <div class="pagination">
    <el-pagination 
      background
      layout="total, prev, pager, next"
      :total="props.total"
      :page-size="props.pageSize" 
      :current-page="props.currentPage"
      @current-change="changePage"
    />
  </div>
</template>
  
<script setup lang="ts">

const props = defineProps({
  total: Number,
  pageSize: Number,
  currentPage: Number,
});


const emits = defineEmits(['page-change']);

 const changePage = (currentPage: number) => {
  emits('page-change', currentPage);
}

</script>
  