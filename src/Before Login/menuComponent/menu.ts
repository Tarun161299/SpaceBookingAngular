import { Component, OnInit } from '@angular/core';  

import { CommonModule } from '@angular/common';
import { MenuDataService, MenuItem } from '../../Common/services/menu-service';
@Component({
  selector: 'app-menucom',
    standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent implements OnInit {
  categories: string[] = [];
  selectedCategory: string = '';
  menuItems: MenuItem[] = [];
  subcategories: string[] = [];

  constructor(private menuDataService: MenuDataService) {}

  ngOnInit() {
    debugger
    this.categories = this.menuDataService.getCategories();
    if (this.categories.length > 0) {
      this.selectCategory(this.categories[0]);
    }
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.menuItems = this.menuDataService.getItemsByCategory(category);
    this.subcategories = this.menuDataService.getSubcategories(category);
  }

  getItemsBySubcategory(subcategory: string): MenuItem[] {
    return this.menuItems.filter(item => item.subcategory === subcategory);
  }

  getDietaryInfo(item: MenuItem): string[] {
    const info = [];
    if (item.dietaryInfo?.glutenFree) info.push('GF');
    if (item.dietaryInfo?.vegetarian) info.push('VEG');
    if (item.dietaryInfo?.vegan) info.push('Vegan');
    return info;
  }
}
