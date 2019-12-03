import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule }   from './core/core.module';
import { SharedModule }   from './shared/shared.module';
import { UserSelctionComponent } from './user-selction/user-selction.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    CoreModule,   //Singleton objects
    SharedModule  //Shared (multi-instance) objects
  ],
  declarations: [ AppComponent, AppRoutingModule.components, UserSelctionComponent,EmployeeListComponent,
    EmployeeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }