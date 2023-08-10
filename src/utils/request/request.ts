import axios from "axios";
// import LocalCache from "@/utils/cache";
import type {AxiosRequestConfig, AxiosInstance, Canceler} from "axios";
import type {IData} from "@/type/request";
import router from '@/router'

const cancelToken = axios.CancelToken;

interface XrequestConfig extends AxiosRequestConfig {
    Accept?: string;
    repeatRequest?: boolean;
    isFormData?: boolean;
}

function objectToFormData(obj: Record<string, any>) {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
        formData.append(key, obj[key]);
    });
    return formData;
}

class Xrequest {
    instance: AxiosInstance;
    cancel?: Canceler;

    constructor(config: any) {
        this.instance = axios.create(config);
        this.instance.interceptors.request.use(
            // @ts-ignore
            (config: XrequestConfig) => {
                this.cancel && this.cancel();
                const token = localStorage.getItem('token')
                if (token) {
                    config.headers!.Authorization = `${token}`;
                }
                if (config.Accept === 'json') {
                    config.headers!['Content-Type'] = 'application/json'
                } else {
                    config.headers!['Content-Type'] = "application/x-www-form-urlencoded"
                }
                if (config.repeatRequest) {
                    config.cancelToken = new cancelToken((c) => {
                        this.cancel = c;
                    });
                }
                if (config.isFormData) {
                    config.data = objectToFormData(config.data);
                }
                return config;
            },
            (err) => {
                console.log("发送请求错误：", err);
                return err;
            }
        );
        this.instance.interceptors.response.use(
            (res) => {
                if (res.data.code === 10001) {
                    router.push({path: '/'})
                    return
                } else {
                    return res.data;
                }


            },

            (err) => {
                // 对响应错误做点什么
                if (err.message.indexOf("timeout") != -1) {
                    console.error("网络超时");
                } else if (err.message == "Network Error") {
                    console.error("网络连接错误");
                } else {
                    console.error(err.response);
                }
                return Promise.reject(err);
            }
        );
    }

    // 可以传入泛型   告诉ts内部的数据是传入的T的类型
    // 第二个才是response的返回  才需要我们传入的泛型
    request<T = any>(config: { Accept?: string; method: string; data?: any; params?: any; url: string }) {
        return this.instance.request<any, IData<T>>(config);
    }
}

export default Xrequest;
