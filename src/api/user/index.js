//请求接口
import request from "@/utils/request";

export function searchSelfRouter(){

    return request({
        url: '/sys/menu/self',
        method: 'GET'
    })
}