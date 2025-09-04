import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
//import { BeforLoginHeaderComponent } from './befor-login-header/befor-login-header.component';
//import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  provideAnimations(), // required for animations
    provideToastr(
    ),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule   // 👈 Add this
    )
  ]
};
