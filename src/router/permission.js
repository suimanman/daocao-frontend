//导入 router下的index.js
import router from './index.js'
//导入stores.menu.js
import { useMenuStore } from '@/stores/menu.js' 
import Layout from '@/Layout/index.vue'
//设置路由白名单
const whiteRouter = ['/','/login','/error','/404']

//全局前置路由守卫
router.beforeEach((to,from,next) =>{
    //使用pinia
    const menuStore=useMenuStore();
    //判断 to 是否处于白名单
    if(whiteRouter.indexOf(to.path) == -1){
        //判断routerList中是否有动态路由的数据
        if(menuStore.routerList.length == 0 ){
            //设置动态路由数据结构，并且添加到路由中
            menuStore.generateRouter().then(() => {
                //添加动态路由
                const routerList=menuStore.routerList;
                //所有页面都加载到Layout/Main的Routerview中
                router.addRoute({
                    component: Layout,
                    path: '/',
                    redirect:'index',
                    children: routerList
                })
                //跳转页面
                next({...to,replace:true});
            })
        }else {
            //已经有动态路由了
            //情况1:路由的路径是合法的
            if(to.matched.length != 0){
                next();
            }else{
                //2：路由的页面没有
                next('/404');
            }
            

        }
    }else{
        //  直接放行
        next();
    }
})