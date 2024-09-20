import { Component, computed, Inject, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishService } from '../../core/services/wish.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive , TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent  implements OnInit {
  _AuthService=inject(AuthService)

  private readonly _CartService=inject(CartService)
  private readonly _WishService=inject(WishService)
    private readonly _MytranslateService=inject(MytranslateService)
       //current-lang en --->ar
       readonly _TranslateService=inject(TranslateService)
change(lang:string):void{
this._MytranslateService.saveChange(lang)

}

cartNavNumber:Signal<number> =computed(()=> this._CartService.cartNumber()   )

wishNavNumber:Signal<number>=computed(()=>this._WishService.wishNumber() )


ngOnInit(): void {
this._CartService.GetLoggedusercart().subscribe({
  next:(res)=>{
   console.log(res)
   this._CartService.cartNumber.set(res.numOfCartItems)
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
