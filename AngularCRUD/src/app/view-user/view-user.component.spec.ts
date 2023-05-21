import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ViewUserComponent } from './view-user.component';
import { HttpProviderService } from '../service/http-provider.service';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;
  let mockActivatedRoute: any;
  let mockHttpProviderService: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        params: {
          employeeId: 1,
        },
      },
    };

    mockHttpProviderService = {
      getEmployeeDetailById: jasmine
        .createSpy('getEmployeeDetailById')
        .and.returnValue(of({ User: {} })),
    };

    await TestBed.configureTestingModule({
      declarations: [ViewUserComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HttpProviderService, useValue: mockHttpProviderService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve employee detail by id', () => {
    const mockData = { User: {} };
    mockHttpProviderService.getEmployeeDetailById.and.returnValue(of(mockData));

    component.getEmployeeDetailById();

    expect(mockHttpProviderService.getEmployeeDetailById).toHaveBeenCalledWith(
      component.employeeId
    );
    expect(component.employeeDetail).toEqual(mockData.User);
  });

  it('should handle error when retrieving employee detail', () => {
    const mockError = {
      message: 'An error occurred while retrieving employee detail',
    };
    mockHttpProviderService.getEmployeeDetailById.and.returnValue(
      throwError(mockError)
    );

    component.getEmployeeDetailById();

    expect(mockHttpProviderService.getEmployeeDetailById).toHaveBeenCalledWith(
      component.employeeId
    );
    expect(component.employeeDetail).toBeTruthy();
  });
});
