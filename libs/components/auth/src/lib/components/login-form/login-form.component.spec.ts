import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submitForm event', () => {
    jest.spyOn(component.submitForm, 'emit');

    component.loginForm.setValue({
      email: 'emai@email.com',
      password: 'anything',
    });

    component.login();

    expect(component.submitForm.emit).toHaveBeenCalledWith({
      email: 'emai@email.com',
      password: 'anything',
    });
  });

  it('should not emit submitForm event', () => {
    jest.spyOn(component.submitForm, 'emit');
    component.loginForm.setValue({
      email: 'emai',
      password: 'anything',
    });
    component.login();

    expect(component.submitForm.emit).not.toHaveBeenCalled();
  });
});
