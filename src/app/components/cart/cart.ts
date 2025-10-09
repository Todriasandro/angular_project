import { Component } from '@angular/core';
import { Tools } from '../../tools';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [NgIf, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  public cartList:any[]=[]; 
  private cartSibscription:Subscription|undefined;
  constructor(private service:Tools){

    this.loadCartItem()
  }

  loadCartItem(){
    this.cartList=[]; 
    this.cartSibscription = this.service.allBaskets().subscribe((data:any[])=>{
      this.cartList=data
    })
  }

  removeItem(productId:number){
    this.service.removeFromCart(productId).subscribe({
      next:()=>{
        this.loadCartItem()
      }, 
      error:(err)=>{
        console.error("Error", err)
      }
    })
  }
  calculateTotalPrice():number{
    return this.cartList.reduce((total, item)=>total+item.price*item.quantity,0)
  }
  updateBasket(item:any){
    
  }
}
