import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishService } from '../../core/services/wish.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-info-category',
  standalone: true,
  imports: [TranslateModule, TranslateModule],
  templateUrl: './info-category.component.html',
  styleUrl: './info-category.component.scss'
})
export class InfoCategoryComponent implements OnInit {

  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _CategoriesService=inject(CategoriesService)
  infoCategory:WritableSignal<Icategory>=signal({} as Icategory)    
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
       let categoryId =p.get('id')
       this._CategoriesService.getspecificcategories(categoryId!).subscribe({
        next:(res)=>{
          this.infoCategory.set(res.data)
             console.log(res.data)
        }
       })
    }
  })


}


 

}
