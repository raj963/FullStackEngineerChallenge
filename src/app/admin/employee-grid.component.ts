import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { IEmployee } from '../shared/interfaces';
import { Sorter } from '../core/sorter';
import { TrackByService } from '../core/trackby.service';
import { DataShareService } from '../core/data-share.service';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-employee-grid', 
  templateUrl: './employee-grid.component.html',
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class EmployeeGridComponent implements OnInit {

  @Input() employees: IEmployee[] = [];
  @Input() disableFields = {firstname:false,
    lastname:false,
    address:false,
    city:false,
    state:false,
    performance:false,
    selectEmployee:false,
    selectReviewer:false,

  };
  reviewer: any;
  reviewerLastObj: any;
  
  constructor(private sorter: Sorter, public trackby: TrackByService,private dataShareService:DataShareService,private router:Router) { }
   
  ngOnInit() {

  }

  sort(prop: string) {
      this.sorter.sort(this.employees, prop);
  }

  setEmplyId(emp){
    this.dataShareService.setEmployeeList(null)
    this.dataShareService.setEmployeeList(emp)

    this.router.navigateByUrl('/performance/'+emp._id )
  }

  setEmploye(emp,refObj){
    this.dataShareService.setEmployeeList(emp);
  }


  setReviewer(emp,refObj){
    if(!(this.reviewerLastObj===refObj)){
      if(this.reviewerLastObj&& this.reviewerLastObj.checked){
        this.reviewerLastObj.checked=false
      }
     
      this.reviewerLastObj=refObj
      this.reviewer=emp
      this.dataShareService.setreviewerEmploye(this.reviewer)
    }
   
  }

  setdynamicRout(customer){
    let route=[]
    if(!(this.disableFields &&this.disableFields.firstname)){
    return  ['/customers',customer._id]
    }else{
      return  ['/employee',customer._id]
    }
  }

}
