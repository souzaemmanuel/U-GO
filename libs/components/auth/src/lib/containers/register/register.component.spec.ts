import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService, SnackbarService } from '@u-go/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CreateAccount, UserToken } from '@u-go/models';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
      ],
      providers: [
        AuthService,
        SnackbarService,
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createAccount method', () => {
    jest.spyOn(authService, 'createAccount').mockImplementation(() => of());
    component.createAccount({} as CreateAccount);
    expect(authService.createAccount).toHaveBeenCalled();
  });

  it('should create an account and navigate to createAccount', () => {
    jest
      .spyOn(authService, 'createAccount')
      .mockReturnValue(of({} as UserToken));

    component.createAccount({} as CreateAccount);

    expect(router.navigate).toBeCalledWith(['auth/login']);
  });

  it('should redirect to login route', () => {
    component.goToLogin();
    expect(router.navigate).toBeCalledWith(['auth/login']);
  });
});
