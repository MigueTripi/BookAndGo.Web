import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeManagementComponent } from './time-management.component';

describe('TimeManagementComponent', () => {
  let component: TimeManagementComponent;
  let fixture: ComponentFixture<TimeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeManagementComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render time management title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Time Management');
  });
});
