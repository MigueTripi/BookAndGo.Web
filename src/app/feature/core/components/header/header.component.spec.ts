import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo text', () => {
    const logoElement = fixture.debugElement.query(By.css('.logo'));
    expect(logoElement.nativeElement.textContent).toContain('BookAndGo');
  });

  it('should render all main navigation items', () => {
    const navigationItems = fixture.debugElement.queryAll(By.css('a[mat-button]'));
    
    // Check Dashboard link
    expect(navigationItems[0].nativeElement.textContent.trim()).toContain('Dashboard');
    expect(navigationItems[0].attributes['routerLink']).toBe('/dashboard');
    
    // Check Bookings link
    expect(navigationItems[1].nativeElement.textContent.trim()).toContain('Bookings');
    expect(navigationItems[1].attributes['routerLink']).toBe('/bookings');
  });

  // it('should render admin menu button with dropdown', () => {
  //   const adminButton = fixture.debugElement.query(By.css('button[mat-button]'));
  //   expect(adminButton.nativeElement.textContent).toContain('Admin');
    
  //   // Check if menu trigger is properly set up
  //   expect(adminButton.attributes['ng-reflect-mat-menu-trigger-for']).toBeTruthy();
  // });

  it('should render admin menu items when clicked', () => {
    const adminButton = fixture.debugElement.query(By.css('button[mat-button]'));
    adminButton.nativeElement.click();
    fixture.detectChanges();

    // Get menu items from the overlay
    const menuItems = document.querySelectorAll('a[mat-menu-item]');
    expect(menuItems.length).toBe(2);
    
    // Check Services menu item
    expect(menuItems[0].querySelector('mat-icon')?.textContent).toContain('room_service');
    expect(menuItems[0].textContent).toContain('Services');
    
    // Check Times menu item
    expect(menuItems[1].querySelector('mat-icon')?.textContent).toContain('schedule');
    expect(menuItems[1].textContent).toContain('Times');
  });

  it('should show hamburger menu button only on mobile view', () => {
    // Create the spy once
    const innerWidthSpy = spyOnProperty(window, 'innerWidth');
    
    // Desktop view - button should be hidden
    innerWidthSpy.and.returnValue(1024);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    
    let menuButton = fixture.debugElement.query(By.css('.menu-button'));
    expect(menuButton).toBeFalsy();

    // Mobile view - button should be visible
    innerWidthSpy.and.returnValue(767);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    
    menuButton = fixture.debugElement.query(By.css('.menu-button'));
    expect(menuButton).toBeTruthy();
    expect(menuButton.nativeElement.querySelector('mat-icon').textContent).toContain('menu');
  });

  it('should toggle mobile menu visibility when hamburger is clicked', () => {
    // Set mobile view
    const innerWidthSpy = spyOnProperty(window, 'innerWidth');
    innerWidthSpy.and.returnValue(767);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    const menuButton = fixture.debugElement.query(By.css('.menu-button'));
    const menuItems = fixture.debugElement.query(By.css('.menu-items'));

    // Initially menu should not have mobile-menu class
    expect(menuItems.classes['mobile-menu']).toBeFalsy();

    // Click menu button
    menuButton.nativeElement.click();
    fixture.detectChanges();

    // Menu should have mobile-menu class
    expect(menuItems.classes['mobile-menu']).toBeTruthy();

    // Click again
    menuButton.nativeElement.click();
    fixture.detectChanges();

    // Menu should not have mobile-menu class
    expect(menuItems.classes['mobile-menu']).toBeFalsy();
  });

  it('should highlight active route', () => {
    const navigationItems = fixture.debugElement.queryAll(By.css('a[mat-button]'));
    
    navigationItems.forEach(item => {
      expect(item.classes['active']).toBeFalsy();
      // RouterLinkActive will add the 'active' class when the route is active
      expect(item.attributes['routerLinkActive']).toBe('active');
    });
  });

  it('should render correct icons for all navigation items', () => {
    // Check main navigation icons
    const navigationIcons = fixture.debugElement.queryAll(By.css('a[mat-button] mat-icon'));
    expect(navigationIcons[0].nativeElement.textContent).toContain('dashboard');
    expect(navigationIcons[1].nativeElement.textContent).toContain('book_online');

    // Check admin button icons
    const adminButton = fixture.debugElement.query(By.css('button[mat-button]'));
    const adminIcons = adminButton.queryAll(By.css('mat-icon'));
    expect(adminIcons[0].nativeElement.textContent).toContain('admin_panel_settings');
    expect(adminIcons[1].nativeElement.textContent).toContain('arrow_drop_down');
  });
});
