import { Routes } from '@angular/router';
import { ServiceListComponent } from './feature/services/components/service-list/service-list.component';
import { HomeComponent } from './feature/core/components/home/home.component';
import { DashboardComponent } from './feature/dashboard/components/dashboard/dashboard.component';
import { BookingListComponent } from './feature/booking/components/booking-list/booking-list.component';
import { TimeManagementComponent } from './feature/admin/components/time-management/time-management.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'bookings', component: BookingListComponent },
    { path: 'admin/services', component: ServiceListComponent },
    { path: 'admin/times', component: TimeManagementComponent },
];
