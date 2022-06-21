import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product:IProduct

  constructor(private shopService:ShopService,private activatedRoute:ActivatedRoute,
    private bcService:BreadcrumbService) {
      this.bcService.set('@productDetails','') // we are setting the value of product details to empty string untill product get loaded
  }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(){
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(product=>{
      this.product=product
      this.bcService.set('@productDetails',product.name) // here we are setting the value of parameter productDetails to product name .... which was set in the shop-routing.module.ts
    },error=>{
      console.log(error)
    })
  }

}
