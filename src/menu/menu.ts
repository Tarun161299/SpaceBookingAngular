import { Component } from '@angular/core';
import { FoodService } from '../Common/services/food-Services';
import { FoodData } from '../Model/FoodData';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  foodData:FoodData[]=[];
constructor(private foodService:FoodService,private router: Router) {}
ngOnInit(): void {
  // This code runs when the page/component loads
  console.log('Page loaded!');
   this.loadAllFoodData();
}
loadAllFoodData(){
  debugger
this.foodService.getAllFoodDetails().subscribe({
  next: (res:any) => {
    debugger
    this.foodData= res;
  },
  error: (err) => {
    console.error('Error fetching records', err);
  }
});;
}

navigateTo(path: string) {
  debugger
  this.router.navigate([path]);
}
}
