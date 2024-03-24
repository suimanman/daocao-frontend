import { defineStore } from 'pinia';

export const useUserStore = defineStore('user',{
    //定义状态
    state: () => ({ 
        id:undefined,
        avatar:undefined,
        nickname:undefined

    }),
    //获取数据
    getters: {
      Number: (state) => state.id , 
      String: (state) => state.avatar , 
      String: (state) => state.nickname , 
    },

    //修改数据
    actions: {
      setUserInfo(data){
        this.id=data.id;
        this.avatar=data.avatar;
        this.nickname=data.nickname;
      }
      
    },
    //使用持久化
    persist: {
      enabled: true,
      storage: localStorage,
      key:'useInfo',
      path:['id','avatar','nickname']
    }
})