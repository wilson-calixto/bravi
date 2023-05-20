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

  isSubmitted = false;
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
          const resultData = data.User;
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
      (error: any) => {
        this.toastr.error('Operation error', error);
      }
    );
  }

  EditEmployee(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.editEmployee(this.editEmployeeForm).subscribe(
        async (data) => {
          if (data != null) {
            const resultData = data;
            if (resultData != null && resultData.status) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
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
  id = 0;
  firstName = '';
  lastName = '';
  email = '';
  address = '';
  phone = '';
}
