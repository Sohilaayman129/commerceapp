import{a as x}from"./chunk-56Q47YJT.js";import{d as b}from"./chunk-UCMERK44.js";import"./chunk-MMKAGRZ3.js";import"./chunk-DMHPLCCW.js";import{$ as l,Db as v,Eb as h,La as d,Lb as y,Nb as C,Pa as i,_a as m,ca as p,gb as s,mb as g,nb as u,ob as o,pb as c,qb as f}from"./chunk-HXXKVFF7.js";var S=(t,e)=>e._id,L=t=>["/infoCategory",t];function k(t,e){if(t&1&&(o(0,"div",2)(1,"div",3)(2,"div",4),f(3,"img",5),o(4,"h4",6),v(5),c()()()()),t&2){let r=e.$implicit;i(2),s("routerLink",C(4,L,r._id)),i(),s("src",r.image,d)("alt",r.name),i(2),h(r.name)}}var I=(()=>{let e=class e{constructor(){this._CategoriesService=l(x),this.categoriesList=m([])}ngOnInit(){this.categoriessub=this._CategoriesService.getallcategories().subscribe({next:a=>{this.categoriesList.set(a.data)}})}ngOnDestroy(){this.categoriessub?.unsubscribe()}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["app-catecories"]],standalone:!0,features:[y],decls:4,vars:0,consts:[[1,"my-5","pt-lg-4"],[1,"row","g-3","py-3"],[1,"col-md-4","col-lg-3"],[1,"all","border","cr"],[3,"routerLink"],["height","370px",1,"w-100",3,"src","alt"],[1,"text-main","fw-bold","p-2","text-center"]],template:function(n,_){n&1&&(o(0,"section",0)(1,"div",1),g(2,k,6,6,"div",2,S),c()()),n&2&&(i(2),u(_.categoriesList()))},dependencies:[b]});let t=e;return t})();export{I as CatecoriesComponent};
