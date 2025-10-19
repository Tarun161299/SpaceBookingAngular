import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../../Common/services/food-Services';
import { CommonModule } from '@angular/common';
import { UserDetail } from '../../Model/UserDetail';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { LoaderService } from '../../Common/services/loader-service';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule,FormsModule   ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})


export class LoginComponent {
  username:string="";
  pwd:string="";
constructor(private router: Router,private foodService:FoodService,private toastr: ToastrService,private loaderService:LoaderService) {}
userdata:UserDetail | undefined;
onLogin(){
  debugger
  debugger
  this.userdata={
    userName:this.username,
    password: this.pwd
  }
  this.loaderService.show();
this.foodService.GetJwtToken(this.userdata).subscribe((data:any)=>{
  debugger
  if(data=="Invalid User"){
 this.toastr.error("invalid Username or Password !", 'Error')
 this.loaderService.hide();
  }
  else{

    localStorage.setItem('token',data);
    this.loaderService.hide();
 this.toastr.success("Login Successfully", 'Success')
 this.router.navigate(['/welcome/dashboard']);
  }
})
  
}
}
