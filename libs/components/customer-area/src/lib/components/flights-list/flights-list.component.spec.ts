import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsListComponent } from './flights-list.component';

describe('FlightsListComponent', () => {
  let component: FlightsListComponent;
  let fixture: ComponentFixture<FlightsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    jest.spyOn(component.bookFlight, 'emit');
    const id = '20000';
    component.book(id);
    expect(component.bookFlight.emit).toHaveBeenCalledWith(id);
  });
});
