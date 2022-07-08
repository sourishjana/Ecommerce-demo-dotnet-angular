import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FooterComponent } from './footer/footer.component'


@NgModule({
  declarations: [NavBarComponent, TestErrorComponent, NotFoundComponent, ServerErrorComponent, SectionHeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({ // this is a singleton and can be used globally
      positionClass:'toast-bottom-right', // where the toaster should appear
      preventDuplicates:true
    }),
    BreadcrumbModule, // this is a npm module which allows us to use breadcrumb 
    BsDropdownModule
  ],exports:[
    NavBarComponent,
    FooterComponent,
    SectionHeaderComponent
  ]
})
export class CoreModule { }
