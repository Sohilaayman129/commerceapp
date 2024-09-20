import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishService } from '../../core/services/wish.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule,TranslateModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
    private readonly _ActivatedRoute=inject(ActivatedRoute)
    private readonly _ProductsService=inject(ProductsService)
    private readonly _CartService=inject(CartService)
    private readonly _ToastrService=inject(ToastrService)
    private readonly _WishService=inject(WishService)


    customOptionsdetalies: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
       rtl:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
      dots: false,
      navSpeed: 700,
      navText: [ '  <i class="fa-solid fa-caret-right text-main"></i>' ,' <i class="fa-solid fa-caret-left text-main"></i>'],
     items:1,
      nav: true
    }
    
     detaliesProduct:WritableSignal<Iproduct|null>=signal(null)
  

    ngOnInit(): void {
        this._ActivatedRoute.paramMap.subscribe({
          next:(p)=>{
           let idproduct=p.get('id');
           this._ProductsService.getspecificproducts(idproduct ! ).subscribe({
                next:(res)=>{
                 this.detaliesProduct.set(res.data)   //{}
                 console.log(res.data)
                }

           })
          }
        })
    }

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
     

}
