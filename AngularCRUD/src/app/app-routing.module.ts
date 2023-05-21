import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'ViewUser/:employeeId', component: ViewUserComponent },
  { path: 'AddEmployee', component: AddEmployeeComponent },
  { path: 'EditUser/:employeeId', component: EditEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
