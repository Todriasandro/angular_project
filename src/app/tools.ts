import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Tools {
  login(_value: any) {
    throw new Error('Method not implemented.');
  }
  constructor(public http: HttpClient) {}

  getAllProducts() {
    return this.http.get('https://restaurant.stepprojects.ge/api/Products/GetAll');
  }
  getAllCategories() {
    return this.http.get('https://restaurant.stepprojects.ge/api/Categories/GetAll');
  }
  filterCategory(id:any){
    return this.http.get(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
  }
  filterAllFood(spiciness:any,nuts:any,veget:any){
    return this.http.get(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${veget}&nuts=${nuts}&spiciness=${spiciness}`)
  }
  postCard(cardInfo:any){
    return this.http.post("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket",cardInfo )
  }
  allBaskets():Observable<any>{
    return this.http.get<any[]>("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
  }
  updateCart(body:{quantity:number, price:number, productId:number}){
    return this.http.put(`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket`,body )
  }
  removeFromCart(productId:number){
    return this.http.delete(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${productId}`)
  }
public routeri= inject(Router)

  signup(info:any){
    return this.http.post("https://api.everrest.educata.dev/auth/sign_up",info)
  }

  signin(info: any){
    return this.http.post("https://api.everrest.educata.dev/auth/sign_in", info)
  }
  getUser(){
    return this.http.get("https://api.everrest.educata.dev/auth", {headers:{Authorization:`Bearer ${sessionStorage.getItem("user")}`}})
  }
  signout(){
    sessionStorage.removeItem("user")
    this.routeri.navigate(['home'])
  }


  

}
