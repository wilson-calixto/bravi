import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm: employeeForm = new employeeForm();

  @ViewChild('employeeForm')
  employeeForm!: NgForm;

  isSubmitted: boolean = false;
  employeeId: any;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['employeeId'];
    this.getEmployeeDetailById();
  }

  getEmployeeDetailById() {
    this.httpProvider.getEmployeeDetailById(this.employeeId).subscribe(
      (data: any) => {
        if (data != null && data.User != null) {
          var resultData = data.User;
          if (resultData) {
            this.editEmployeeForm.id = resultData.id;
            this.editEmployeeForm.firstName = resultData.firstName;
            this.editEmployeeForm.lastName = resultData.lastName;
            this.editEmployeeForm.email = resultData.email;
            this.editEmployeeForm.address = resultData.address;
            this.editEmployeeForm.phone = resultData.phone;
          }
        }
      },
      (error: any) => {}
    );
  }

  EditEmployee(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveEmployee(this.editEmployeeForm).subscribe(
        async (data) => {
          if (data != null && data.status != null) {
            var resultData = data;
            if (resultData != null && resultData.status) {
              if (resultData != null && resultData.status) {
                this.toastr.success(resultData.message);
                setTimeout(() => {
                  this.router.navigate(['/Home']);
                }, 500);
              }
            }
          }
        },
        async (error) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      );
    }
  }
}

export class employeeForm {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';
}
