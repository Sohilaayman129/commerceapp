import './polyfills.server.mjs';
import{a as e}from"./chunk-WVUI6REW.mjs";import{Kc as a,Q as o,V as n}from"./chunk-4PMUYQ54.mjs";var u=(()=>{let t=class t{constructor(r){this._HttpClient=r}CheckOut(r,s){return this._HttpClient.post(`${e.baseUrl}/api/v1/orders/checkout-session/${r}?url=${e.urlServer}`,{shippingAddress:s})}allorders(){return this._HttpClient.get(`${e.baseUrl}/api/v1/orders/`)}userOrders(r){return this._HttpClient.get(`${e.baseUrl}/api/v1/orders/user/${r}`)}};t.\u0275fac=function(s){return new(s||t)(n(a))},t.\u0275prov=o({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();export{u as a};
