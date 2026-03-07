// menu.component.ts - FULL UPDATED VERSION
import { Component, OnInit, OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr'; // If using toastr
import { LoaderService } from '../Common/services/loader-service';
import { Booking } from '../Common/services/booking';

// Define types
type PageName = 'home' | 'menu' | 'kids-menu' | 'about' | 'contact';
type MenuCategory = 'all' | 'breakfast' | 'lunch' | 'pasta-salads' | 'hot-coffee' | 'cold-drinks' | 'more-breakfast' | 'gelato-icecream';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu implements OnInit, OnDestroy, AfterViewInit {
  // Component state
  currentPage: PageName = 'home';
  currentCategory: MenuCategory = 'all';
  isScrolled = false;
  isOpenNow = false;
  
  // Forms
  quickBookingForm!: FormGroup;
  fullBookingForm!: FormGroup;
  
  // Modal and toast state
  showSuccessPopup = false;
  showBookingModal = false;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  
  private updateInterval: any;
  private bootstrapModal: any;
  private bootstrapToast: any;

  constructor(
    private fb: FormBuilder,
    private bookingService: Booking,
    private loader: LoaderService,
    private tostr: ToastrService // If using toastr
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.setCurrentYear();
    this.updateHours();
    this.handleInitialPage();
    this.hideModalAndBackdrop();
    
    // Update hours every minute
    this.updateInterval = setInterval(() => this.updateHours(), 60000);
  }
  
  ngAfterViewInit(): void {
    this.initBootstrapComponents();
    this.hideModalAndBackdrop();
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  initializeForms(): void {
    // Quick Booking Form (modal)
    this.quickBookingForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z\s]*$/)
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
      ]],
      date: ['', Validators.required],
      time: ['19:00', Validators.required],
      guests: ['2', Validators.required],
      smoking: [false],
      outdoor: [false]
    });

    // Full Booking Form (contact page)
    this.fullBookingForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z\s]*$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
      ]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      guests: ['', Validators.required],
      message: ['']
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 100;
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent): void {
    if (event.state?.page) {
      this.navigateToPage(event.state.page as PageName);
    }
  }

  // Modal Functions
  openBookingModal(): void {
    this.showBookingModal123();
  }

  showBookingModal123(): void {
    console.log('Opening modal...');
    
    // Get modal element
    const modalElement = document.getElementById('bookingModal');
    if (!modalElement) {
      console.error('Modal not found!');
      return;
    }
    
    // Set default date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.quickBookingForm.patchValue({
      date: tomorrow.toISOString().split('T')[0],
      time: '19:00'
    });
    
    // FIX: Remove fade class for immediate show
    modalElement.classList.remove('fade');
    
    // Show backdrop (if not already shown)
    document.body.classList.add('modal-open');
    
    // Create backdrop if not exists
    let backdrop = document.querySelector('.modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }
    
    // SHOW MODAL - IMPORTANT: Set proper styles
    modalElement.style.display = 'block';
    modalElement.style.opacity = '1';
    modalElement.classList.add('show');
    
    // Fix z-index to appear above backdrop
    modalElement.style.zIndex = '1055';
    
    // Fix modal dialog positioning
    const modalDialog = modalElement.querySelector('.modal-dialog') as HTMLElement;
    if (modalDialog) {
      modalDialog.style.zIndex = '1056';
      modalDialog.style.position = 'relative';
    }
    
    // Re-add fade class for animation
    setTimeout(() => {
      modalElement.classList.add('fade');
    }, 10);
    
    console.log('Modal should be visible now');
  }

  hideModalAndBackdrop(): void {
    // 1. Hide modal
    const modal = document.getElementById('bookingModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
    
    // 2. Remove backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
    
    // 3. Remove modal-open class from body
    document.body.classList.remove('modal-open');
    
    console.log('Modal and backdrop hidden');
  }

  private initBootstrapComponents(): void {
    // Initialize Bootstrap components if they exist in window
    if (typeof window !== 'undefined') {
      const windowWithBootstrap = window as any;
      if (windowWithBootstrap.bootstrap) {
        // Modal
        const modalElement = document.getElementById('bookingModal');
        if (modalElement && windowWithBootstrap.bootstrap.Modal) {
          this.bootstrapModal = new windowWithBootstrap.bootstrap.Modal(modalElement);
        }
        
        // Toast
        const toastElement = document.getElementById('notificationToast');
        if (toastElement && windowWithBootstrap.bootstrap.Toast) {
          this.bootstrapToast = new windowWithBootstrap.bootstrap.Toast(toastElement);
        }
      }
    }
  }

  private updateHours(): void {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const totalMinutes = currentHour * 60 + currentMinute;
    
    const openTime = 7 * 60; // 7:00 AM
    const closeTime = 17 * 60; // 5:00 PM
    
    this.isOpenNow = totalMinutes >= openTime && totalMinutes < closeTime;
  }

  private setCurrentYear(): void {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear().toString();
    }
  }

  private handleInitialPage(): void {
    const hash = window.location.hash.replace('#', '') as PageName;
    const validPages: PageName[] = ['home', 'menu', 'kids-menu', 'about', 'contact'];
    
    if (validPages.includes(hash)) {
      this.navigateToPage(hash);
    } else {
      this.navigateToPage('home');
    }
  }

  navigateToPage(page: PageName, category?: MenuCategory): void {
    this.currentPage = page;
    
    // Update URL hash without triggering page reload
    window.history.pushState({ page }, '', `#${page}`);
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // If navigating to menu with category, filter menu
    if (page === 'menu' && category) {
      setTimeout(() => this.filterMenu(category), 100);
    } else if (page === 'menu') {
      setTimeout(() => this.filterMenu('all'), 100);
    }
  }

  filterMenu(category: MenuCategory): void {
    this.currentCategory = category;
    
    // Animate menu categories
    setTimeout(() => {
      const menuCategories = document.querySelectorAll('.menu-category');
      menuCategories.forEach(cat => {
        const categories = (cat as HTMLElement).dataset['categories']?.split(',');
        if (category === 'all' || categories?.includes(category)) {
          cat.classList.remove('visible');
          // Force reflow for animation
          void (cat as HTMLElement).offsetWidth;
          cat.classList.add('visible');
        } else {
          cat.classList.remove('visible');
        }
      });
    }, 100);

    // Scroll to top of menu
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Form Submission Methods
  submitQuickBooking(): void {
    if (this.quickBookingForm.valid) {
      this.loader.show();
      console.log('Quick booking submitted:', this.quickBookingForm.value);
      
      // Prepare data for API
      const bookingData = {
        ...this.quickBookingForm.value,
        email: 'No Mail available for this', // Add default or get from form if available
        specialRequest: '',
        noOfGuest: this.quickBookingForm.value.guests
      };
      
      this.bookingService.SaveBooking(bookingData).subscribe({
        next: (data: any) => {
          this.showSuccessPopup = true;
          this.loader.hide();
          
          // Close modal
          this.hideModalAndBackdrop();
          
          // Show success notification
          this.showNotification(`Table booked for ${this.quickBookingForm.value.name}!`, 'success');
          
          // Hide popup after 2 seconds and reset form
          setTimeout(() => {
            this.showSuccessPopup = false;
            this.quickBookingForm.reset({
              time: '19:00',
              guests: '2',
              smoking: false,
              outdoor: false
            });
          }, 2000);
        },
        error: (err: any) => {
          this.loader.hide();
          this.showNotification('Booking failed. Please try again later.', 'error');
          // If using toastr: this.tostr.error('Booking failed. Try later');
        }
      });
    } else {
      this.markFormGroupTouched(this.quickBookingForm);
      this.showNotification('Please fill in all required fields correctly.', 'error');
    }
  }

  submitFullBooking(): void {
    if (this.fullBookingForm.valid) {
      this.loader.show();
      console.log('Full booking submitted:', this.fullBookingForm.value);
      
      // Prepare data for API
      const bookingData = {
        ...this.fullBookingForm.value,
        noOfGuest: this.fullBookingForm.value.guests,
        specialRequest: this.fullBookingForm.value.message
      };
      
      this.bookingService.SaveBooking(bookingData).subscribe({
        next: (data: any) => {
          this.showSuccessPopup = true;
          this.loader.hide();
          
          // Show success notification
          this.showNotification(`Thank you, ${this.fullBookingForm.value.name}! Your table has been booked.`, 'success');
          
          // Hide popup after 2 seconds and reset form
          setTimeout(() => {
            this.showSuccessPopup = false;
            this.fullBookingForm.reset();
          }, 2000);
        },
        error: (err: any) => {
          this.loader.hide();
          this.showNotification('Booking failed. Please try again later.', 'error');
          // If using toastr: this.tostr.error('Booking failed. Try later');
        }
      });
    } else {
      this.markFormGroupTouched(this.fullBookingForm);
      this.showNotification('Please fill in all required fields correctly.', 'error');
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  private showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    this.toastMessage = message;
    this.toastType = type;
    
    if (this.bootstrapToast) {
      this.bootstrapToast.show();
    }
    
    // Also show using toastr if available
    if (this.tostr) {
      if (type === 'success') {
        this.tostr.success(message);
      } else {
        this.tostr.error(message);
      }
    }
  }

  // Form Validation Getters for Template
  get quickName() { return this.quickBookingForm.get('name'); }
  get quickPhone() { return this.quickBookingForm.get('phone'); }
  get quickDate() { return this.quickBookingForm.get('date'); }
  get quickTime() { return this.quickBookingForm.get('time'); }
  get quickGuests() { return this.quickBookingForm.get('guests'); }

  get fullName() { return this.fullBookingForm.get('name'); }
  get fullEmail() { return this.fullBookingForm.get('email'); }
  get fullPhone() { return this.fullBookingForm.get('phone'); }
  get fullDate() { return this.fullBookingForm.get('date'); }
  get fullTime() { return this.fullBookingForm.get('time'); }
  get fullGuests() { return this.fullBookingForm.get('guests'); }

  // Helper method to handle button clicks
  onNavClick(page: PageName, category?: MenuCategory, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.navigateToPage(page, category);
  }

  onCategoryClick(category: MenuCategory, event: Event): void {
    event.preventDefault();
    this.filterMenu(category);
  }
}