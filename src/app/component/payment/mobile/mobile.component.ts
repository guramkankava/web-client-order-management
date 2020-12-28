import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  @Output() phoneNumberChangeEvent = new EventEmitter<string>();

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
  }

  onKeyUp(phoneNumber: string): void {
    this.phoneNumberChangeEvent.emit(phoneNumber)
  }
}
