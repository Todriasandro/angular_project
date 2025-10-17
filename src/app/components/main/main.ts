import { Component } from '@angular/core';
import { Tools } from '../../tools';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule,CommonModule],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Main {
  public allProducts: any;
  public categories: any;
  public activeCategory: number = 0;
  public spiciness: string = "-1";
  public nuts: any = "";
  public vegetarian: any = "";

  constructor(public tools: Tools, private snackBar: MatSnackBar) {
    this.allCards();
    this.allCategories();
  }


  allCards() {
    this.activeCategory = 0;
    this.tools.getAllProducts().subscribe((data: any) => this.allProducts = data);
  }

  
  allCategories() {
    this.tools.getAllCategories().subscribe((data: any) => this.categories = data);
  }

 
  filterByCategory(id: any) {
    this.activeCategory = id;
    this.tools.filterCategory(id).subscribe((data: any) => this.allProducts = data.products);
  }

 
  fillterFoods() {
    const spc = this.spiciness === "-1" ? "" : this.spiciness;
    this.tools.filterAllFood(spc, this.nuts, this.vegetarian).subscribe((data: any) => {
      this.allProducts = data;
    });
  }

 
  reset() {
    this.nuts = "";
    this.vegetarian = "";
    this.spiciness = "-1";
    this.allCards();
  }


  addToCart(item: any) {
    this.tools.allBaskets().subscribe((cartItems: any[]) => {
      const existingItem = cartItems.find(ci => ci.product.id === item.id);

      if (existingItem) {
        const updatedItem = {
          quantity: existingItem.quantity + 1,
          price: item.price,
          productId: item.id
        };
        this.tools.updateCart(updatedItem).subscribe({
          next: () => this.showSnack('Product quantity updated 🛒', 'Success', 'snack-success'),
          error: () => this.showSnack('Update failed ❌', 'Error', 'snack-error')
        });
      } else {
        const cartInfo = {
          quantity: 1,
          price: item.price,
          productId: item.id
        };
        this.tools.postCard(cartInfo).subscribe({
          next: () => this.showSnack('Product added to cart 🛒', 'Success', 'snack-success'),
          error: () => this.showSnack('Failed to add ❌', 'Error', 'snack-error')
        });
      }
    });
  }


  private showSnack(message: string, action: string, cssClass: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snack-success'] 
    }); 
  }
    public username: string = '';

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
  }
  
}
