
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrands } from '../../core/interfaces/ibrand';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-info-brand',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './info-brand.component.html',
  styleUrl: './info-brand.component.scss'
})
export class InfoBrandComponent implements OnInit {
private readonly _ActivatedRoute=inject(ActivatedRoute)
private readonly _BrandsService=inject(BrandsService)


infobrands:WritableSignal<Ibrands>=signal({} as Ibrands)    
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
         let idbrand=p.get('id');
          this._BrandsService.Getspecificbrand(idbrand !).subscribe({
            next:(res)=>{
           this.infobrands.set(res.data)
             console.log(res.data)
            }
          })
      }
    })
}



}
