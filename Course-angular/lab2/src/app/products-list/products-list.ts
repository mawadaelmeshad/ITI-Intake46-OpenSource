import { Component } from '@angular/core';
import { IProduct } from '../iproduct';
import { ICategory } from '../icategory';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, TagModule, RatingModule, FormsModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css'
})
export class ProductsList {
  products: IProduct[] = [
    { id: 1, name: "Laptop", imgUrl: "https://fastly.picsum.photos/id/842/200/200.jpg?hmac=RW9iEgAYLKwoinQWSz_zrZHyOwmVEgqvoZTPebkRGMM", price: 1200, quantity: 10, catId: 1, purchaseQty: 1 },
    { id: 2, name: "Mouse", imgUrl: "https://picsum.photos/200?random=2", price: 25, quantity: 0, catId: 1, purchaseQty: 1 },
    { id: 3, name: "T-Shirt", imgUrl: "https://picsum.photos/200?random=3", price: 30, quantity: 1, catId: 2, purchaseQty: 1 },
    { id: 4, name: "Jeans", imgUrl: "https://picsum.photos/200?random=4", price: 70, quantity: 25, catId: 2, purchaseQty: 1 },
    { id: 5, name: "Coffee Mug", imgUrl: "https://picsum.photos/200?random=5", price: 12, quantity: 0, catId: 3, purchaseQty: 1 },
    { id: 6, name: "Notebook", imgUrl: "https://picsum.photos/200?random=6", price: 8, quantity: 100, catId: 3, purchaseQty: 1 }
  ];

  categories: ICategory[] = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Stationery" }
  ];

  selectedCatId: number = 0;
  totalPrice: number = 0;

  get filteredProducts(): IProduct[] {
    if (this.selectedCatId === 0) {
      return this.products;
    }
    return this.products.filter(p => p.catId === this.selectedCatId);
  }

  buyProduct(product: IProduct): void {

    const qty = product.purchaseQty && product.purchaseQty > 0 ? product.purchaseQty : 1;
    if(qty>product.quantity){
      alert("Not enough quantity");
      return;
    }
    this.totalPrice += product.price * qty;
  }
}
