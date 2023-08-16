import axios from 'axios';
import {Toast} from 'vant'
// import { getToken } from '@/utils/auth';
import qs from 'qs';
// import '@varlet/ui/es/style.js';
// import router from '@/router'

const service = axios.create({

    baseURL: 'https://wx.oauth.synconize.com/',

    timeout: 50000, // 请求超时时间
    transformRequest: [function (data) {
        if (Object.prototype.toString.call(data) === '[object FormData]') {
            return data
        }
        data = qs.stringify(data);
        return data;
    }]
});

// request拦截器
service.interceptors.request.use(
    config => {
        config.headers['Synco-Wx-Token'] = '51491661055fe1ab466ed45b17b2cf55d702fc5a4f2ea35e724282cd77ef22b0';
        return config;
    },
    error => {
        // Do something with request error
        console.log(error); // for debug
        Promise.reject(error);
    }
);

let toastFail, errorFail;
// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;

        return response.data;
    },
    error => {
        if (errorFail) {
            errorFail.clear();
        }
        console.dir('789', error); // for debug
        // errorFail = Toast.error('网络超时！')
        return Promise.reject(error);
    }
);

export default service;
