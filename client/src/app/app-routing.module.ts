import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';

const routes: Routes = [
  {path:'',component:HomeComponent, data:{breadcrumb:'Home'}},
  {path:'test-error',component:TestErrorComponent, data:{breadcrumb:'Test Error'}},
  {path:'not-found',component:NotFoundComponent, data:{breadcrumb:'Not Found'}},
  {path:'server-error',component:ServerErrorComponent, data:{breadcrumb:'Server Error'}},
  {path:'shop',loadChildren:()=>import('./shop/shop.module').then(mod=>mod.ShopModule), data:{breadcrumb:'Shop'}}, // lazy loading from shop module -> shopModule loaded here automatically
  {path:'**',redirectTo:'not-found',pathMatch:'full'} // if user types a wrong url -> redirect to home 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
