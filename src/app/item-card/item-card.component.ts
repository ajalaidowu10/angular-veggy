import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() item: any;
  @Output() addToCart: EventEmitter<any> = new EventEmitter();

  callAddToCart(data: any) {
    this.addToCart.emit(data);
  }
}
