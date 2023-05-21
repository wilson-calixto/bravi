import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { BaseResponse } from '../models/Api';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addUserForm: UserForm = new UserForm();

  @ViewChild('UserForm')
  UserForm!: NgForm;

  isSubmitted = false;

  constructor(
    private router: Router,
    private httpProvider: HttpProviderService,
    private toastr: ToastrService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  AddUser(isValid: boolean) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.postUser(this.addUserForm).subscribe(
        async (data: BaseResponse) => {
          if (data != null && data.status != null) {
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

export class UserForm {
  firstName = '';
  lastName = '';
  email = '';
  address = '';
  phone = '';
}
