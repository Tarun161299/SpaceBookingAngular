import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Booking } from '../../Common/services/booking';
import { LoaderService } from '../../Common/services/loader-service';
interface Booking12 {
  bookingId: number;
  name: string;
  email: string;
  phone: string;
  noOfGuest: number;
  date: string;
  time: string;
  specialRequest: string;
  totalCount:number;
}

@Component({
  selector: 'app-booking-list',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './booking-list.html',
  styleUrl: './booking-list.css'
})
export class BookingList implements OnInit {
  constructor(private booking:Booking,private loader:LoaderService){

  }
  nextdisabled:boolean=true;
  prevdisabled:boolean=true;
  from:number=0;
  to:number=0;
  showNotification1:boolean=false;
  // Sample bookings data
  bookings: Booking12[] = [
    // {
    //   id: 1,
    //   name: "John Smith",
    //   email: "john.smith@email.com",
    //   phone: "(02) 1234 5678",
    //   guests: 4,
    //   date: "2024-01-15",
    //   time: "19:00",
    //   specialRequests: "Window seat preferred"
    // },
    // {
    //   id: 2,
    //   name: "Sarah Johnson",
    //   email: "sarah.j@email.com",
    //   phone: "(02) 9876 5432",
    //   guests: 2,
    //   date: "2024-01-16",
    //   time: "18:30",
    //   specialRequests: ""
    // },
    // {
    //   id: 3,
    //   name: "Mike Wilson",
    //   email: "mike.wilson@email.com",
    //   phone: "(02) 4567 8901",
    //   guests: 6,
    //   date: "2024-01-14",
    //   time: "20:00",
    //   specialRequests: "Celebrating birthday"
    // },
    // {
    //   id: 4,
    //   name: "Emily Brown",
    //   email: "emily.b@email.com",
    //   phone: "(02) 2345 6789",
    //   guests: 3,
    //   date: "2024-01-17",
    //   time: "19:30",
    //   specialRequests: "Vegetarian options needed"
    // },
    // {
    //   id: 5,
    //   name: "David Lee",
    //   email: "david.lee@email.com",
    //   phone: "(02) 3456 7890",
    //   guests: 5,
    //   date: "2024-01-18",
    //   time: "18:00",
    //   specialRequests: ""
    // }
  ];

  filteredBookings: Booking12[] = [];
  displayedBookings: Booking12[] = [];
  
  // Search filter
  searchTerm: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  totalItems: number = 0;

  ngOnInit(): void {
    this.updatePagination(1);
   
  }

  loadBookings(): void {
    this.booking.GetBookings(1).subscribe({next:(data:any)=>{
      this.filteredBookings=data;
      this.totalPages=this.filteredBookings.length>0?this.filteredBookings[0].totalCount:0
      //this.updatePagination();
    },error:(err:any)=>{

    }})
    
  }
simulateNewBooking(){

}
closeNotification(){
  
}
  applyFilters(): Booking12[] {
    let filtered = [...this.bookings];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.name.toLowerCase().includes(term) ||
        booking.email.toLowerCase().includes(term)
      );
    }

    return filtered;
  }
showNotification(){

}
  updatePagination(page:number): void {
   this.loader.show();
     this.booking.GetBookings(page).subscribe({next:(data:any)=>{
        this.filteredBookings=data;
     this.totalItems = this.filteredBookings.length;
    
     this.from=((page-1)*this.pageSize)+1;
     this.to=((page-1)*this.pageSize)+this.filteredBookings.length;
    this.totalPages = Math.ceil(this.filteredBookings.length>0?this.filteredBookings[0].totalCount:0/ this.pageSize);
     this.prevdisabled= (this.from==1||  this.from==0)?true:false
     this.nextdisabled=this.to==this.totalPages?true:false;
     this.loader.hide();
    // const startIndex = (this.currentPage - 1) * this.pageSize;
    // const endIndex = startIndex + this.pageSize;
    // this.displayedBookings = this.filteredBookings.slice(startIndex, endIndex);
    },error:(err:any)=>{
 this.loader.hide();
    }})
 
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination( this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination( this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination( this.currentPage);
    }
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.loadBookings();
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  formatTime(timeString: string): string {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  getGuestText(guests: number): string {
    return guests === 1 ? 'person' : 'people';
  }

  // Get page numbers for pagination
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
