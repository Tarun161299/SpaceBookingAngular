// menucom.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuDataService, MenuItem } from '../../Common/services/menu-service';

@Component({
  selector: 'app-menucom',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent implements OnInit {
  categories: string[] = [];
  
  // Category images and descriptions
  categoryDetails: { 
    [key: string]: { 
      displayName: string; 
      description: string;
      imageUrl: string;
      itemCount: number;
    } 
  } = {};

  constructor(private menuDataService: MenuDataService) {}

  ngOnInit() {
    this.categories = this.menuDataService.getCategories();
    
    // Initialize category details
    this.categories.forEach(category => {
      const items = this.menuDataService.getItemsByCategory(category);
      
      this.categoryDetails[category] = {
        displayName: this.getDisplayName(category),
        description: this.getDescription(category),
        imageUrl: this.getCategoryImage(category),
        itemCount: items.length
      };
    });
  }

  getDisplayName(category: string): string {
    const names: { [key: string]: string } = {
      'Breakfast': 'Morning Delights',
      'Kids Breakfast': 'Little Tummies',
      'Kids Lunch': 'Kids Corner',
      'Kids Fun Box': 'Fun Box',
      'Lunch': 'Lunch Specials',
      'Chips': 'Crispy Sides',
      'Drinks': 'Refreshments',
      'Add-ons': 'Extras'
    };
    return names[category] || category;
  }

  getDescription(category: string): string {
    const descriptions: { [key: string]: string } = {
      'Breakfast': 'Start your day with our delicious breakfast selection',
      'Kids Breakfast': 'Perfect portions for our youngest guests',
      'Kids Lunch': 'Fun and tasty meals for children',
      'Kids Fun Box': 'Exciting surprises for kids',
      'Lunch': 'Hearty meals for your midday break',
      'Chips': 'Golden fried perfection',
      'Drinks': 'Cooling drinks and hot beverages',
      'Add-ons': 'Customize your meal'
    };
    return descriptions[category] || 'Explore our delicious offerings';
  }

  getCategoryImage(category: string): string {
    const imageMap: { [key: string]: string } = {
      'Breakfast': 'https://images.unsplash.com/photo-1553530666-9e3b403cbccc?q=80&w=2070&auto=format&fit=crop',
      'Kids Breakfast': 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?q=80&w=2069&auto=format&fit=crop',
      'Kids Lunch': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop',
      'Kids Fun Box': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop',
      'Lunch': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1980&auto=format&fit=crop',
      'Chips': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1974&auto=format&fit=crop',
      'Drinks': 'https://images.unsplash.com/photo-1561047029-3000c68339ca?q=80&w=1974&auto=format&fit=crop',
      'Add-ons': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop'
    };
    return imageMap[category] || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop';
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'Breakfast': 'fa-sun',
      'Kids Breakfast': 'fa-child',
      'Kids Lunch': 'fa-hamburger',
      'Kids Fun Box': 'fa-gift',
      'Lunch': 'fa-utensils',
      'Chips': 'fa-french-fries',
      'Drinks': 'fa-coffee',
      'Add-ons': 'fa-plus'
    };
    return icons[category] || 'fa-utensils';
  }

  getTotalItems(): number {
    return this.categories.reduce((total, category) => {
      return total + (this.categoryDetails[category]?.itemCount || 0);
    }, 0);
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Breakfast': '#FF9F43',
      'Kids Breakfast': '#54A0FF',
      'Kids Lunch': '#1DD1A1',
      'Kids Fun Box': '#F368E0',
      'Lunch': '#FF6B6B',
      'Chips': '#F79F1F',
      'Drinks': '#1289A7',
      'Add-ons': '#B53471'
    };
    return colors[category] || '#636e72';
  }

  getCategoryGradient(category: string, opacity: number = 0.2): string {
    const gradients: { [key: string]: string } = {
      'Breakfast': `linear-gradient(135deg, rgba(255, 159, 67, ${opacity}), rgba(255, 209, 102, ${opacity}))`,
      'Kids Breakfast': `linear-gradient(135deg, rgba(84, 160, 255, ${opacity}), rgba(46, 134, 222, ${opacity}))`,
      'Kids Lunch': `linear-gradient(135deg, rgba(29, 209, 161, ${opacity}), rgba(16, 172, 132, ${opacity}))`,
      'Kids Fun Box': `linear-gradient(135deg, rgba(243, 104, 224, ${opacity}), rgba(255, 159, 243, ${opacity}))`,
      'Lunch': `linear-gradient(135deg, rgba(255, 107, 107, ${opacity}), rgba(238, 90, 36, ${opacity}))`,
      'Chips': `linear-gradient(135deg, rgba(247, 159, 31, ${opacity}), rgba(255, 195, 18, ${opacity}))`,
      'Drinks': `linear-gradient(135deg, rgba(18, 137, 167, ${opacity}), rgba(18, 203, 196, ${opacity}))`,
      'Add-ons': `linear-gradient(135deg, rgba(181, 52, 113, ${opacity}), rgba(237, 76, 103, ${opacity}))`
    };
    return gradients[category] || `linear-gradient(135deg, rgba(99, 110, 114, ${opacity}), rgba(99, 110, 114, ${opacity}))`;
  }
}