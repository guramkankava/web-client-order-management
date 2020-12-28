import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.css']
})
export class AmountComponent implements OnInit {

  @Output() amountChangeEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onKeyUp(amount: number): void {
    this.amountChangeEvent.emit(amount)
  }
}
