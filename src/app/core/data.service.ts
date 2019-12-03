import { Injectable } from '@angular/core';

//Using the new HttpClientModule now. If you're still on < Angular 4.3 see the 
//data.service.ts file instead (simplify rename it to the name 
//of this file to use it instead)
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IEmployee, IOrder, IState, IPagedResults, ICustomerResponse, IPerfromance, IPerformanceResponse } from '../shared/interfaces';

@Injectable()
export class DataService {

    baseUrl: string = '/api/customers';
    baseStatesUrl: string = '/api/states';
    basePerformanceUrl: string = '/api/performance';

    constructor(private http: HttpClient) {

    }

    getCustomers(): Observable<IEmployee[]> {
        return this.http.get<IEmployee[]>(this.baseUrl)
            .pipe(
                map((customers: IEmployee[]) => {
                    this.calculateEmployeeOrderTotal(customers);
                    return customers;
                }),
                catchError(this.handleError)
            );
    }

    getEmployeePage(page: number, pageSize: number): Observable<IPagedResults<IEmployee[]>> {
        return this.http.get<IEmployee[]>(`${this.baseUrl}/page/${page}/${pageSize}`, { observe: 'response' })
            .pipe(
                map((res) => {
                    //Need to observe response in order to get to this header (see {observe: 'response'} above)
                    const totalRecords = +res.headers.get('x-inlinecount');
                    let customers = res.body as IEmployee[];
                    this.calculateEmployeeOrderTotal(customers);
                    return {
                        results: customers,
                        totalRecords: totalRecords

                    };
                }),
                catchError(this.handleError)
            );
    }

    getEmployee(id: string): Observable<IEmployee> {
        return this.http.get<IEmployee>(this.baseUrl + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    getPerformance(id: string): Observable<IPerfromance> {
        debugger
        return this.http.get<IPerfromance>(this.basePerformanceUrl + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }
    getPerformanceByEmpId(id: string): Observable<IPerfromance> {
        debugger
        return this.http.get<IPerfromance>(this.basePerformanceUrl + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    insertEmployee(customer: IEmployee): Observable<IEmployee> {
        return this.http.post<ICustomerResponse>(this.baseUrl, customer)
            .pipe(
                map((data) => {
                    console.log('insertCustomer status: ' + data.status);
                    return data.customer;
                }),
                catchError(this.handleError)
            );
    }
    insertEmpPerfromance(customer: IPerfromance): Observable<IPerfromance> {
        return this.http.post<IPerformanceResponse>(this.basePerformanceUrl, customer)
            .pipe(
                map((data) => {
                    console.log('insertCustomer status: ' + data.status);
                    return data.customer;
                }),
                catchError(this.handleError)
            );
    }

    updateEmployee(customer: IEmployee): Observable<IEmployee> {
        return this.http.put<ICustomerResponse>(this.baseUrl + '/' + customer._id, customer)
            .pipe(
                map((data) => {
                    console.log('updateCustomer status: ' + data.status);
                    return data.customer;
                }),
                catchError(this.handleError)
            );
    }

    updateEmpPerformance(customer: IPerfromance): Observable<IPerfromance> {
        return this.http.put<IPerformanceResponse>(this.basePerformanceUrl + '/' + customer._id, customer)
            .pipe(
                map((data) => {
                    console.log('updateCustomer status: ' + data.status);
                    return data.customer;
                }),
                catchError(this.handleError)
            );
    }

    deleteEmployee(id: string): Observable<boolean> {
        return this.http.delete<boolean>(this.baseUrl + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    getStates(): Observable<IState[]> {
        return this.http.get<IState[]>(this.baseStatesUrl)
            .pipe(
                catchError(this.handleError)
            );
    }

    calculateEmployeeOrderTotal(customers: IEmployee[]) {
        for (let customer of customers) {
            if (customer && customer.orders) {
                let total = 0;
                for (let order of customer.orders) {
                    total += (order.price * order.quantity);
                }
                customer.orderTotal = total;
            }
        }
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            let errMessage = error.error.message;
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }

}
