//请求接口
import request from "@/utils/request";

export function searchMenuList() {

    return request({
        url: '/sys/menu/list',
        method: 'GET'
    })
}