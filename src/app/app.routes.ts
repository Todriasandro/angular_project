import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Cart } from './components/cart/cart';
import { Login } from './login/login';
import { Auth } from './auth/auth';
import { Profile } from './profile/profile';

export const routes: Routes = [
    {
        path:"",
        component:Main

    }, 
    {
        path:"cart",
        component:Cart,
        

    },
    {
        path:"auth",
        component: Auth

    },
     {
        path:"profile",
        component:Profile
     },
     {
        path:"login",
        component:Login
     }
    

];
