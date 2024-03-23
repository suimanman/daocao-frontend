//存储token
export function setToken(tokenkey,token){
    return sessionStorage.setItem(tokenkey,token);

}

//获取token
export function getToken(tokenkey){
    return sessionStorage.getItem(tokenkey);

}
// 移除token
export function removeToken(tokenkey){
    if(getToken(tokenkey)){
        return sessionStorage.removeItem(tokenkey)
    }

    return null;

}