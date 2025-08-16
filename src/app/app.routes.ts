import { Routes } from '@angular/router';
import { ServiceListComponent } from './feature/services/components/service-list/service-list.component';
import { HomeComponent } from './feature/core/components/home/home.component';

export const routes: Routes = [
    {path: 'services/list', component: ServiceListComponent},
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
];
