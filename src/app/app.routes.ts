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

export const routes: Routes = [
 
   {
    path: '',
    component: BeforeLoginComponent,
    children: [
       { path: 'login', component: LoginComponent },
       {path: '',
        component: Menu}

    ]
    
  },{
    
     path: 'welcome',
    component: AfterLoginComponent,
    children: [
      { path: 'dashboard', component: Dashboard , pathMatch: 'full'}, // default
      {path: 'AddItem/:mode/:id',
        component: AddItems},
      { path: 'all_Application', component: AllApplication , pathMatch: 'full'}, // default   
      { path: 'itemList', component: ItemList , pathMatch: 'full'}, // default   
    ]
  },
  { path: '**', redirectTo: '' }
];
