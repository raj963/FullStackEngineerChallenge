import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Location} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import { IEmployee, IState } from '../shared/interfaces';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit {

  @Input() accessMethodDel = true
  @Output() employeeData = new EventEmitter();
  

  employee: IEmployee = {
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    email: '',
    city: '',
    zip: 0,
    OtherEmpReview:[]
  };
  states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: DataService,
              private _location:Location) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getEmployee(id);
    }

    this.getStates();
  }

  getEmployee(id: string) {
      this.dataService.getEmployee(id)
        .subscribe((customer: IEmployee) => {
          this.employee = customer;
          this.employeeData.emit(this.employee)
        },
        (err: any) => console.log(err));
  }

  getStates() {
    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }
  
  submit() {

      if (this.employee._id) {

        this.dataService.updateEmployee(this.employee)
          .subscribe((customer: IEmployee) => {
            if (customer) {
              // this.router.navigate(['/customers']);
              this._location.back()
            } else {
              this.errorMessage = 'Unable to save customer';
            }
          },
          (err: any) => console.log(err));

      } else {

        this.dataService.insertEmployee(this.employee)
          .subscribe((employee: IEmployee) => {
            if (employee) {
              // this.router.navigate(['/customers']);
              this._location.back()
            }
            else {
              this.errorMessage = 'Unable to add customer';
            }
          },
          (err: any) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    // this.router.navigate(['/']);
    this._location.back()
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteEmployee(this.employee._id)
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

}