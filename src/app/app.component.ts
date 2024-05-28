import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemCardComponent } from './item-card/item-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ItemCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  searchItem: string = '';
  carts: any[] = [];
  section = 'home';
  constructor(private dataService: DataService) {};

  showHome(): void {
    this.section = 'home';
  }

  showCart(): void {
    this.section = 'cart';
  }

  ngOnInit(): void {
      this.dataService.getData().subscribe(data => {
        this.items = data;
        this.filteredItems = data;
      })
  }

  filterItems(): void {
    if(this.searchItem) {
       this.filteredItems = this.items.filter(item => {
        return item.title.toLowerCase().includes(this.searchItem.toLowerCase());
       });

    }else {
      this.filteredItems = this.items;
    }
  }

  getCartQty(): number {
    return this.carts.reduce((prev, cur) => cur.qty + prev, 0);
  }

  addToCart(item: any): void {
    const getItem = this.carts.findIndex(cartItem => item.id === cartItem.id);
    if(getItem !== -1) {
       this.carts[getItem]['qty']++;
    }else {
      this.carts.push({ id: item.id, qty: 1 });
    }
  }

  getCartItems(): Array<any> {
      return this.carts.map(cartItem => {
                const getItem = this.items.find(
                  item => item.id === cartItem.id
                );
                return {
                  id: getItem.id,
                  title: getItem.title,
                  price: getItem.price,
                  description: getItem.description,
                  image: getItem.image,
                  qty: cartItem.qty
                };
            });
  }

  removeFromCart(itemId: number): void {
    this.carts = this.carts.filter(item => item.id !== itemId);
  }

  decrementItemQty(itemId: number): void {
    const getCartItem = this.carts.find(cartItem => cartItem.id === itemId);
    getCartItem.qty--;
  }

  incrementItemQty(itemId: number): void {
    const getCartItem = this.carts.find(cartItem => cartItem.id === itemId);
    getCartItem.qty++;
  }

  getCartTotal(): void {
  	return this.getCartItems().reduce((prev, cur) => {
  		return (Number(cur.qty) * Number(cur.price.substring(1))) + prev; }, 0).toFixed(2);
  }

  checkout(){
		// promise object for checkout inplace of the checkout api 
		const checkingOut = new Promise((resolve, reject) => {
			if(true){
				setTimeout(resolve, 1000, 'Checkout Successful');
			}else{
				setTimeout(resolve, 1000, 'Checkout Fail');
			}
		});
		checkingOut.then(res => {
			this.carts = [];
			alert('CHECKOUT SUCCESSFUL');
		})
		.catch(err => {
      alert('CHECKOUT FAIL');
		})
	}

}
