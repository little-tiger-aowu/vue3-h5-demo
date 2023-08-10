import {XrequestInstance} from "@/utils/request";


// 用户授权登录
export function userLogin(data: any){
    return XrequestInstance.request({
        url: '/user/UserLogin',
        method: 'POST',
        data
    })
}

// 获取用户信息
export function getUserInfo(params:any){
    return XrequestInstance.request({
        url: '/user/currentUserInformation',
        method: 'GET',
        params
    })
}

// 用户是否已填写信息
export function isFillInfo(data:any){
    return XrequestInstance.request({
        url: '/user/validationUserInformation',
        method: 'POST',
        data
    })
}

// 获取题目
export function getTopicList(params:any) {
    return XrequestInstance.request({
        url: '/questions/listQuestions10',
        method: 'GET',
        params
    })
}

// 提交答案
export function getAnswer (data:any) {
    return XrequestInstance.request({
        url: '/questions/submitAnswer',
        method: 'POST',
        Accept: 'json',
        data
    })
}

// 抽奖
export function playPrize (data:any) {
    return XrequestInstance.request({
        url: '/prize',
        method: 'POST',
        data
    })
}

// 填写信息
export function addInfo(data:string) {
    return XrequestInstance.request({
        url:'/user/info',
        method: 'POST',
        Accept: 'json',
        data
    })
}

// 查询用户执行的状态
export function getUserStart (params:any) {
    return XrequestInstance.request({
        url: '/user/state',
        method: 'GET',
        params
    })
}
