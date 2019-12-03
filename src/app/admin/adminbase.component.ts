import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data.service';
import { IEmployee, IOrder, IPagedResults } from '../shared/interfaces';
import { DataShareService } from '../core/data-share.service';

@Component({
  selector: 'app-admin-base',
  templateUrl: './adminbase.component.html'
})
export class employeebaseComponent implements OnInit {
  @Input() empList:IEmployee[] ;
  @Input() performanceReviewOnly=false;
 
  title: string;
  employee: IEmployee[] = [];
  filteredEmployee: IEmployee[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;
  employeeObjEdit: IEmployee;
  errorMessage: string;
  disableFields: { firstname: boolean; lastname: boolean; address: boolean; city: boolean; state: boolean; performance: boolean; selectEmployee: boolean; selectReviewer: boolean; };

  constructor(private router: Router,
    private dataService: DataService,
    private dataFilter: DataFilterService,
    private dataShareService: DataShareService) { }

  ngOnInit() {
    this.title = 'Admin Screen';

    if(!(this.empList&&this.empList.length)){
      this.getEmployeePage(1);
    }else{
      this.employee = this.filteredEmployee =this.empList;

       
      this.totalRecords = this.empList.length;
    }
if(this.performanceReviewOnly){
  this.disableFields = {firstname:true,
    lastname:false,
    address:false,
    city:false,
    state:false,
    performance:false,
    selectEmployee:true,
    selectReviewer:true,

  };
}
   
    
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

  assignReview() {
    let employeeArray = Array.from(this.dataShareService.getEmployeeList().keys())
    let reviewerId: IEmployee = this.dataShareService.getReviewer()
    if (employeeArray.length && reviewerId) {


      this.employeeObjEdit = reviewerId;
      this.employeeObjEdit.OtherEmpReview = employeeArray;

      this.dataService.updateEmployee(this.employeeObjEdit)
        .subscribe((customer: IEmployee) => {
          if (customer) {
            this.dataShareService.setEmployeeList(null)
            this.dataShareService.setreviewerEmploye(null)
            alert('Review assign Completed successfully')

          } else {
            this.errorMessage = 'Review assign not Completed successfully';
            alert('Review assign not Completed successfully')

          }
        },
          (err: any) => console.log(err));
    } else {
      alert('please select atleast one employee and a reviewer')
    }

  }

}