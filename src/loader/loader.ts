import { Component } from '@angular/core';
import { LoaderService } from '../Common/services/loader-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-loader',
  imports:[CommonModule,FormsModule],
  template: `
    <div *ngIf="loaderService.isLoading" class="loader-overlay">
      <i class="fas fa-coffee spinner"></i>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      inset: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .spinner {
      font-size: 4rem;
      color: #ff5722;
      animation: spin 1.5s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
