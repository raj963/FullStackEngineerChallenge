import { Injectable } from '@angular/core';
import { propertyResolver } from '../shared/property-resolver';
import { isRegExp } from 'util';
import { IEmployee } from '../shared/interfaces';

@Injectable()
export class DataShareService {


  private  employeeList = new Map()
  private  reviewerEmploye:IEmployee ;

    setEmployeeList(emp) {
        if (emp == null) {
            this.employeeList = new Map()
            return;
        }
        if (!this.employeeList.has(emp._id)) {
            this.employeeList.set(emp._id, emp)
        } else {
            this.employeeList.delete(emp._id)
        }

    }

    getEmployeeList(){

        return this.employeeList
    }

    setreviewerEmploye(id) {
        if (id == null) {
            this.reviewerEmploye = null
            return
        }
        this.reviewerEmploye = id;
    }

    getReviewer() {
        return this.reviewerEmploye
    }



}