// menu-data.service.ts
import { Injectable } from '@angular/core';

export interface MenuItem {
  id: number;
  category: string;
  subcategory?: string;
  name: string;
  description?: string;
  price?: number | string;
  priceRange?: { small?: number; large?: number; regular?: number };
  options?: string[];
  dietaryInfo?: {
    glutenFree?: boolean;
    vegetarian?: boolean;
    vegan?: boolean;
  };
  addOns?: { name: string; price: number | string }[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {
  private menuItems: MenuItem[] = [];

  constructor() {
    this.initializeMenu();
  }

  private initializeMenu() {
    this.menuItems = [
      // Kids Breakfast
      {
        id: 1,
        category: 'Kids Breakfast',
        name: 'Kids Eggs Your Way',
        description: 'Scrambled / Fried(2) / Poached(2) On White Toast',
        price: 12.00,
        addOns: [
          { name: 'Bacon', price: 4 },
          { name: 'Sausage', price: 2.5 },
          { name: 'Tomato Sauce', price: 0.50 }
        ],
        dietaryInfo: { glutenFree: true, vegetarian: true }
      },
      {
        id: 2,
        category: 'Kids Breakfast',
        name: 'Kids Pancakes/waffle Stack',
        description: 'Choose From: Nutella, Banana & Ice-cream / Strawberries, Ice Cream & Maple Syrup',
        price: 16.50,
        dietaryInfo: { glutenFree: true }
      },
      {
        id: 3,
        category: 'Kids Breakfast',
        name: 'Kids Bacon & Egg Roll',
        description: 'Fried Egg & Bacon With Tomato Sauce',
        price: 10.50,
        dietaryInfo: { glutenFree: true, vegetarian: true }
      },
      {
        id: 4,
        category: 'Kids Breakfast',
        name: 'Kids Burrito',
        description: 'Bacon, Egg And Mozzarella Cheese With Tomato Sauce',
        price: 15.00
      },

      // Breakfast Menu
      {
        id: 11,
        category: 'Breakfast',
        name: 'BIG URBAN BREAKFAST',
        description: 'Two eggs your way, bacon, local sausage, chorizo, grilled herb tomato, hash brown, mushrooms, halloumi & sourdough toast',
        price: 26,
        dietaryInfo: { glutenFree: true, vegetarian: true, vegan: true }
      },
      {
        id: 12,
        category: 'Breakfast',
        name: 'EGGS BENEDICT',
        description: 'Poached eggs on Turkish bread with baby spinach & house-made hollandaise',
        price: 16,
        dietaryInfo: { glutenFree: true, vegetarian: true },
        addOns: [
          { name: 'Bacon', price: 5 },
          { name: 'Hash Brown', price: 3 },
          { name: 'Smoked Salmon', price: 7 }
        ]
      },
      {
        id: 13,
        category: 'Breakfast',
        name: 'WAFFLES OR PANCAKES',
        description: 'Fluffy stack with maple syrup, seasonal berries & vanilla cream',
        price: 19,
        dietaryInfo: { vegetarian: true }
      },
      {
        id: 14,
        category: 'Breakfast',
        name: 'VEGAN BREKKIE BOWL',
        description: 'Grilled tofu, roasted vegetables, quinoa, avocado & hummus',
        price: 26,
        dietaryInfo: { glutenFree: true, vegan: true }
      },
      {
        id: 15,
        category: 'Breakfast',
        name: 'SMASHED AVO & FETA TOAST',
        description: 'Smashed avocado, smoked salmon, crumbled feta, poached egg & Hollandaise sauce',
        price: 26,
        dietaryInfo: { glutenFree: true, vegetarian: true }
      },
      {
        id: 16,
        category: 'Breakfast',
        name: 'SPANISH OMELETTE',
        description: 'Local chorizo, bacon, ham, mushrooms, tomato, Persian feta & mozzarella Served with sourdough or Turkish bread',
        price: 24,
        dietaryInfo: { glutenFree: true, vegetarian: true }
      },
      {
        id: 17,
        category: 'Breakfast',
        name: 'BREAKFAST BURRITO',
        description: 'Local chorizo, bacon, Spanish onion, scrambled eggs & mozzarella Wrapped in a warm tortilla',
        price: 24
      },
      {
        id: 18,
        category: 'Breakfast',
        name: 'CORN & ZUCCHINI FRITTERS',
        description: 'Three golden fritters with avocado, crispy prosciutto, poached egg & house-made chili jam',
        price: 24,
        dietaryInfo: { glutenFree: true, vegetarian: true }
      },
      {
        id: 19,
        category: 'Breakfast',
        name: 'BREAKFAST ROLL',
        description: 'Bacon & egg on Turkish bread with house-made tomato relish',
        price: 14,
        dietaryInfo: { glutenFree: true },
        addOns: [
          { name: 'Hash Brown', price: 3 },
          { name: 'Avocado', price: 4 },
          { name: 'Mushrooms', price: 4 },
          { name: 'Hollandaise', price: 3 },
          { name: 'With the lot', price: 22 }
        ]
      },
      {
        id: 20,
        category: 'Breakfast',
        name: 'BREKKIE BRUSCHETTA',
        description: 'Grilled tomato & onion, poached eggs, pesto sourdough & balsamic drizzle',
        price: 22,
        dietaryInfo: { glutenFree: true, vegetarian: true }
      },
      {
        id: 21,
        category: 'Breakfast',
        name: 'MUSHROOM STEAK',
        description: 'Grilled flat mushroom, sun-dried tomato, Persian feta, hash brown, poached egg, pesto sourdough & house hollandaise',
        price: 22,
        dietaryInfo: { glutenFree: true, vegetarian: true, vegan: true }
      },
      {
        id: 22,
        category: 'Breakfast',
        name: 'SWEET POTATO RÖSTI',
        description: 'Crispy sweet potato rosti with chorizo, halloumi, poached egg & drizzled hollandaise',
        price: 26,
        dietaryInfo: { glutenFree: true }
      },
      {
        id: 23,
        category: 'Breakfast',
        name: 'GRANOLA',
        description: 'House-made toasted oats with mixed nuts and seeds, lightly sweetened and baked until golden. Served with creamy yoghurt and seasonal fresh fruit.',
        price: 24
      },

      // Kids Lunch
      {
        id: 24,
        category: 'Kids Lunch',
        name: 'Kids Meat Balls',
        description: 'Serve With Linguine With Tomato Basil Sauce',
        price: 17.00
      },
      {
        id: 25,
        category: 'Kids Lunch',
        name: 'Kids Big Beef Burger',
        description: 'Housemade Beef Patty, Lettuce, Tomato, Beetroot & Tasty Cheese Served With Chips & Tomato Sauce',
        price: 16.5,
        dietaryInfo: { glutenFree: true }
      },
      {
        id: 26,
        category: 'Kids Lunch',
        name: 'Kids Chicken, Bacon & Cheese Burger',
        description: 'Chicken Patty, Bacon & Tasty Cheese Served With Chips & Tomato Sauce',
        price: 16.5
      },
      {
        id: 27,
        category: 'Kids Lunch',
        name: 'Kids Chicken Tenders',
        description: 'Crumbed Chicken Tenders, Served with Chips & Tomato Sauce',
        price: 14
      },
      {
        id: 28,
        category: 'Kids Lunch',
        name: 'Kids Fish & Chips',
        description: 'Batter Flathead with chips & Tomato Sauce',
        price: 16
      },
      {
        id: 29,
        category: 'Kids Lunch',
        name: 'Kids Mini Pizzas',
        description: 'House Made Pizza of Your choice served with chips & Tomato Sauce',
        addOns: [
          { name: 'Ham, Pineapple & Cheese on Tomato Base', price: 11.5 },
          { name: 'Chicken, bacon & Cheese On Bbq Base', price: 11.5 },
          { name: 'Cheese on Tomato base', price: 9.50 }
        ]
      },
      {
        id: 30,
        category: 'Kids Lunch',
        name: 'Kids Loaded Chips',
        description: 'Chips Topped with Melted Mozzarella Cheese & Bacon with Choice Of Tomato or Bbq Sauce',
        price: 14.50,
        dietaryInfo: { glutenFree: true }
      },

      // Kids Fun Box
      {
        id: 31,
        category: 'Kids Fun Box',
        name: 'Kids Fun Box',
        description: 'Sandwich, Sweet Treat, Bag Of Chips & Apple Popper Juice & Surprise',
        dietaryInfo: { glutenFree: true }
      },

      // Lunch Menu - Burgers
      {
        id: 32,
        category: 'Lunch',
        subcategory: 'Burgers',
        name: 'PULLED PORK BURGER',
        description: 'Slow-cooked pulled pork, house apple slaw, BBQ sauce Served with fries',
        price: 24,
        dietaryInfo: { glutenFree: true }
      },
      {
        id: 33,
        category: 'Lunch',
        subcategory: 'Burgers',
        name: 'FALAFEL BURGER',
        description: 'Crispy falafel, avocado, lettuce, tomato & vegan aioli Served with chips',
        price: 22,
        dietaryInfo: { glutenFree: true, vegetarian: true, vegan: true }
      },
      {
        id: 34,
        category: 'Lunch',
        subcategory: 'Burgers',
        name: 'CHICKEN SCHNITZEL BURGER',
        description: 'Crispy chicken schnitzel, lettuce, tomato, cheese & aioli',
        price: 22,
        dietaryInfo: { glutenFree: true }
      },
      {
        id: 35,
        category: 'Lunch',
        subcategory: 'Burgers',
        name: 'BEEF BURGER',
        description: 'Double beef patty, tasty cheese, lettuce, tomato, beetroot, bacon & fried egg Served with fries & aioli',
        price: 26,
        dietaryInfo: { glutenFree: true }
      },
      {
        id: 36,
        category: 'Lunch',
        subcategory: 'Burgers',
        name: 'STEAK SANDWICH',
        description: 'Grilled scotch fillet, caramelized onion, tomato, lettuce, beetroot & cheese Served on Turkish bread with BBQ sauce & fries',
        price: 24,
        dietaryInfo: { glutenFree: true }
      },

      // Lunch Menu - Mains
      {
        id: 37,
        category: 'Lunch',
        subcategory: 'Mains',
        name: 'CHICKEN PARMIGIANA',
        description: 'Crispy schnitzel topped with Napoli sauce, Ham slice & melted cheese Served with fresh Greek salad',
        price: 26,
        dietaryInfo: { glutenFree: true }
      },
      {
        id: 38,
        category: 'Lunch',
        subcategory: 'Mains',
        name: 'PULLED PORK TACOS',
        description: 'Slow-cooked pulled pork, apple slaw, avocado & smoky BBQ sauce Served with chips',
        price: 24,
        dietaryInfo: { glutenFree: true }
      },
      {
        id: 39,
        category: 'Lunch',
        subcategory: 'Mains',
        name: 'CLASSIC BOLOGNESE',
        description: 'Linguine with rich beef & tomato ragu, parmesan & herbs',
        price: 24
      },
      {
        id: 40,
        category: 'Lunch',
        subcategory: 'Mains',
        name: 'CHICKEN PESTO PASTA',
        description: 'Linguine with grilled chicken, pesto, cherry tomatoes & parmesan',
        price: 24
      },
      {
        id: 41,
        category: 'Lunch',
        subcategory: 'Mains',
        name: 'GARLIC PRAWN PASTA',
        description: 'Linguine with garlic prawns, white wine, olive oil, chilli & parsley',
        price: 27
      },
      {
        id: 42,
        category: 'Lunch',
        subcategory: 'Mains',
        name: 'CREAMY MUSHROOM & SPINACH PASTA',
        description: 'Linguine with creamy mushrooms sauce, spinach finish with parmesan cheese',
        price: 22
      },
      {
        id: 43,
        category: 'Lunch',
        subcategory: 'Mains',
        name: 'GRILLED SALMON & AVOCADO SALAD',
        description: 'Pan-seared salmon with avocado, mango salad & pesto drizzle',
        price: 26,
        dietaryInfo: { glutenFree: true }
      },
      {
        id: 44,
        category: 'Lunch',
        subcategory: 'Mains',
        name: 'CLASSIC LOADED BEEF NACHOS',
        description: 'Tortilla chips topped with seasoned beef & melted cheese Served with sour cream & fresh coriander',
        price: 26,
        dietaryInfo: { glutenFree: true }
      },
      {
        id: 45,
        category: 'Lunch',
        subcategory: 'Mains',
        name: 'CHICKEN QUESADILLAS',
        description: 'Tomato, onion, capsicum, avocado & mozzarella Served with aioli & chips',
        price: 22
      },

      // Chips Section
      {
        id: 46,
        category: 'Chips',
        subcategory: 'Bowl Of Chips',
        name: 'Straight Cut Chips With Tomato Sauce',
        priceRange: { small: 8.00, large: 12.00 }
      },
      {
        id: 47,
        category: 'Chips',
        subcategory: 'Bowl Of Chips',
        name: 'Sweet Potato Chips',
        priceRange: { small: 12.00, large: 16.00 }
      },
      {
        id: 48,
        category: 'Chips',
        subcategory: 'Bowl Of Chips',
        name: 'Sidewinders',
        priceRange: { small: 12.00, large: 16.00 }
      },
      {
        id: 49,
        category: 'Chips',
        subcategory: 'Bowl Of Chips',
        name: 'Wedges',
        priceRange: { small: 12.00, large: 16.00 }
      },

      // Hot Coffees
      {
        id: 50,
        category: 'Drinks',
        subcategory: 'Hot Coffees & Specialty Latte',
        name: 'Cappuccino',
        priceRange: { small: 5, regular: 6, large: 6.5 }
      },
      {
        id: 51,
        category: 'Drinks',
        subcategory: 'Hot Coffees & Specialty Latte',
        name: 'Flat White',
        priceRange: { small: 5, regular: 6, large: 6.5 }
      },
      {
        id: 52,
        category: 'Drinks',
        subcategory: 'Hot Coffees & Specialty Latte',
        name: 'Latte',
        priceRange: { small: 5, regular: 6, large: 6.5 }
      },
      {
        id: 53,
        category: 'Drinks',
        subcategory: 'Hot Coffees & Specialty Latte',
        name: 'Mocha',
        priceRange: { small: 6, regular: 6.5, large: 7 }
      },
      {
        id: 54,
        category: 'Drinks',
        subcategory: 'Hot Coffees & Specialty Latte',
        name: 'White Mocha',
        priceRange: { small: 6, regular: 6.5, large: 7 }
      },
      {
        id: 55,
        category: 'Drinks',
        subcategory: 'Hot Coffees & Specialty Latte',
        name: 'Long Black',
        priceRange: { small: 5, regular: 6, large: 6.5 }
      },
      {
        id: 56,
        category: 'Drinks',
        subcategory: 'Hot Coffees & Specialty Latte',
        name: 'Espresso / Macchiato / Piccolo / Affogato',
        price: 4.5
      },
      {
        id: 57,
        category: 'Drinks',
        subcategory: 'Milk Options',
        name: 'Milk Options',
        description: 'Full cream, skim, oat, almond, soy (+$1)'
      },

      // Specialty Lattes & Hot Drinks
      {
        id: 58,
        category: 'Drinks',
        subcategory: 'Specialty Lattes & Hot Drinks',
        name: 'Dirty Chai Latte',
        priceRange: { small: 6, regular: 6.5, large: 7 }
      },
      {
        id: 59,
        category: 'Drinks',
        subcategory: 'Specialty Lattes & Hot Drinks',
        name: 'Matcha Latte',
        priceRange: { small: 6, regular: 6.5, large: 7 }
      },
      {
        id: 60,
        category: 'Drinks',
        subcategory: 'Specialty Lattes & Hot Drinks',
        name: 'Turmeric Latte',
        priceRange: { small: 6, regular: 6.5, large: 7 }
      },
      {
        id: 61,
        category: 'Drinks',
        subcategory: 'Specialty Lattes & Hot Drinks',
        name: 'Hot Chocolate',
        priceRange: { small: 6, regular: 6.5, large: 7 }
      },
      {
        id: 62,
        category: 'Drinks',
        subcategory: 'Specialty Lattes & Hot Drinks',
        name: 'White Hot Chocolate',
        priceRange: { small: 6, regular: 6.5, large: 7 }
      },
      {
        id: 63,
        category: 'Drinks',
        subcategory: 'Specialty Lattes & Hot Drinks',
        name: 'Babyccino',
        price: 3.5
      },

      // Extras & Flavours
      {
        id: 64,
        category: 'Drinks',
        subcategory: 'Extras & Flavours',
        name: 'Extras & Flavours',
        description: 'Extra shot • Decaf • Syrups (Caramel, Vanilla, Hazelnut, Irish Cream) • Marshmallows • Whipped cream',
        price: '+$1 each'
      },

      // Iced Drinks
      {
        id: 65,
        category: 'Drinks',
        subcategory: 'Iced Drinks',
        name: 'Iced Latte',
        price: 8.5
      },
      {
        id: 66,
        category: 'Drinks',
        subcategory: 'Iced Drinks',
        name: 'Iced Long Black',
        price: 9.5
      },
      {
        id: 67,
        category: 'Drinks',
        subcategory: 'Iced Drinks',
        name: 'Iced Mocha',
        price: 9.5
      },
      {
        id: 68,
        category: 'Drinks',
        subcategory: 'Iced Drinks',
        name: 'Iced White Mocha',
        price: 9.5
      },
      {
        id: 69,
        category: 'Drinks',
        subcategory: 'Iced Drinks',
        name: 'Iced Coffee',
        price: 9.5
      },
      {
        id: 70,
        category: 'Drinks',
        subcategory: 'Iced Drinks',
        name: 'Iced Chocolate / White Chocolate',
        price: 9.5
      },

      // Frappes
      {
        id: 71,
        category: 'Drinks',
        subcategory: 'Frappes',
        name: 'Coffee Frappe',
        description: 'Blended icy drinks with milk, ice cream & Flavour syrup',
        price: 11
      },
      {
        id: 72,
        category: 'Drinks',
        subcategory: 'Frappes',
        name: 'Mocha Frappe',
        description: 'Blended icy drinks with milk, ice cream & Flavour syrup',
        price: 11
      },
      {
        id: 73,
        category: 'Drinks',
        subcategory: 'Frappes',
        name: 'Caramel Frappe',
        description: 'Blended icy drinks with milk, ice cream & Flavour syrup',
        price: 11
      },
      {
        id: 74,
        category: 'Drinks',
        subcategory: 'Frappes',
        name: 'Cookies & Cream Frappe',
        description: 'Blended icy drinks with milk, ice cream & Flavour syrup',
        price: 11
      },
      {
        id: 75,
        category: 'Drinks',
        subcategory: 'Frappes',
        name: 'Tim Tam Frappe',
        description: 'Australia\'s favourite biscuit blended with milk and ice cream — a rich, indulgent Aussie classic.',
        price: 11
      },

      // Fresh Juices
      {
        id: 76,
        category: 'Drinks',
        subcategory: 'Fresh Juices',
        name: 'Orange Sunshine',
        description: 'Fresh orange juice, bright & refreshing',
        price: 10.5
      },
      {
        id: 77,
        category: 'Drinks',
        subcategory: 'Fresh Juices',
        name: 'Watermelon Mint Cooler',
        description: 'Watermelon, mint & lime',
        price: 10.5
      },
      {
        id: 78,
        category: 'Drinks',
        subcategory: 'Fresh Juices',
        name: 'Tropical Twist',
        description: 'Pineapple, mango & passionfruit',
        price: 10.5
      },
      {
        id: 79,
        category: 'Drinks',
        subcategory: 'Fresh Juices',
        name: 'Green Glow',
        description: 'Kale, cucumber, apple, lemon & ginger',
        price: 10.5
      },
      {
        id: 80,
        category: 'Drinks',
        subcategory: 'Fresh Juices',
        name: 'Apple Zing',
        description: 'Green apple, celery & lemon',
        price: 10.5
      },
      {
        id: 81,
        category: 'Drinks',
        subcategory: 'Fresh Juices',
        name: 'Carrot Cleanse',
        description: 'Carrot, orange, apple & turmeric',
        price: 10.5
      },
      {
        id: 82,
        category: 'Drinks',
        subcategory: 'Fresh Juices',
        name: 'Sunset Splash',
        description: 'Orange, strawberry & pineapple',
        price: 10.5
      },
      {
        id: 83,
        category: 'Drinks',
        subcategory: 'Fresh Juices',
        name: 'Citrus Refresher',
        description: 'Orange, grapefruit & lemon',
        price: 10.5
      },
      {
        id: 84,
        category: 'Drinks',
        subcategory: 'Fresh Juices',
        name: 'Berry Breeze',
        description: 'Mixed berries, apple & lime',
        price: 10.5
      },
      {
        id: 85,
        category: 'Drinks',
        subcategory: 'Fresh Juices',
        name: 'Summer Detox 🌱',
        description: 'Beetroot, carrot, apple, celery & lemon',
        price: 10.5
      },

      // Smoothies
      {
        id: 86,
        category: 'Drinks',
        subcategory: 'Smoothies',
        name: 'Açai Smoothie 🌱',
        description: 'Açai, banana, blueberry & coconut water',
        price: 10.5
      },
      {
        id: 87,
        category: 'Drinks',
        subcategory: 'Smoothies',
        name: 'Berry Blast',
        description: 'Mixed berries, banana & coconut milk',
        price: 10.5
      },
      {
        id: 88,
        category: 'Drinks',
        subcategory: 'Smoothies',
        name: 'Mango Passion',
        description: 'Mango, passionfruit & yoghurt',
        price: 10.5
      },
      {
        id: 89,
        category: 'Drinks',
        subcategory: 'Smoothies',
        name: 'Banana Honey',
        description: 'Banana, oats, honey, cinnamon & milk',
        price: 10.5
      },
      {
        id: 90,
        category: 'Drinks',
        subcategory: 'Smoothies',
        name: 'Green Power 🌿',
        description: 'Spinach, avocado, apple, chia & almond milk',
        price: 10.5
      },

      // Add-ons (existing)
      {
        id: 100,
        category: 'Add-ons',
        name: 'Chip Add-ons',
        description: 'Available for all chip bowls',
        addOns: [
          { name: 'Sour Cream', price: 3 },
          { name: 'Sweet Chilli Sauce', price: 3 },
          { name: 'Aioli', price: 3 },
          { name: 'Gravy', price: 3 },
          { name: 'Tomato Sauce', price: 0.50 },
          { name: 'BBQ Sauce', price: 0.50 }
        ]
      }
    ];
  }

  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }

  getCategories(): string[] {
    return [...new Set(this.menuItems.map(item => item.category))];
  }

  getItemsByCategory(category: string): MenuItem[] {
    return this.menuItems.filter(item => item.category === category);
  }

  getSubcategories(category: string): string[] {
    const items = this.getItemsByCategory(category);
    const subcategories = items.map(item => item.subcategory).filter(Boolean);
    return [...new Set(subcategories)] as string[];
  }
}