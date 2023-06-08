<template>
    <div>
        <!-- 添加具名插槽 -->
        <el-table :data="items"  stripe border table-layout="fixed">
          <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" />
        <slot name="default" ></slot>
			</el-table> 
    </div>
</template>

<script setup lang="ts">

interface ChildTableData {
  items: any,
  columns: any
}

defineProps<ChildTableData>();

</script>