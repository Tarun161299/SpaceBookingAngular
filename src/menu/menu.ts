import { Component } from '@angular/core';
import { FoodService } from '../Common/services/food-Services';
import { FoodData } from '../Model/FoodData';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LoaderService } from '../Common/services/loader-service';
import { MenuComponent } from '../Before Login/menuComponent/menu';
@Component({
  selector: 'app-menu',
  imports: [CommonModule,MenuComponent],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  foodData:FoodData[]=[];
constructor(private foodService:FoodService,private router: Router,private loaderService:LoaderService) {}
ngOnInit(): void {
  debugger
  // This code runs when the page/component loads
  console.log('Page loaded!');
  this.loaderService.show();
   this.loadAllFoodData();
}
loadAllFoodData(){
  debugger
this.foodService.getAllFoodDetails().subscribe({
  next: (res:any) => {
    debugger
    this.foodData= res;
    this.loaderService.hide();
  },
  error: (err) => {
    console.error('Error fetching records', err);
      this.loaderService.hide();
  }
});;
}

navigateTo(path: string) {
  debugger
  this.router.navigate([path]);
}
}
