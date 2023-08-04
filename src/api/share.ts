// @ts-ignore
import requestWx from "../utils/requestWx"

// 获取微信签名
export function wxShare(params: any) {
    return requestWx({
        url: `/share/`,
        method: 'GET',
        params
    })
}
