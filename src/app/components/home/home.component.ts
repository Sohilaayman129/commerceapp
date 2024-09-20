import { ToastrService } from 'ngx-toastr';
import { Component, Inject, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { TextPipe } from '../../core/pipes/text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

import { WishService } from '../../core/services/wish.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateModule, TranslateParser, TranslatePipe, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CarouselModule,RouterLink,CurrencyPipe,TitleCasePipe,UpperCasePipe , TextPipe,SearchPipe,LowerCasePipe ,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit ,OnDestroy{ 
   
  private readonly _ProductsService=inject(ProductsService)
  private readonly _CategoriesService=inject(CategoriesService)
private readonly _CartService=inject(CartService)
private readonly _ToastrService=inject(ToastrService)
private readonly _WishService=inject(WishService)

  


addcart(id:string):void{ 
  this._CartService.addproducttocart(id).subscribe({
    next:(res)=>{
      console.log(res)
      this._ToastrService.success( '🛵',res.message )
      this._CartService.cartNumber.set(res.numOfCartItems)
             console.log(this._CartService.cartNumber())



    }

  })
}

addheart(id:string):void{ 

 this._WishService.Addproducttowishlist(id).subscribe({
  next:(res)=>{
    console.log(res)
    this._ToastrService.success(res.status,"🩵" )
    this._WishService.Getloggeduserwishlist().subscribe({
      next:(res)=>{
         console.log(res.count)
         this._WishService.wishNumber.set(res.count)
      }
    })
  }

})
}

test:WritableSignal<string>=signal("") ;

  customOptionsmain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
     rtl:true,
  autoplayTimeout:2000,
  autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-caret-right text-main"></i>' ,'<i class="fa-solid fa-caret-left text-main"></i>'],
   items:1,
    nav: true 
  }

  customOptionscart: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
  autoplay:true,
  rtl:true,
  autoplayTimeout:1500,
  autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: [ '<i class="fa-solid fa-caret-right text-main"></i>' ,'<i class="fa-solid fa-caret-left text-main"></i>' ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1100: {
        items: 5
      },
      1500: {
        items: 6
      }
    },
    nav: true
  }

  categoriesList:WritableSignal<Icategory[]>=signal([]);

productList:WritableSignal<Iproduct[]>=signal([]);

homesub !:Subscription
ngOnInit(): void {

  this._CategoriesService.getallcategories().subscribe({
    next:(res)=>{
   this.categoriesList.set(res.data) //[{},{},{}]
     
    }


  })
  this.homesub=  this._ProductsService.getallproducts().subscribe({
      next:(res)=>{
      this.productList.set(res.data)
      }

    })
}
 
ngOnDestroy(): void {
   this.homesub?.unsubscribe() 
}


}
