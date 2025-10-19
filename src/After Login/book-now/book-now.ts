import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Booking } from '../../Common/services/booking';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../Common/services/loader-service';

@Component({
  selector: 'app-book-now',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './book-now.html',
  styleUrl: './book-now.css'
})
export class BookNow {
 bookingForm!: FormGroup;
  showSuccessPopup: boolean = false;
  constructor(private fb: FormBuilder,private bookingService:Booking,private tostr:ToastrService,private loader:LoaderService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.bookingForm = this.fb.group({
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
      noOfGuest: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      specialRequest: ['']
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      this.loader.show();
      console.log('Form submitted:', this.bookingForm.value);
      debugger
      this.bookingService.SaveBooking(this.bookingForm.value).subscribe({next:(data:any)=>{
this.showSuccessPopup = true;
      this.loader.hide();
      // Hide popup after 2 seconds
      setTimeout(() => {
        this.showSuccessPopup = false;
        this.bookingForm.reset();
      }, 2000);
      },error:(err:any)=>{
        this.loader.hide()
this.tostr.error('Booking failed Try later')
      }});
      // Handle form submission logic here
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.bookingForm.controls).forEach(key => {
      this.bookingForm.get(key)?.markAsTouched();
    });
  }
}

