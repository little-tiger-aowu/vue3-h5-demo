export interface formType {
    userName: string; // 用户名
    phone: string; // 手机号码
    Mailbox: string; // 电子邮件
    unitName: string; // 单位名称
    position: string; // 职位
    positionOther: string; //其他职位
    purchaselan1: string; // 扫描电镜采购计划
    purchaselan2: any; // 其他类镜采购计划
    purchaselan2Other: string; // 其他类镜采购计划其他
    productInfo: boolean; // 是否需要产品资料
    parameterTable: boolean; // 是否需要参数表
    contactMe: boolean; // 是否需要联系我
}

export interface LoginType {
    helpUserOpenId?: string; // 被邀请人open_id
    inviteUserOpenId?: string; // 邀请人open_id
    openId: string;	// 用户openId/被邀请人id
    wxHeadPortrait: string // 微信头像
    wxNickname: string // 微信昵称
}
