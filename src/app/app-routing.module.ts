import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { employeebaseComponent } from './admin/adminbase.component';
import { EmployeeGridComponent } from './admin/employee-grid.component';
import { EmployeeEditComponent } from './admin/employee-edit.component';
// import { CustomerEditReactiveComponent } from './customers/customer-edit-reactive.component';
import { IRouting } from './shared/interfaces';
import { PerformanceComponent } from './performance/performance.component';
import { PerformanceEditComponent } from './performance/performance-edit.component';
import { StarRatingComponent } from './rating/star-rating.component';
import { UserSelctionComponent } from './user-selction/user-selction.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';



const routes: Routes = [
  { path: '', component: UserSelctionComponent },
  { path: 'selectuser', component: UserSelctionComponent},
  { path: 'customers', component: employeebaseComponent},
  { path: 'customers/:id', component: EmployeeEditComponent},
  { path: 'employeelist', component: EmployeeListComponent },
  { path: 'employee/:id', component: EmployeeComponent},

  { path: 'performance', component: PerformanceComponent},
  { path: 'performance/:id', component: PerformanceEditComponent},
 
  
  { path: '**',  component: UserSelctionComponent  } //catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule]
})
export class AppRoutingModule {
  static components = [ employeebaseComponent, EmployeeEditComponent, EmployeeGridComponent,PerformanceComponent,
    PerformanceEditComponent,StarRatingComponent];
}
