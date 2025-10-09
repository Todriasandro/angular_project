import { Component } from '@angular/core';
import { Tools } from '../../tools';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [FormsModule],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {
  public allProducts:any;
  public categories:any; 
  public activeCategory:number=0;
  public spiciness:string="-1"; 
  public nuts:any=""; 
  public vegetarian:any=""
  

  constructor(public tools:Tools){
    this.allCards();
    this.allCategories()

  }

  allCards(){
    this.activeCategory=0;
    this.tools.getAllProducts().subscribe((data:any)=>this.allProducts=data)
  }

  allCategories(){
    this.tools.getAllCategories().subscribe((data:any)=>this.categories=data)
  }

  filterByCategory(id:any){
    this.activeCategory=id;
    this.tools.filterCategory(id).subscribe((data:any)=>this.allProducts=data.products)
  }
  fillterFoods(){
    let spc; 
    if(this.spiciness=="-1"){
      spc=""
    }else{
      spc=this.spiciness;
    }
    this.tools.filterAllFood(spc,this.nuts,this.vegetarian).subscribe((data:any)=>{
      this.allProducts=data;

    })
  }
  reset(){
    this.nuts=""; 
    this.vegetarian="";
    this.spiciness="-1";
    this.allCards();
  }
  addToCart(item:any){
    this.tools.allBaskets().subscribe((cartItems:any[])=>{
      const existingItem = cartItems.find(ci=>ci.product.id===item.id)

      if(existingItem){
        const updatedItem = {
          quantity:existingItem.quantity+1,
          price:item.price,
          productId:item.id
        }
        this.tools.updateCart(updatedItem).subscribe(()=>{
          alert("რაოდენობა განახლდა")
        })
      }else{
        const cartInfo={
          quantity:1, 
          price:item.price,
          productId:item.id
        }
        this.tools.postCard(cartInfo).subscribe(()=>{
          alert("პროდუცქტი დაემატა")
        })
      }

    })
  }




}
