import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { User, UsersResponse } from '../models/User';
import { BaseResponse } from '../models/Api';

@Component({
  selector: 'ng-modal-confirm',
  template: `
    <div class="modal-header">
      <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
      <button
        type="button"
        class="btn close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete?</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        CANCEL
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-success"
        (click)="modal.close('Ok click')"
      >
        OK
      </button>
    </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  closeResult = '';
  userList: User[] = [];

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  async getAllUsers() {
    this.httpProvider.getAllUsers().subscribe(
      (data: UsersResponse) => {
        if (data != null && data.Users != null) {
          const resultData = data.Users;
          if (resultData) {
            this.userList = resultData;
          }
        }
      },
      (error) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.userList = [];
            }
          }
        }
      }
    );
  }

  AddUser() {
    this.router.navigate(['AddUser']);
  }

  deleteUserConfirmation(user: User) {
    this.modalService
      .open(NgModalConfirm, {
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(() => {
        this.deleteUser(user);
      });
  }

  deleteUser(user: User) {
    this.httpProvider.deleteUserById(user.id).subscribe(
      (data: BaseResponse) => {
        if (data != null) {
          const resultData = data;
          if (resultData != null && resultData.status) {
            this.toastr.success(resultData.message);
            this.getAllUsers();
          }
        }
      },
      () => {
        this.toastr.error('Operation error');
      }
    );
  }
}
