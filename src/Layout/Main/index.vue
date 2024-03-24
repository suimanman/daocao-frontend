<template>
    <el-tabs
    v-model="activeTab"
    type="card"
    closable
    class="demo-tabs"
    @tab-change="gotoTab"
    @tab-remove="closeTab"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
    >
    <RouterView/>
    </el-tab-pane>
  </el-tabs>
    
</template>

<script setup>
import { RouterView } from 'vue-router';
import {useMenuStore} from '@/stores/menu.js'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router=useRouter();
const menuStore=useMenuStore();
const {tabList,activeTab} = storeToRefs(menuStore);
function gotoTab(path){
    console.log("gotoTab--------",path);
    menuStore.setActive(path);
    router.push(path);
}
function closeTab(path){
    if(path == menuStore.activeTab){
        menuStore.setActive("/index");
        router.push("/index");
    }
    menuStore.deleteTabList(path);
}   
</script>

<style lang="scss" scoped>

</style>