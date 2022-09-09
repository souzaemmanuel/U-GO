import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterAccountComponent } from './register-account.component';

describe('RegisterAccountComponent', () => {
  let component: RegisterAccountComponent;
  let fixture: ComponentFixture<RegisterAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterAccountComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submitForm event', () => {
    jest.spyOn(component.submitForm, 'emit');

    component.accountForm.setValue({
      email: 'emai@email.com',
      password: 'anything',
      name: 'EMANUEL',
    });
    component.createAccount();

    expect(component.submitForm.emit).toHaveBeenCalledWith({
      email: 'emai@email.com',
      name: 'EMANUEL',
      password: 'anything',
    });
  });

  it('should not emit submitForm event', () => {
    jest.spyOn(component.submitForm, 'emit');
    component.accountForm.setValue({
      email: 'emai',
      password: 'anything',
      name: 'EMANUEL',
    });
    component.createAccount();

    expect(component.submitForm.emit).not.toHaveBeenCalled();
  });
});
