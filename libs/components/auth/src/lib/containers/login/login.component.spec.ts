import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService, SnackbarService } from '@u-go/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthUser, UserToken } from '@u-go/models';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
      ],
      providers: [
        SnackbarService,
        AuthService,
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method', () => {
    jest.spyOn(authService, 'login').mockImplementation(() => of());
    component.login({} as AuthUser);
    expect(authService.login).toHaveBeenCalled();
  });
  it('should login and navigate to customer home', () => {
    jest.spyOn(authService, 'login').mockReturnValue(of({} as UserToken));
    component.login({} as AuthUser);

    expect(router.navigate).toBeCalledWith(['customer/home']);
  });

  it('should redirect to create account route', () => {
    component.goToRegister();
    expect(router.navigate).toBeCalledWith(['auth/register']);
  });
});
