// category-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuDataService, MenuItem } from '../../../Common/services/menu-service';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-details.html',
  styleUrls: ['./category-details.css']
})
export class CategoryDetailComponent implements OnInit {
  categoryName: string = '';
  menuItems: MenuItem[] = [];
  subcategories: string[] = [];
  
  // Filtered arrays for drinks category
  hotDrinks: MenuItem[] = [];
  icedDrinks: MenuItem[] = [];
  frappes: MenuItem[] = [];
  freshJuices: MenuItem[] = [];
  smoothies: MenuItem[] = [];
  
  // Category to icon mapping
  categoryIcons: { [key: string]: string } = {
    'Breakfast': 'fa-sun',
    'Kids Breakfast': 'fa-child',
    'Kids Lunch': 'fa-hamburger',
    'Kids Fun Box': 'fa-gift',
    'Lunch': 'fa-utensils',
    'Chips': 'fa-french-fries',
    'Drinks': 'fa-coffee',
    'Add-ons': 'fa-plus'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuDataService: MenuDataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryName = params['category'];
      this.loadCategoryData();
    });
  }

  loadCategoryData() {
    this.menuItems = this.menuDataService.getItemsByCategory(this.categoryName);
    this.subcategories = this.menuDataService.getSubcategories(this.categoryName);
    
    // Initialize filtered arrays for drinks category
    if (this.categoryName === 'Drinks') {
      this.hotDrinks = this.menuItems.filter(item => 
        item.subcategory === 'Hot Coffees & Specialty Latte' || 
        item.subcategory === 'Specialty Lattes & Hot Drinks');
      
      this.icedDrinks = this.menuItems.filter(item => 
        item.subcategory === 'Iced Drinks');
      
      this.frappes = this.menuItems.filter(item => 
        item.subcategory === 'Frappes');
      
      this.freshJuices = this.menuItems.filter(item => 
        item.subcategory === 'Fresh Juices');
      
      this.smoothies = this.menuItems.filter(item => 
        item.subcategory === 'Smoothies');
    }
  }

  getItemsBySubcategory(subcategory: string): MenuItem[] {
    return this.menuItems.filter(item => item.subcategory === subcategory);
  }

  getItemsWithoutSubcategory(): MenuItem[] {
    return this.menuItems.filter(item => !item.subcategory);
  }

  formatPrice(price: any): string {
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    return price || '';
  }

  getDisplayPrice(item: MenuItem): string {
    if (item.priceRange) {
      const prices = [];
      if (item.priceRange.small) prices.push(`S: $${this.formatPrice(item.priceRange.small)}`);
      if (item.priceRange.large) prices.push(`L: $${this.formatPrice(item.priceRange.large)}`);
      if (item.priceRange.regular) prices.push(`$${this.formatPrice(item.priceRange.regular)}`);
      return prices.join(' / ');
    }
    return item.price ? `$${this.formatPrice(item.price)}` : '';
  }

  getCategoryIcon(): string {
    return this.categoryIcons[this.categoryName] || 'fa-utensils';
  }

  goBack() {
    this.router.navigate(['/menu']);
  }

  getDietaryInfo(item: MenuItem): string {
    const info = [];
    if (item.dietaryInfo?.glutenFree) info.push('GF');
    if (item.dietaryInfo?.vegetarian) info.push('VEG');
    if (item.dietaryInfo?.vegan) info.push('Vegan option');
    return info.join(' / ');
  }

  // Helper method to get item list for display
  getItemsForDisplay(subcategory: string): MenuItem[] {
    return this.menuItems.filter(item => item.subcategory === subcategory);
  }
}