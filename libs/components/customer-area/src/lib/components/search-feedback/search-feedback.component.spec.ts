import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFeedbackComponent } from './search-feedback.component';

describe('SearchFeedbackComponent', () => {
  let component: SearchFeedbackComponent;
  let fixture: ComponentFixture<SearchFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFeedbackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
