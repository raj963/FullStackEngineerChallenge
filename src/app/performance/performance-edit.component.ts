import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import { IEmployee, IState, IPerfromance } from '../shared/interfaces';
import { DataShareService } from '../core/data-share.service';

@Component({
  selector: 'app-performance-edit',
  templateUrl: './performance-edit.component.html'
})
export class PerformanceEditComponent implements OnInit {

  @Input() isAdminUser = true;

  performanceObj: IPerfromance = {
    empId: '',
    passion: 3,
    Innovation: 3,
    respect: 3,
    leadership: 3,
    codeQuality: 3,
    personalUtilizatin: 3,

    Productivity: 3,
    empFeedback: ''
  };
  states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  employe: any;
  performanceNotUpdated: boolean = false;
  isAdminUser2: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private dataShareService: DataShareService,
    private _location:Location) { }

  ngOnInit() {

    let employeeObj = Array.from(this.dataShareService.getEmployeeList().values())

    if (employeeObj.length) {
      this.dataShareService.setEmployeeList(null)

      if (employeeObj.length) {
        this.setPerformanceVal(employeeObj[0]);
      }
    } else {
      let id = this.route.snapshot.params['id'];
      if (id !== '0') {
        this.operationText = 'Update';
        this.getEmployee(id, this.setPerformanceVal.bind(this));
      }
    }
    this.isAdminUser2=!this.isAdminUser

  }
  private setPerformanceVal(employeeObj: any) {
    this.employe = employeeObj;
    this.performanceObj.empId = employeeObj['_id'];
    this.getEmpPerformance(this.performanceObj.empId);
  }

  getEmployee(id: any, callback) {
    this.dataService.getEmployee(id)
      .subscribe((customer: IEmployee) => {
        this.employe = customer;
        callback(this.employe);

      },
        (err: any) => console.log(err));
  }

  getEmpPerformance(id: string) {
    this.dataService.getPerformanceByEmpId(id)
      .subscribe((customer: IPerfromance) => {
        if (customer[0]) {
          this.performanceObj = customer[0];
          this.operationText = 'Update';
        } else {
          this.performanceNotUpdated = true
        }




      },
        (err: any) => console.log(err));
  }


  submit() {

    if (this.performanceObj._id) {

      this.dataService.updateEmpPerformance(this.performanceObj)
        .subscribe((customer: IPerfromance) => {
          if (customer) {
            // this.router.navigate(['/customers']);
            this._location.back()
          } else {
            this.errorMessage = 'Unable to save customer';
          }
        },
          (err: any) => console.log(err));

    } else {

      this.dataService.insertEmpPerfromance(this.performanceObj)
        .subscribe((employee: IPerfromance) => {
          if (employee) {
            // this.router.navigate(['/customers']);
            this._location.back()
          }
          else {
            this.errorMessage = 'Unable to add customer';
          }
        },
          (err: any) => console.log(err));
      alert('hi')
    }
  }

  cancel(event: Event) {
    event.preventDefault();
    // this.router.navigate(['/']);
    this._location.back()
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteEmployee(this.performanceObj._id)
      .subscribe((status: boolean) => {
        if (status) {
          // this.router.navigate(['/customers']);
          this._location.back()
        }
        else {
          this.errorMessage = 'Unable to delete customer';
        }
      },
        (err) => console.log(err));
  }

  onRate(ev, prop) {
    console.log(ev)
    this.performanceObj[prop] = ev.newValue

  }

  

}