import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  specialRequests: string;
}

@Component({
  selector: 'app-booking-list',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './booking-list.html',
  styleUrl: './booking-list.css'
})
export class BookingList implements OnInit {
  
  // Sample bookings data
  bookings: Booking[] = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(02) 1234 5678",
      guests: 4,
      date: "2024-01-15",
      time: "19:00",
      specialRequests: "Window seat preferred"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(02) 9876 5432",
      guests: 2,
      date: "2024-01-16",
      time: "18:30",
      specialRequests: ""
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@email.com",
      phone: "(02) 4567 8901",
      guests: 6,
      date: "2024-01-14",
      time: "20:00",
      specialRequests: "Celebrating birthday"
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.b@email.com",
      phone: "(02) 2345 6789",
      guests: 3,
      date: "2024-01-17",
      time: "19:30",
      specialRequests: "Vegetarian options needed"
    },
    {
      id: 5,
      name: "David Lee",
      email: "david.lee@email.com",
      phone: "(02) 3456 7890",
      guests: 5,
      date: "2024-01-18",
      time: "18:00",
      specialRequests: ""
    }
  ];

  filteredBookings: Booking[] = [];
  displayedBookings: Booking[] = [];
  
  // Search filter
  searchTerm: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  totalItems: number = 0;

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.filteredBookings = this.applyFilters();
    this.updatePagination();
  }
simulateNewBooking(){

}
closeNotification(){
  
}
  applyFilters(): Booking[] {
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
  updatePagination(): void {
    this.totalItems = this.filteredBookings.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedBookings = this.filteredBookings.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
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
