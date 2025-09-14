import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-after-login-header',
  imports: [],
  templateUrl: './after-login-header.html',
  styleUrl: './after-login-header.css'
})
export class AfterLoginHeader {
  constructor(private router: Router,private toastr: ToastrService) {}

  navigateTo(path: string) {
    localStorage.clear();
    this.toastr.success("Logout Successfully !!")
    this.router.navigate([path]);
  }
}
