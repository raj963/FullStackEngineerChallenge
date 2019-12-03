import { ModuleWithProviders } from '@angular/core';

export interface IEmployee {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state?: IState;
    stateId?: number;
    zip: number;
    gender: string;
    orderCount?: number;
    orders?: IOrder[];
    orderTotal?: number;
    OtherEmpReview:any[]
}
export interface IPerfromance {
    _id?: string;
    empId: string;
    passion: number;
    Innovation: number;
    respect: number;
    leadership: number;
    codeQuality: number;
    personalUtilizatin: number;
    Productivity: number;
    empFeedback: string;
    
}


export interface IState {
    abbreviation: string;
    name: string;
}

export interface IOrder {
    product: string;
    price: number;
    quantity: number;
    orderTotal?: number;
}

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface ICustomerResponse {
    customer: IEmployee;
    status: boolean;
    error: string;
}

export interface IPerformanceResponse {
    customer: IPerfromance;
    status: boolean;
    error: string;
}