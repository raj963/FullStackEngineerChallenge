import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../core/data.service';
import { IEmployee, IState } from '../shared/interfaces';
import { ValidationService } from '../shared/validation.service';

@Component({
  selector: 'app-customer-edit-reactive',
  templateUrl: './customer-edit-reactive.component.html'
})
export class CustomerEditReactiveComponent implements OnInit {

  customerForm: FormGroup;
  customer: IEmployee = {
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
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getCustomer(id);
    }

    this.getStates();
    this.buildForm();
  }

  getCustomer(id: string) {
      this.dataService.getEmployee(id)
        .subscribe((customer: IEmployee) => {
          this.customer = customer;
          this.buildForm();
        },
        (err) => console.log(err));
  }

  buildForm() {
      this.customerForm = this.formBuilder.group({
        firstName:  [this.customer.firstName, Validators.required],
        lastName:   [this.customer.lastName, Validators.required],
        gender:     [this.customer.gender, Validators.required],
        email:      [this.customer.email, [Validators.required, ValidationService.emailValidator]],
        address:    [this.customer.address, Validators.required],
        city:       [this.customer.city, Validators.required],
        stateId:    [this.customer.stateId, Validators.required]
      });
  }

  getStates() {
    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }
  
  submit({ value, valid }: { value: IEmployee, valid: boolean }) {
      
      value._id = this.customer._id;
      value.zip = this.customer.zip || 0; 
      // var customer: ICustomer = {
      //   _id: this.customer._id,
      // };

      if (value._id) {

        this.dataService.updateEmployee(value)
          .subscribe((customer: IEmployee) => {
            if (customer) {
              this.router.navigate(['/customers']);
            }
            else {
              this.errorMessage = 'Unable to save customer';
            }
          },
          (err) => console.log(err));

      } else {

        this.dataService.insertEmployee(value)
          .subscribe((customer: IEmployee) => {
            if (customer) {
              this.router.navigate(['/customers']);
            }
            else {
              this.errorMessage = 'Unable to add customer';
            }
          },
          (err) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/customers']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteEmployee(this.customer._id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/customers']);
          }
          else {
            this.errorMessage = 'Unable to delete customer';
          }
        },
        (err) => console.log(err));
  }

}