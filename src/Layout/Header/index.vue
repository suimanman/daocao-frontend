<template>
    <div   class="header_container">
        <!-- 面包屑 -->
        <div class="header_left">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index">{{ item }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 右侧用户名、头像 -->
        <div class="header_right">
            <!-- 头像 -->
            <div class="avatar">
                <el-image style="width: 30px; height: 30px" :src="avatar" :fit="fit" />
            </div>
            <!-- 用户名 -->
            <div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                    {{nickname}}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                    </span>
                    <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const breadcrumbList=ref(['系统管理','用户管理'])
const userStore=useUserStore();
let {avatar,nickname}=storeToRefs(userStore);
</script>

<style lang="scss" scoped>

.header_container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    .header_right{
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
        .avatar{
            margin-right: 12px;
        }
        .el-dropdown-link{
            display: flex;
            align-items: center;
            border: none;
            outline: none;
        }
    }
}

</style>