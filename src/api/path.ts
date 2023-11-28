import {XrequestInstance} from '@/utils/request'
// @ts-ignore

import {LoginType} from "@/type";

// 用户登录
export function userLogin(data: string) {
    return XrequestInstance.request({
        url: '/authorization/login',
        method: "POST",
        Accept: 'json',
        data
    })
}

// 阶段详情
export function getListById(data: string) {
    return XrequestInstance.request({
        url: '/content/getNewsById',
        method: 'POST',
        Accept: 'json',
        data
    })
}

// 获取评论列表
export function getCommentsList(data: string) {
    return XrequestInstance.request({
        url: '/interaction/getInteractionList',
        method: 'POST',
        Accept: 'json',
        data
    })
}

// 发布评论
export function addComments(data: string) {
    return XrequestInstance.request({
        url: '/interaction/addInteraction',
        method: 'POST',
        Accept: 'json',
        data
    })
}

// 评论点赞
export function listComments(data: string) {
    return XrequestInstance.request({
        url: '/interaction/putLike',
        method: 'POST',
        Accept: 'json',
        data
    })
}

// 提交表单
export function addForm(data: string) {
    return XrequestInstance.request({
        url: '/from/addForm',
        method: 'POST',
        Accept: 'json',
        data
    })
}

// 邀请排行榜
export function inviteRanking() {
    return XrequestInstance.request({
        url: '/ranking/getInviteRankingList',
        method: 'POST',
        Accept: 'json',
    })
}

// 点赞排行榜
export function likeRanking() {
    return XrequestInstance.request({
        url: '/ranking/getLikeRankingList',
        method: 'POST',
        Accept: 'json',
    })
}

// 获取分期
export function stageList() {
    return XrequestInstance.request({
        url: '/stageConfig/getStageList',
        method: 'POST',
        Accept: 'json',
    })
}

