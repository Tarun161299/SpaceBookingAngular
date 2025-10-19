import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  // Direct variable to control loader
  isLoading = false;

  // Show the loader
  show() {
    this.isLoading = true;
  }

  // Hide the loader
  hide() {
    this.isLoading = false;
  }
}
