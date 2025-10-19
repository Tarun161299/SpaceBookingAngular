// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environments/enironmets';
import { ApiEndpoints } from '../Endpoints/api-endpoints';
import { FoodData } from '../../Model/FoodData';
import { UserDetail } from '../../Model/UserDetail';
import { FoodMenu } from '../../Model/FoodMenu';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN_HERE' // replace with actual token if needed
    });
  }
  private getHeadersToken(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // replace with actual token if needed
    });
  }
  // Fetch all documents metadata
 
  // Fetch all employees
  getAllFoodDetails(): Observable<FoodData[]> {
    return this.http.get<FoodData[]>(`${this.baseUrl+ApiEndpoints.GetAllFoodData}`, { headers: this.getHeaders() });
  }

  // Fetch a single employee by ID
  getResumeByEmployeeId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl+ApiEndpoints.GetResumeByEmployeeId+id}`,{ headers: this.getHeaders() });
  }


  GetJwtToken(userDetail:UserDetail): Observable<any> {
    return this.http.post<any>(`${this.baseUrl+ApiEndpoints.UserAuthenticate}`,userDetail, { headers: this.getHeaders() });
  }

  saveFood(foodmenu:FoodMenu): Observable<any> {
    return this.http.post<any>(`${this.baseUrl+ApiEndpoints.saveData}`,foodmenu, { headers: this.getHeadersToken() });
  }

  UpdateData(foodmenu:FoodData): Observable<any> {
    debugger
    return this.http.post<any>(`${this.baseUrl+ApiEndpoints.updateData}`,foodmenu, { headers: this.getHeadersToken() });
  }

  DeleteData(id:number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl+ApiEndpoints.delete}`+id.toString(), { headers: this.getHeadersToken() });
  }
  // Add more endpoints here as needed
}
