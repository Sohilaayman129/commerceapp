
import { isPlatformBrowser } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router=inject(Router)

//globale object -->> document localstorage location navigation window (csr)(refire on browser)
//guard ,lifecyclecomponent (ssr)
//check on typeof global object
if(typeof localStorage !== 'undefined'){
  
  if(localStorage.getItem('userToken')!==null){
    _Router.navigate(['/home'])
    return false
  }
  else{
  return true
  }
}
else
{
  return false
}


};