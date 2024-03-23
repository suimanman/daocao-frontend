<template>
    <div>
        <el-menu
            background-color="#304157"
            text-color="#b1becd"
            active-text-color="#336cab"
        >
            <!-- 遍历子元素 -->
            <template v-for="menu in menuList" :key="menu.path">
                <!-- 判断是否有子菜单 -->
                <el-sub-menu v-if="hasChildren(menu)" :index="menu.path">
                    <template #title>
                        <svg-icon
                            v-if="menu.icon"
                            slot="prefix"
                            :name="menu.icon"
                            width="20px"
                            height="20px"
                        />
                        <span>{{ menu.menuName }}</span>
                    </template>
                    <!-- 渲染子菜单 -->
                    <el-menu-item-group>
                        <el-menu-item 
                        v-for="children in menu.children" 
                        :index="children.path"
                        @click="handleRouter(children)">
                        <svg-icon
                            v-if="children.icon"
                            slot="prefix"
                            :name="children.icon"
                            width="20px"
                            height="20px"
                        />
                        <span>{{ children.menuName }}</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <!-- 没有子菜单 -->
                <el-menu-item v-else :index="menu.path" @click="handleRouter(menu)">
                    <svg-icon
                            v-if="menu.icon"
                            slot="prefix"
                            :name="menu.icon"
                            width="20px"
                            height="20px"
                        />
                    <span>{{ menu.menuName }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
  
</template>
  
<script setup>
  //获取所有菜单，在pinia中
  import {useMenuStore} from '@/stores/menu.js'
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  const router=useRouter();
  const menuStore=useMenuStore();
  const {menuList} = storeToRefs(menuStore);
  console.log("menulist-------------",menuList);


  //判断有无子菜单
  function hasChildren(menu){
    if(menu.children && menu.children.length > 0){
        return true;
    }
    return false;
  }
  //点击切换路由
  function handleRouter(menu){
    router.push(menu.path)
  }
</script>
  
<style lang="scss" scoped>
  
</style>