import request from "@/utils/request/request";

export function getLogin (data:any) {
    return request({
       url: '',
       method: 'get',
       data
    })
}
