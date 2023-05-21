import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ViewUserComponent } from './view-user.component';
import { HttpProviderService } from '../service/http-provider.service';
import { mockUser, mockUserResponse } from '../mocks/user';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;
  let mockActivatedRoute: any;
  let mockHttpProviderService: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        params: {
          userId: 1,
        },
      },
    };

    mockHttpProviderService = {
      getUserDetailById: jasmine
        .createSpy('getUserDetailById')
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

  it('should retrieve user detail by id', () => {
    const mockData = { User: mockUser };
    mockHttpProviderService.getUserDetailById.and.returnValue(of(mockData));

    component.getUserDetailById();

    expect(mockHttpProviderService.getUserDetailById).toHaveBeenCalledWith(
      component.userId
    );
    expect(component.userDetail).toEqual(mockData.User);
  });
});
