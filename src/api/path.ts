import {XrequestInstance} from "@/utils/request";

// 用户授权登录
export function userLogin(data: any) {
    return XrequestInstance.request({
        url: '/user/info/login',
        method: 'POST',
        data
    })
}

// 获取用户信息
export function getUserInfo(data: any) {
    return XrequestInstance.request({
        url: '/user/info/getFrom',
        method: 'POST',
        Accept: 'form',
        data
    })
}

// 用户是否已抽奖
export function isDrawPrize(data: any) {
    return XrequestInstance.request({
        url: '/user/info/isFillForm',
        method: 'POST',
        Accept: 'form',
        data
    })
}

// 用户是否已填写信息
export function isFillInfo(data: any) {
    return XrequestInstance.request({
        url: '/user/info/isFrom',
        method: 'POST',
        Accept: 'form',
        data
    })
}

// 查询用户执行的状态
export function getUserStart(params: any) {
    return XrequestInstance.request({
        url: '/user/state',
        method: 'GET',
        params
    })
}

// 填写信息
export function addInfo(data: string) {
    return XrequestInstance.request({
        url: '/user/info',
        method: 'POST',
        Accept: 'json',
        data
    })
}

// 获取奖品
export function getPrizeList() {
    return XrequestInstance.request({
        url: '/prize/lucky',
        method: 'GET',
    })
}

// 抽奖
export function playPrize(data: any) {
    return XrequestInstance.request({
        url: '/prize/lucky',
        method: 'POST',
        Accept: 'form',
        data
    })
}

// 查看抽奖记录
export function getRecord(data: any) {
    return XrequestInstance.request({
        url: '/prize/lucky/record',
        method: 'POST',
        Accept: 'form',
        data
    })
}
