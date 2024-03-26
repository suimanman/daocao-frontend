<template>
    <!-- 头部搜索框 -->
    <el-form :model="queryForm" inline="true">
        <el-form-item label="菜单名称">
            <el-input v-model="queryForm.menuName" />
        </el-form-item>
        <el-form-item label="权限名称">
            <el-input v-model="queryForm.perms" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleQuery">搜索</el-button>
            <el-button>重置</el-button>
        </el-form-item>
    </el-form>
    <!-- 功能按钮 -->
    <el-row :gutter="4">
        <el-col :span="6">
            <el-button type="primary" @click="handleAdd">新增</el-button>
            <el-button type="success" @click="handleEdit">修改</el-button>
            <el-button type="danger" @click="handleRemove">删除</el-button>
        </el-col>
    </el-row>
    <!-- 列表 -->
    <el-table :data="menuList" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="menuName" label="菜单名称" width="100" />
        <el-table-column prop="perms" label="权限名称" width="150" />
        <el-table-column prop="path" label="组件路径" width="170" />
        <el-table-column prop="componentPath" label="组件名称" width="120" />
        <el-table-column prop="createTime" label="创建时间" width="120" />
        <el-table-column prop="updateTime" label="修改时间" width="120" />
        <el-table-column prop="remark" label="备注" width="120" />
        <el-table-column label="操作" width="150">
            <template #default>
                <el-button link type="primary" size="small">新增</el-button>
                <el-button link type="success" size="small">修改</el-button>
                <el-button link type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="el-pagination_container">
        <el-pagination v-model:current-page="queryForm.pageNum" v-model:page-size="queryForm.pageSize"
            :page-sizes="[10, 20, 30, 40, 50]" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <!-- 新增和修改的弹窗 -->
    <el-dialog v-model="menuFormShow" :title="menuTitle" width="800" :before-close="handleClose">
        <el-form :model="form" label-width="auto" style="max-width: 1000px">
            <el-row :gutter="50">
                <el-col :span="12">
                    <el-form-item label="上级菜单" props="form.parentId">
                        <el-tree-select v-model="form.parentId" :data="menuSelectData" :render-after-expand="false"
                            placeholder="请选择上级菜单" style="width: 240px" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="菜单类型" props="form.menuType">
                        <el-select v-model="form.menuType" placeholder="请选择菜单类型" style="width: 240px">
                            <el-option v-for="item in menuTypeOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>

                </el-col>
            </el-row>
            <el-row :gutter="50">
                <el-col :span="12">
                    <el-form-item label="菜单图标" props="form.icon">
                        <el-input v-model="form.icon" placeholder="请选择菜单图标" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="菜单名称" props="form.manuName">
                        <el-input v-model="form.manuName" placeholder="请输入菜单名称" clearable />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="50">
                <el-col :span="12">
                    <el-form-item label="排序" props="form.sort">
                        <el-input-number v-model="form.sort" :min="0" @change="handleChange" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="路由地址" props="form.path">
                        <el-input v-model="form.path" placeholder="请输入路由地址" clearable />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="50">
                <el-col :span="12">
                    <el-form-item label="组件路径" props="form.componentPath">
                        <el-input v-model="form.componentPath" placeholder="请输入组件路径" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="权限标识" props="form.perms">
                        <el-input v-model="form.perms" placeholder="请输入权限标识" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="状态" props="form.status">
                <el-switch v-model="form.status" />
            </el-form-item>
            <el-form-item label="备注" props="form.remark">
                <el-input v-model="form.remark" placeholder="备注" clearable />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="menuFormShow = false">取消</el-button>
                <el-button type="primary" @click="menuFormShow = false">
                    提交
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
let total = ref(0)
let queryForm = ref({
    menuName: undefined,
    perms: undefined,
    pageNum: 1,
    pageSize: 10
})
let menuFormShow = ref(false);
let menuTitle = ref("")
let menuList = ref([
    {
        id: 1,
        menuName: '菜单管理',
        perms: 'system:menu:list',
        path: '/system/menu/list',
        componentPath: 'systemMenu',
        createTime: '2024-3-25 20:54:00',
        updateTime: '2024-3-25 20:54:00',
        remark: '备注',
        children: []
    },
    {
        id: 2,
        menuName: '菜单管理',
        perms: 'system:menu:list',
        path: '/system/menu/list',
        componentPath: 'systemMenu',
        createTime: '2024-3-25 20:54:00',
        updateTime: '2024-3-25 20:54:00',
        remark: '备注',
        children: []
    }
])
let form = ref({
    id: undefined,
    parentId: undefined,
    menuName: undefined,
    menuType: 0,
    sort: 0,
    path: undefined,
    componentPath: undefined,
    perms: undefined,
    icon: undefined,
    status: 0,
    remark: undefined
})
//树形选择器
let menuSelectData=ref([
    {
        value: '1',
        label: '系统管理',
        children: [
            {
                value: '1-1',
                label: '菜单管理',
                children: [
                    {
                        value: '1-1-1',
                        label: '新增',
                    },
                ],
            },
        ],
    },
    {
        value: '2',
        label: '工具管理',
        children: [
            {
                value: '2-1',
                label: '代码生成',
            }
        ],
    },
])
//菜单选择器
let menuTypeOptions=ref([
    {
        value:0,
        label:"目录"
    },
    {
        value: 1,
        label: "菜单"
    },
    {
        value: 2,
        label: "按钮"
    }
])
//搜索
function handleQuery() {

}
function handleSizeChange() {

}
function handleCurrentChange() {

}
//新增
function handleAdd() {
    menuFormShow.value = true;
    menuTitle.value = "新增菜单"
}
//修改
function handleEdit() {
    menuFormShow.value = true;
    menuTitle.value = "修改菜单"
}
//删除
function handleRemove() {

}
//关闭弹窗
function handleClose() {
    menuFormShow.value = false;
}
</script>
<style lang="scss" scoped>
.el-pagination_container {
    position: relative;
    height: 40px;
    margin-top: 12px;
}

.el-pagination {
    position: absolute;
    right: 50px;
}
</style>