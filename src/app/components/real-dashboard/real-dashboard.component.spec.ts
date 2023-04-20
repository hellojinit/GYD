import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealDashboardComponent } from './real-dashboard.component';

describe('RealDashboardComponent', () => {
  let component: RealDashboardComponent;
  let fixture: ComponentFixture<RealDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
