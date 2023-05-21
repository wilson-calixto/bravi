import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { UserResponse } from '../models/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  editUserForm: userForm = new userForm();

  @ViewChild('userForm')
  userForm!: NgForm;

  isSubmitted = false;
  userId!: number;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.getUserDetailById();
  }

  getUserDetailById() {
    this.httpProvider.getUserDetailById(this.userId).subscribe(
      (data: UserResponse) => {
        if (data != null && data.User != null) {
          const resultData = data.User;
          if (resultData) {
            this.editUserForm.id = resultData.id;
            this.editUserForm.firstName = resultData.firstName;
            this.editUserForm.lastName = resultData.lastName;
            this.editUserForm.email = resultData.email;
            this.editUserForm.address = resultData.address;
            this.editUserForm.phone = resultData.phone;
          }
        }
      },
      () => {
        this.toastr.error('Operation error');
      }
    );
  }

  EditUser(isValid: boolean) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.editUser(this.editUserForm).subscribe(
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

export class userForm {
  id = 0;
  firstName = '';
  lastName = '';
  email = '';
  address = '';
  phone = '';
}
