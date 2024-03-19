<template>
    <!-- 根div -->
    <div class="login_container">
        <!-- 登录表单 -->
        <div class="login_form">
            <h3 class="title">稻草快速开发平台</h3>
            <el-form ref="formRef" :model="loginForm" label-width="auto"> 
                <el-form-item>
                    <!-- 用户名 -->
                    <el-input v-model="loginForm.account"     placeholder="请输入账号">
                        <template #prefix>
                            <el-icon><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <!-- 用户名 -->
                    <el-input v-model="loginForm.password" type="password"     placeholder="请输入密码">
                        <template #prefix><el-icon><Lock /></el-icon></template>
                    </el-input>
                </el-form-item>
                <!-- 记住我 和 忘记密码-->
                <div class="rememberMe">
                    <el-checkbox v-model="loginForm.rememberMe" label="记住我" size="large" />
                    <!-- 忘记密码 -->
                    <el-text class="forgetpass mx-1" type="primary">忘记密码？</el-text>
                </div>
                <!-- 分割线 -->
                <el-divider >其他登录方式</el-divider>
                <!-- 其他登录方式 -->
                <div class="other_login">
                    <el-icon class="other_login_item"><ChromeFilled /></el-icon>
                    <el-icon class="other_login_item"><ElemeFilled /></el-icon>
                    <el-icon class="other_login_item"><Shop /></el-icon>
                </div>
                <el-form-item>
                    <!-- 按钮 -->
                    <el-button style="width: 100%;" type="primary" @click="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
            
            
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const loginForm=ref({
    account: undefined,
    password: undefined,
    rememberMe: undefined
})
function handleLogin(){
    
}

</script>

<style lang="scss" scoped>
.login_container{
    //背景图
    background-image: url('../assets/bgimg/3.png');
    background-size: 100%;
    height: 100vh;
    display: flex;
    justify-content: flex-end;
    .login_form{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 50%;
        background-color: #FFFFFF;

        .title{
            margin-bottom: 20px;
        }
        .rememberMe{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .forgetpass{
                cursor: pointer;
            }
        }
        .other_login{
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            .other_login_item{
                margin-right: 60px;
                cursor: pointer;

            }
        }
    }
}
//设置form的宽度
.el-form{
    width: 60%;
}
el-form-item{
    width: 100%;
}
</style>