import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { TextPipe } from '../../core/pipes/text.pipe';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , TextPipe  , RouterLink ,TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit , OnDestroy {
private readonly _CartService=inject(CartService)
private readonly _ToastrService=inject(ToastrService)


numOfCartItems:WritableSignal<number>=signal(0)
cartdata:WritableSignal<Icart>=signal( {} as Icart)

cartsub !:Subscription
cartfall:WritableSignal<boolean>=signal(true)
ngOnInit(): void {
this.cartsub= this._CartService.GetLoggedusercart().subscribe({
  next:(res)=>{
   console.log(res.data)    // [{}] 
   this.cartfall.set(false)   
   this.cartdata.set(res.data)
  this.numOfCartItems.set(res.numOfCartItems)
 
  
  }

})

}
ngOnDestroy(): void {
  this.cartsub?.unsubscribe()
}
removecart(id:string):void{

this._CartService.RemovespecificcartItem(id).subscribe({

  next:(res)=>{
   console.log(res)
   this.cartdata.set(res.data)
this._CartService.cartNumber.set(res.numOfCartItems)
console.log(res.numOfCartItems);
this.numOfCartItems.set(res.numOfCartItems)
 this._ToastrService.info('remove')


  }

})
}

updatecount(id:string ,count:number):void{
if(count >0){
  this._CartService.Updatecartproductquantity(id,count).subscribe({
    next:(res)=>{
    console.log(res.data)
    this.cartdata.set(res.data)
    this._ToastrService.success('count update')
    }

    
    })
}
}

clearcart():void{
 this._CartService.Clearusercart().subscribe({
  next:(res)=>{
console.log(res)
if(res.message== 'success'){
  this.cartdata.set({} as Icart )
       this._CartService.cartNumber.set(0)
  this._ToastrService.success('clear Done')
 
}
  }

 }) 
}

}
