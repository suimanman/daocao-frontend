//请求接口
import request from "@/utils/request";
//查询用户菜单
export function searchMenuList() {

    return request({
        url: '/sys/menu/list',
        method: 'GET'
    })
}
//新增菜单
export function saveMenu(data) {

    return request({
        url: '/sys/menu/list',
        method: 'POST',
        data:data
    })
}
