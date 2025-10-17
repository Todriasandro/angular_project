import { Component } from '@angular/core';
import { Tools } from '../../tools';
import { Subscription } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {
  public cartList: any[] = [];
  private cartSubscription: Subscription | undefined;

  constructor(private service: Tools) {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartList = [];
    this.cartSubscription = this.service.allBaskets().subscribe((data: any[]) => {
      this.cartList = data;
    });
  }

  removeItem(productId: number) {
    this.service.removeFromCart(productId).subscribe({
      next: () => {
      
        this.cartList = this.cartList.filter(item => item.product.id !== productId);
      },
      error: (err) => {
        console.error("Error", err);
      }
    });
  }

  calculateTotalPrice(): number {
    return this.cartList.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  updateBasket(item: any) {
    const body = {
      quantity: item.quantity,
      price: item.price,
      productId: item.product.id
    };

    this.service.updateCart(body).subscribe({
      next: () => {
    
      },
      error: (err) => {
        console.error("შეცდომა კალათის განახლებისას:", err);
      }
    });
  }

 
  isCartEmpty(): boolean {
    return this.cartList.length === 0;
  }
  
}
