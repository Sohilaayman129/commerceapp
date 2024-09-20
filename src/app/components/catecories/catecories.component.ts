import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catecories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catecories.component.html',
  styleUrl: './catecories.component.scss'
})
export class CatecoriesComponent implements OnInit ,OnDestroy{
  private readonly _CategoriesService=inject(CategoriesService)
  
  categoriessub !:Subscription
  categoriesList:WritableSignal<Icategory[]>=signal([]);
  ngOnInit(): void { 
 this.categoriessub = this._CategoriesService.getallcategories().subscribe({
      next:(res)=>{
     this.categoriesList.set(res.data)
      }
    })
  }



ngOnDestroy(): void {
    this.categoriessub?.unsubscribe()
}


}
