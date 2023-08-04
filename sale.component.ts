import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  cartProducts: any[] = [];
  subTotal: number = 0;
  saleObj: any = {
    "SaleId": 0,
    "CustId": 1,
    "SaleDate": "2023-08-03T12:12:51.891Z",
    "TotalInvoiceAmount": 0,
    "Discount": 0,
    "PaymentNaration": "paytm",
    "DeliveryAddress1": "Indhu Hostel",
    "DeliveryAddress2": "Near Ambedhkar Bhavan",
    "DeliveryCity": "Anantapur",
    "DeliveryPinCode": "515001",
    "DeliveryLandMark": "Ambedhkar Bhavan"
  };

  constructor(private productService: ProductService) {
    debugger;

  }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.subTotal = 0;
    this.productService.getCartItemsByCustId(1).subscribe((res: any) => {
      this.cartProducts = res.data;
      this.cartProducts.forEach(element => {
        this.subTotal = this.subTotal + element.productPrice;
      })
      debugger;
    })
  }

  RemoveItem(id: number) {
    this.productService.removeCartItemById(id).subscribe((res: any) => {
      if (res.result) {
        this.loadCart();
        this.productService.cartAddedSubject.next(true);
      }
    })
  }

  makeSale(){
    this.saleObj.TotalInvoiceAmount = this.subTotal;
    this.productService.cartAddedSubject.next(true);
    this.productService.makeSale(this.saleObj).subscribe((res: any) => {
      if (res.result) {
        alert("Sale Success")
        this.loadCart();
        this.productService.cartAddedSubject.next(true);
      }
    })
  }
}
