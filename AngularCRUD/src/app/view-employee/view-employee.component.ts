import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpProviderService } from '../service/http-provider.service';
import { User, UserResponse } from '../models/User';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
})
export class ViewEmployeeComponent implements OnInit {
  employeeId!: number;
  employeeDetail!: User;

  constructor(
    private route: ActivatedRoute,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['employeeId'];
    this.getEmployeeDetailById();
  }

  getEmployeeDetailById() {
    this.httpProvider
      .getEmployeeDetailById(this.employeeId)
      .subscribe((data: UserResponse) => {
        if (data != null && data.User != null) {
          const resultData = data.User;
          if (resultData) {
            this.employeeDetail = resultData;
          }
        }
      });
  }
}
