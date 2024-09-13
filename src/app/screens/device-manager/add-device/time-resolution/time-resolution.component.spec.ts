import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeResolutionComponent } from './time-resolution.component';

describe('TimeResolutionComponent', () => {
  let component: TimeResolutionComponent;
  let fixture: ComponentFixture<TimeResolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeResolutionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeResolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
