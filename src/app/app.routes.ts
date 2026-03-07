import { Routes } from '@angular/router';
//import { LoginComponent } from '../Before Login/login-component/login-component';
import { BeforeLoginComponent } from '../Before Login/before-login-component/before-login-component';
import { LoginComponent } from '../Before Login/login-component/login-component';
import { AfterLoginComponent } from '../After Login/after-login-component/after-login-component';
import { Dashboard } from '../After Login/dashboard/dashboard';
import { AllApplication } from '../After Login/all-application/all-application';
import { Menu } from '../menu/menu';
import { AddItems } from './add-items/add-items';
import { ItemList } from './item-list/item-list';
import { AuthGuard } from '../Common/authguard';
import { BookNow } from '../After Login/book-now/book-now';
import { BookingList } from '../After Login/booking-list/booking-list';
import { MenuComponent } from '../Before Login/menuComponent/menu';
import { CategoryDetailComponent } from '../Before Login/menuComponent/category-details/category-details';

export const routes: Routes = [
 
   {
    path: '',
    component: BeforeLoginComponent,
    children: [
       { path: 'login', component: LoginComponent },
       {path: '',
        component: Menu},
        
  { path: 'category/:category', component: CategoryDetailComponent },
         {path : 'book-now',component:BookNow},
         {path : 'Menu',component:MenuComponent}

         

    ]
    
  },{
    
     path: 'welcome',
    component: AfterLoginComponent,
    children: [
      { path: 'dashboard', component: Dashboard , pathMatch: 'full',canActivate: [AuthGuard]}, // default
      {path: 'AddItem/:mode/:id',
        component: AddItems,canActivate: [AuthGuard]},
      { path: 'all_Application', component: AllApplication , pathMatch: 'full',canActivate: [AuthGuard]}, // default   
      { path: 'itemList', component: ItemList , pathMatch: 'full',canActivate: [AuthGuard]}, // default   
     { path: 'booking-list', component: BookingList , pathMatch: 'full',canActivate: [AuthGuard]},
    ]
  },
  { path: '**', redirectTo: '' }
];
