import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../shared/interfaces';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  accessMethodDel = false;
  isAdminUser: boolean;
  employee: IEmployee = null;
  employeeList: any[] = [];
  showGrid: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.handlerColleps()

    // this.accessMethodDel = {edit:true,delete:false}

    this.isAdminUser = false
  }

  handlerColleps() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }

  getEmpData(eve) {

    this.employee = eve
    if (this.employee && this.employee.OtherEmpReview.length) {

      this.employee.OtherEmpReview.forEach(element => {
        this.getEmployee(element)
      });
      // this.showEmpGrid()
    }
  }
  // showEmpGrid() {
  //  setTimeout(() => {
  //    this.showGrid=true
  //  }, 1000);
  // }

  getEmployee(id: string) {
    let me = this;
    this.dataService.getEmployee(id)
      .subscribe((customer: IEmployee) => {
        // me.employee = customer;
        me.employeeList.push(me.employee)
        if (me.employee.OtherEmpReview.length === me.employeeList.length) {
          me.showGrid = true;
        }
      },
        (err: any) => console.log(err));
  }

}
