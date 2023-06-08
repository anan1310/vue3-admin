<template>
	<!-- 导航栏 -->
	<v-header />
	<!-- 侧边栏 -->
	<v-sidebar />
	<!-- 内容区：指定了固定的类名 "content-box"，使用了动态类绑定，
    如果 sidebar.collapse 为 true，否则会添加类名 'content-collapse'，否则移除该类名。 -->
	<!-- <Transition> 仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素。即需要增加一个<div></div> -->
	<div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
		<v-tags />
		<div class="content">
			<router-view v-slot="{ Component }">
				<transition name="move" mode="out-in">
					<keep-alive :include="tags.nameList">
						<component :is="Component"></component>
					</keep-alive>
				</transition>
			</router-view>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useSidebarStore } from '../store/sidebar';
import { useTagsStore } from '../store/tags'
import VHeader from '../components/header.vue'
import VSidebar from '../components/sidebar.vue'
import vTags from '../components/tags.vue';
const sidebar = useSidebarStore();
const tags = useTagsStore();

</script>

<style scoped></style>