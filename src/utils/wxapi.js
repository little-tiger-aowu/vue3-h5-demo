import {wxShare} from "../api/share"
import wx from 'weixin-js-sdk'

export function wxShareFriend() {
    let dataUrl = {
        appId: "wxfb99f0fc1ca20ac0",
        shareUrl: window.location.href // 获取实时地址
    }
    wxShare(dataUrl).then(res => {

        if (res.code === 200) {
            let wxData = {}
            wxData = res.data
            wx.config({
                debug: false,  // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: wxData.appId, // 必填，服务号
                timestamp: wxData.timestamp, // 必填，生成签名的时间戳
                nonceStr: wxData.nonceStr, // 必填，生成签名的随机串
                signature: wxData.signature, // 必填，签名，见附录1
                jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
            });
            wx.ready(function () {
                // 隐藏分享链接
                wx.hideOptionMenu();
            });
        }
    })


}
