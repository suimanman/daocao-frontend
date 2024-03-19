//请求接口
import request from "@/utils/request";

export function login(data){

    return request({
        url: '/auth/sys',
        method: 'POST',
        data: data
    })
}