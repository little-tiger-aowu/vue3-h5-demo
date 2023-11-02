import Xrequest from "./request";


export const XrequestInstance = new Xrequest({
    timeout: 6000,
    baseURL: 'http://thermofisher.thumbs.al-ecs.synconize.cn/api',
});
