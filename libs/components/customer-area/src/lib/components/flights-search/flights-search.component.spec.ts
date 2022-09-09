import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Airport, AirportSearchResponse } from '@u-go/models';
import { FlightService } from '@u-go/services';
import { of } from 'rxjs';
import { FlightsSearchComponent } from './flights-search.component';

describe('FlightsSearchComponent', () => {
  let component: FlightsSearchComponent;
  let fixture: ComponentFixture<FlightsSearchComponent>;
  let flightService: FlightService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightsSearchComponent],
      imports: [HttpClientTestingModule],
      providers: [FlightService],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightsSearchComponent);
    flightService = TestBed.inject(FlightService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value at the field', () => {
    const field = 'from';
    component.selectOption({ iata: 'CWB' } as Airport, field);
    expect(component.flightForm.get(field)?.value).toEqual('CWB');
  });

  it('should clear value from a field', () => {
    const field = 'from';
    component.flightForm.get(field)?.setValue('some value');
    component.clearValue(field);
    expect(component.flightForm.get(field)?.value).toEqual('');
  });

  it('should emit submitForm event', () => {
    jest.spyOn(component.submitForm, 'emit');

    component.flightForm.setValue({
      from: 'LAX',
      to: 'USD',
      budget: 'budget',
    });

    component.searchFlights();

    expect(component.submitForm.emit).toHaveBeenCalledWith({
      from: 'LAX',
      to: 'USD',
      budget: 'budget',
    });
  });

  it('should not emit submitForm event', () => {
    jest.spyOn(component.submitForm, 'emit');

    component.flightForm.setValue({
      from: 'from',
      to: 'to',
      budget: 'budget',
    });

    component.searchFlights();

    expect(component.submitForm.emit).not.toHaveBeenCalled();
  });

  it('should call searchAirports method', () => {
    jest.spyOn(flightService, 'searchAirports').mockImplementation(() => of());
    component.onChangeSearch('search', 'field');

    expect(flightService.searchAirports).toHaveBeenCalled();
  });
  it('should not call searchAirports method', () => {
    jest.spyOn(flightService, 'searchAirports').mockImplementation(() => of());
    component.onChangeSearch('ab', 'cd');

    expect(flightService.searchAirports).not.toHaveBeenCalled();
  });

  it('should set isLoadingFrom to false', () => {
    jest
      .spyOn(flightService, 'searchAirports')
      .mockReturnValue(of({} as AirportSearchResponse));

    component.isLoadingFrom = true;
    component.onChangeSearch('search', 'field');

    expect(component.isLoadingFrom).toBeFalsy();
  });
});
