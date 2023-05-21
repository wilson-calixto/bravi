import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpProviderService } from '../service/http-provider.service';
import { User, UserResponse } from '../models/User';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  userId!: number;
  userDetail!: User;

  constructor(
    private route: ActivatedRoute,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.getUserDetailById();
  }

  getUserDetailById() {
    this.httpProvider
      .getUserDetailById(this.userId)
      .subscribe((data: UserResponse) => {
        if (data != null && data.User != null) {
          const resultData = data.User;
          if (resultData) {
            this.userDetail = resultData;
          }
        }
      });
  }
}
