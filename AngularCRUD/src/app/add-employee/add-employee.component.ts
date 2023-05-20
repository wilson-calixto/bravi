import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: employeeForm = new employeeForm();

  @ViewChild('employeeForm')
  employeeForm!: NgForm;

  isSubmitted = false;

  constructor(
    private router: Router,
    private httpProvider: HttpProviderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  AddEmployee(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.postEmployee(this.addEmployeeForm).subscribe(
        async (data) => {
          console.log(data);
          if (data != null && data.status != null) {
            if (data != null && data.status != null) {
              const resultData = data;
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
  firstName = '';
  lastName = '';
  email = '';
  address = '';
  phone = '';
}
