<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
					<el-option key="1" label="广东省" value="广东省"></el-option>
					<el-option key="2" label="湖南省" value="湖南省"></el-option>
				</el-select>
				<el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
				<el-button type="primary" @click="serch">搜索</el-button>
				<el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>

			</div>
			<!--表格内容  -->
			<v-table :items="tableData" :columns="tableColumns">
				<el-table-column label="操作" width="220" align="center">
					<!-- 使用具名插槽：如果默认就是default  #default="scope" 默认是这样的
					 #default="{$index,row}"
					-->
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
							编辑
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)" v-permiss="16">
							删除
						</el-button>
					</template>
				</el-table-column>
				<!-- </template> -->
			</v-table>
			<!-- 分页 -->
			<v-pagination :total="pageTotal" :page-size="query.pageSize" :current-page="query.pageIndex"
				@page-change="onPageChange" />

		</div>
		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible">
			<el-form label-position="right" label-width="100px" :model="form" style="max-width: 460px">
				<el-form-item label="姓名">
					<el-input v-model="form.name" />
				</el-form-item>
				<el-form-item label="地区">
					<el-input v-model="form.address" />
				</el-form-item>
				<el-form-item label="时间">
					<el-input v-model="form.data" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>

		</el-dialog>
		<!-- 新增弹出框 -->
		<el-dialog title="新增" v-model="addVisible">
			<el-form label-position="right" label-width="100px" :model="form" style="max-width: 460px">
				<el-form-item label="姓名">
					<el-input v-model="form.name" />
				</el-form-item>
				<el-form-item label="地区">
					<el-input v-model="form.address" />
				</el-form-item>
				<el-form-item label="时间">
					<el-input v-model="form.data" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addVisible = false">取 消</el-button>
					<el-button type="primary" @click="addEdit">确 定</el-button>
				</span>
			</template>

		</el-dialog>

	</div>
</template>

<script setup lang="ts" name="basetable">
import { reactive, ref } from 'vue'
import VPagination from '../components/pagination.vue'
import VTable from '../components/table.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Edit, Plus, User } from '@element-plus/icons-vue';



//1、定义用户接口
interface User {
	date: string
	name: string,
	address: string
}

const editVisible = ref<boolean>(false)
const addVisible = ref<boolean>(false)
const pageTotal = ref(0)
// 2、返回数据
const tableData: User[] = reactive([
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
])
// 列名
const tableColumns = [
	{ prop: 'date', label: 'Date' },
	{ prop: 'name', label: 'Name' },
	{ prop: 'address', label: 'Address' },
];
//定义基本内容
const query = reactive({
	address: '',
	name: '',
	pageIndex: 1,
	pageSize: 10
});
//编辑时的数据
const form = reactive({
	data: "",
	name: "",
	address: ""

})
const onPageChange = (currentPage: number) => {
	query.pageIndex = currentPage
}
//新增
const handleAdd = () => {
	addVisible.value = true
}
//新增之后保存数据
const addEdit = () => {
	const newUser = {
		"name": form.name,
		"address": form.address,
		"date": form.data
	};

	tableData.push(newUser)
	addVisible.value = false
}
let idx: number = -1;
//编辑:数据回显
const handleEdit = (index: number, row: User) => {
	editVisible.value = true
	form.name = row.name;
	form.address = row.address;
	form.data = row.date
	idx = index
}
//编辑完成后保存数据
const saveEdit = () => {
	//通过编辑之后的索引进行保存数据
	tableData[idx].name = form.name
	tableData[idx].address = form.address
	tableData[idx].date = form.data
	editVisible.value = false; //编辑成功关闭模态框
	ElMessage.success("修改成功")
}

//删除
const handleDelete = (i: number) => {

	ElMessageBox.confirm(
		'确定要删除吗？',
		'提示',
		{
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
			draggable: false, //如果为true可依拖拽
		}
	)
		.then(() => {
			tableData.splice(i, 1);
			pageTotal.value = tableData.length
			ElMessage({
				type: 'success',
				message: '删除成功',
			})
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '删除失败',
			})
		})
}
//获取
function getData() {
	pageTotal.value = tableData.length
}
const serch = ()=>{

}
//调用获取函数，在setup中生命钩子最先执行
getData()

</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
}

.table {
	width: 100%;
	font-size: 14px;
}

.red {
	color: #F56C6C;
}

.mr10 {
	margin-right: 10px;
}

.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>
