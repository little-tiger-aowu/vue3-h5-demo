export interface IData<T = any> {
    code: number | string;
    message: string;
    success: boolean;
    data: T;
    totalRecord?: number
}
