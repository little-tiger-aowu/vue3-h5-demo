interface IData<T = any> {
    code: number;
    msg: string;
    success: boolean;
    data: T;
}
export type { IData };
