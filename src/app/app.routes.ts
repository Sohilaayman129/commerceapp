import { Component } from '@angular/core';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { blankGuard } from './core/guards/blank.guard';
import { authGuard } from './core/guards/auth.guard';
export const routes: Routes = [

{path:'',component:AuthLayoutComponent , canActivate:[authGuard]
 ,   children:[
              {path:'',redirectTo:'login',pathMatch:'full'},
         {path:'login',component:LoginComponent},
              {path:'register',component:RegisterComponent},
              {path:'forget',loadComponent:()=>import('./components/forgetpassword/forgetpassword.component').then((e)=>e.ForgerpasswordComponent)}
              ]     
            
 } ,
 
{path:'',component:BlankLayoutComponent ,canActivate:[blankGuard]

  ,  children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent},
        {path:'products',component:ProductsComponent},
        {path:'cart',loadComponent:()=>import('./components/cart/cart.component').then((e)=>e.CartComponent)},
        {path:'brands',loadComponent:()=>import('./components/brands/brands.component').then((e)=>e.BrandsComponent)},
        {path:'categories',loadComponent:()=>import('./components/catecories/catecories.component').then((e)=>e.CatecoriesComponent)},
        {path:'infoCategory/:id',loadComponent:()=>import('./components/info-category/info-category.component').then((e)=>e.InfoCategoryComponent)},
        {path:'infoBrand/:id',loadComponent:()=>import('./components/info-brand/info-brand.component').then((e)=>e.InfoBrandComponent)},
        {path:'wish list',loadComponent:()=>import('./components/wishlist/wishlist.component').then((e)=>e.WishlistComponent)},
        {path:'details/:id',loadComponent:()=>import('./components/details/details.component').then((e)=>e.DetailsComponent)},
        {path:'allorders',loadComponent:()=>import('./components/allorders/allorders.component').then((e)=>e.AllordersComponent)},
        {path:'order/:id',loadComponent:()=>import('./components/order/order.component').then((e)=>e.OrderComponent)}
    ]

} ,

 {path:'**',loadComponent:()=>import('./components/notfound/notfound.component').then((e)=>e.NotfoundComponent) },

];  