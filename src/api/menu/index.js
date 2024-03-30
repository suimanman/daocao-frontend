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
        url: '/sys/menu',
        method: 'POST',
        data:data
    })
}
//根据id查询菜单
export function searchMenuById(id) {

    return request({
        url: `/sys/menu/${id}`,
        method: 'GET',
    })
}
//修改菜单
export function updateMenu(data) {

    return request({
        url: '/sys/menu',
        method: 'PUT',
        data: data
    })
}
//删除菜单
export function removeMenu(ids) {

    return request({
        url: '/sys/menu',
        method: 'DELETE',
        data:ids
    })
}
