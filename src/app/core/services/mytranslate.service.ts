import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
private readonly _TranslateService=inject(TranslateService)
private readonly _Renderer2=inject(RendererFactory2).createRenderer(null ,null)
  private readonly _PLATFORM_ID=inject(PLATFORM_ID)
  constructor() { 
    if(isPlatformBrowser(this._PLATFORM_ID)){
    //2- set defulat lang
    this._TranslateService.setDefaultLang('en');

   this.setLang()

    }
  }
  
setLang():void{
  let savelang=localStorage.getItem('lang');

  if(savelang !==null){
    this._TranslateService.use(savelang!)
  }
  //dir
  if(savelang==='en'){

  this._Renderer2.setAttribute(document.documentElement,'dir', 'ltr')
  this._Renderer2.setAttribute(document.documentElement,'lang', 'en')

  }
else if(savelang==='ar'){

this._Renderer2.setAttribute(document.documentElement,'dir','rtl')
this._Renderer2.setAttribute(document.documentElement,'lang','ar')

}

}


saveChange(lang:string):void{

  if(isPlatformBrowser(this._PLATFORM_ID)){
    localStorage.setItem('lang',lang) //save lang in local--> en-ar
     this.setLang()
  }
 
}





}
