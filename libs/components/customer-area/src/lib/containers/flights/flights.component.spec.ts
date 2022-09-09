import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FlightService } from '@u-go/services';
import { of } from 'rxjs';

import { FlightsComponent } from './flights.component';
const fakeActivatedRoute = {
  params: of({ from: '', to: '', budget: '' }),
};

describe('FlightsComponent', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        FlightService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightsComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call bookFlight method', () => {
    jest.spyOn(component, 'bookFlight');

    const id = '200000';
    component.book(id);

    expect(component.bookFlight).toHaveBeenCalledWith(id);
  });
  it('should call getFlights method', () => {
    jest.spyOn(component, 'getFlights');

    component.closeModal(false);

    expect(component.getFlights).toHaveBeenCalled();
  });
  it('should redirect to customer home route', () => {
    component.goToCustomerHome();
    expect(router.navigate).toBeCalledWith(['customer/home']);
  });
});
