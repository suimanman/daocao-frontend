import { defineStore } from 'pinia';
//导入查询用户菜单接口
import { searchSelfRouter } from "@/api/user";

export const useMenuStore = defineStore('menu',{
    //定义状态
    state: () => ({ 
        menuList:[],
        routerList:[], //动态路由数据，也就是左侧菜单的路由信息
        tabList:[{title:'首页',path:'/index'}],//所有Tab
        activeTab: '/index'//当前选中Tab
    }),
    //获取数据
    getters: {
      Array: (state) => state.menuList ,
      Array: (state) => state.routerList ,
      Array: (state) => state.tabList ,
      String: (state) => state.activeTab , 
    },

    //修改数据
    actions: {
      setMenuList(data){
        console.log("setMenuList============>",data);
        this.menuList=data;
      },
      //渲染动态路由数据结构，存储到pinia中，不需要每次都渲染
      setRouterList(data){
        data.forEach(item => {
          let routerInfo={
            name:item.menuName,
            path:item.path,
            meta:{title:item.menuName},
            //设置组件
            component: () => import(/*@vite-ignore */`../views/${item.path}.vue`)
          }
          //将路由信息添加到数组中
          this.routerList.push(routerInfo)
          //设置子菜单
          let childrenList=item.children;
          childrenList.forEach(children => {
            let routerInfo={
              name:children.menuName,
              path:children.path,
              meta:{title:children.menuName},
              //设置组件
              component: () => import(/*@vite-ignore */`../views/${children.path}.vue`)
            }
            this.routerList.push(routerInfo)
          });
        });
      },
      //查询用户菜单，生成动态路由的数据结构
      generateRouter(){
        return new Promise((resolve,reject) => {
          //查询用户菜单
          searchSelfRouter().then(res => {
            if(res.data.code == 200 ){
              this.setRouterList(res.data.data);
              resolve();
            }
            reject();
          })
        })
      },
      //设置TabList
      setTabList(data){
        this.tabList.push(data);
      },
      //删除tabList
      deleteTabList(name){
        this.tabList=this.tabList.filter(item => {
          if(item.path==name){
            return false;
          }else
          {
            return true;
          } 
        })
      },
      //设置activeTab
      setActive(name){
        this.activeTab = name;
      }
    }
    //使用持久化
    // persist: {
    //   enabled: true,
    //   storage: localStorage,
    //   key:'useMenu',
    //   path:['menuList','routerList']
    // }
})