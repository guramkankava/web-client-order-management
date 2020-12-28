import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-account-number',
  templateUrl: './account-number.component.html',
  styleUrls: ['./account-number.component.css']
})
export class AccountNumberComponent implements OnInit {

  @Output() accountNumberChangedEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onKeyUp(accountNumber: string): void {
    this.accountNumberChangedEvent.emit(accountNumber);
  }

}
