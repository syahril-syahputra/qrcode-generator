export interface ICreateCoupon {
    number: string;
    value: number;
    consumer: string;
    startDate: Date;
    expiredDate: Date;
}
export interface IListCoupon {
    id: string;
    consumer: string;
    value: number;
    number: string;
    startDate: string | null;
    createdAt: string;
    expiredDate: string | null;
    useDate: string | null;
}
export interface ICouponFilter {
    number: string;
    consumer: string;
}
export interface ICoupon {
    id: string;
    createdAt: string; // atau: Date, jika kamu parse jadi objek Date
    updatedAt: string; // atau: Date
    number: string;
    consumer: string;
    startDate: string; // atau: Date
    expiredDate: string; // atau: Date
    value: number;
    useDate: string | null;
}
