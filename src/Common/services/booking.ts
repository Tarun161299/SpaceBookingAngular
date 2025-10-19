import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environments/enironmets';
import { ApiEndpoints } from '../Endpoints/api-endpoints';
import { EmployeeData } from '../../Model/EmployeeData';
import { BookNow } from '../../After Login/book-now/book-now';
import { BookingModel } from '../../Model/booking';
import { LoaderService } from './loader-service';

@Injectable({
  providedIn: 'root'
})
export class Booking {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN_HERE' // replace with actual token if needed
    }); 
 }
 SaveBooking(booking:BookingModel): Observable<any> {
    return this.http.post<any>(`${this.baseUrl+ApiEndpoints.SaveBooking}`, booking,{ headers: this.getHeaders() });
    }
  
}
