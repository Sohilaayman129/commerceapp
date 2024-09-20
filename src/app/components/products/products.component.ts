import { Component, inject, OnInit, OnDestroy, WritableSignal, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CurrencyPipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { TextPipe } from '../../core/pipes/text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { WishService } from '../../core/services/wish.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe,TranslateModule,TitleCasePipe,UpperCasePipe,RouterLink , TextPipe,SearchPipe,LowerCasePipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit ,OnDestroy  {
  private readonly _ProductsService=inject(ProductsService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _CartService=inject(CartService)
  private readonly _WishService=inject(WishService)
  test:WritableSignal<string>=signal(" ")
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
       this._ToastrService.success( res.status, "🩵")
       this._WishService.Getloggeduserwishlist().subscribe({
         next:(res)=>{
            console.log(res.count)
            this._WishService.wishNumber.set(res.count)
         }
       })
     }

   })
   }
   

productList:WritableSignal<Iproduct[]>=signal([]);

productsub !:Subscription
ngOnInit(): void {
  this.productsub=  this._ProductsService.getallproducts().subscribe({
    next:(res)=>{
    this.productList.set(res.data)
    }

  })
}


ngOnDestroy(): void {
  this.productsub?.unsubscribe() 
}

}
