import { IProduct } from './../shared/models/product';
import { IBasket, IBasketItem,Basket, IBasketTotals } from './../shared/models/basket';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  shipping=0

  constructor() { }

  setShippingPrice(deliveryMethod:IDeliveryMethod){
    this.shipping=deliveryMethod.price
    this.calculateTotals()
  }

  getBasket(id:string){
    this.basketSource.next(JSON.parse(localStorage.getItem(id)))
    console.log(this.basketSource.value)
    return this.basketSource.value
  }

  setBasket(basket:IBasket){
    this.basketSource.next(basket)
    this.calculateTotals()
    console.log(this.basketSource.value,this.basketTotalSource.value)
    return this.basketSource.value
  }

  getCurrentBasketValue(){
    return this.basketSource.value
  }

  private calculateTotals(){
    const basket=this.getCurrentBasketValue()
    const shipping=this.shipping
    const subtotal=basket?.items?.reduce((a,b)=>(b.price*b.quantity)+a,0)
    const total=shipping+subtotal
    this.basketTotalSource.next({shipping,subtotal,total})
  }

  addItemToBasket(item:IProduct,quantity=1){
    const itemToAdd:IBasketItem=this.mapProductItemToBasketItem(item,quantity)
    const basket=this.getCurrentBasketValue() ?? this.createBasket()
    basket.items=this.addOrUpdateItem(basket.items,itemToAdd,quantity)
    this.setBasket(basket)
  }
  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index=items.findIndex(i=>i.id===itemToAdd.id)
    if(index===-1){
      itemToAdd.quantity=quantity
      items.push(itemToAdd)
    }else{
      items[index].quantity+=quantity
    }
    return items
  }
  createBasket(): IBasket {
    const basket=new Basket()
    localStorage.setItem("basket_id",basket.id)
    return basket
  }

  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id:item.id,
      productName:item.name,
      price:item.price,
      pictureUrl:item.pictureUrl,
      quantity,
      brand:item.productBrand,
      type:item.productType
    }
  }

  incrementItemQuantity(item:IBasketItem){
    const basket=this.getCurrentBasketValue();
    const foundItemIndex=basket.items.findIndex(x=>x.id===item.id)
    basket.items[foundItemIndex].quantity++
    this.setBasket(basket)
  }

  decrementItemQuantity(item:IBasketItem){
    const basket=this.getCurrentBasketValue();
    const foundItemIndex=basket.items.findIndex(x=>x.id===item.id)
    if(basket.items[foundItemIndex].quantity>1){
      basket.items[foundItemIndex].quantity--
      this.setBasket(basket)
    }
    else{
      this.removeItemFromBasket(item)
    }
  }
  removeItemFromBasket(item: IBasketItem) {
    const basket=this.getCurrentBasketValue()
    if(basket.items.some(x=>x.id===item.id)){
      basket.items=basket.items.filter(i=>i.id!==item.id)
      if(basket.items.length>0){
        this.setBasket(basket)
      }else{
        this.deleteBasket(basket)
      }
    }
    this.calculateTotals()
  }
  deleteBasket(basket: IBasket) {
    this.basketSource.next(null)
    this.basketTotalSource.next(null)
    localStorage.removeItem(basket.id)
    localStorage.removeItem("basket_id")
  }
}
