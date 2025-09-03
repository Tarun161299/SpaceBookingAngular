import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-befor-login-header',
  imports: [CommonModule],
  templateUrl: './befor-login-header.html',
  styleUrl: './befor-login-header.css'
})
export class BeforLoginHeader {
constructor(private router: Router){}
showHome:boolean=true
navigateTo(path: string) {
  debugger
  this.showHome=!this.showHome
  this.router.navigate([path]);
}
}
