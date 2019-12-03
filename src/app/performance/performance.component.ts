import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data.service';
import { IEmployee, IOrder, IPagedResults } from '../shared/interfaces';

@Component({ 
  selector: 'app-performance', 
  templateUrl: './performance.component.html'
})
export class PerformanceComponent implements OnInit {

  title: string;
  employee: IEmployee[] = [];
  filteredEmployee: IEmployee[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private router: Router, 
              private dataService: DataService,
              private dataFilter: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'Employee';
    this.getEmployeePage(1);
  }

  filterChanged(filterText: string) {
    if (filterText && this.employee) {
        let props = ['firstName', 'lastName', 'address', 'city', 'state.name', 'orderTotal'];
        this.filteredEmployee = this.dataFilter.filter(this.employee, props, filterText);
    }
    else {
      this.filteredEmployee = this.employee;
    }
  }

  pageChanged(page: number) {
    this.getEmployeePage(page);
  }
  // getCustomersPage

  getEmployeePage(page: number) {
    this.dataService.getEmployeePage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<IEmployee[]>) => {
          this.employee = this.filteredEmployee = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => console.log(err),
        () => console.log('getCustomersPage() retrieved customers'));
  }

}