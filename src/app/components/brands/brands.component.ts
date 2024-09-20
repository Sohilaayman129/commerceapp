import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';

import { NgClass } from '@angular/common';
import { Ibrands } from '../../core/interfaces/ibrand';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgClass , RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent  implements OnInit{
  private readonly _BrandsService=inject(BrandsService)


brandsData:WritableSignal<Ibrands[]>=signal([])

brandId:WritableSignal<string|null>=signal(" ") ;
ngOnInit(): void {  
   this._BrandsService.getallbrands().subscribe({
    next:(res)=>{
      console.log(res.data)
       this.brandsData.set(res.data)
     
    }
  
   }) 
}
         

clicable:Ibrands[]=[]
click(id:string):void{
  this._BrandsService.Getspecificbrand(id).subscribe({
    next:(res)=>{
      this.clicable=res.data;
      console.log(res.data)
    }
  })
}









}
