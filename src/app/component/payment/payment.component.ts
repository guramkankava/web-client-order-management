import { Component, OnInit} from '@angular/core';

import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentsComponent implements OnInit {


  message: string;

  showGoBack = false

  showMobile = true
  showCharity = true
  showUtility = true
  showBank = true
  showPay = false

  showMobileNumberComponent = false
  showPersonalNumberComponent = false
  showAccountNumberComponent = false
  showAmountComponent = false
  showMessageComponent = false;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
  }

  onClick(event: any): void {
    this.toggleButtons()
    this.hideMessage()
    this.toggleComponents(event)
    this.setPendingPeymentType(event.target.id)
  }

  setPendingPeymentType(paymentId: string):void {
    this.paymentService.pendingPaymentType = paymentId
  }

  toggleComponents(event: any): void {
    switch (event.target.id) {
      case 'mobile' : this.enableMobilePaymentScreen(); break;
      case 'charity' : this.enableCharityPaymentScreen(); break;
      case 'utility' : this.enbaleUtilityPaymentScreen(); break;
      case 'bank' : this.enableBankPaymentScreen(); break;
      default : this.hideComponents();
    }
  }

  hideComponents(): void {
    this.showMobileNumberComponent = false;
    this.showPersonalNumberComponent = false;
    this.showAmountComponent = false;
    this.showAccountNumberComponent = false;
    this.setDefaultValues()
  }

  setDefaultValues(): void {
    this.message = ''
    this.paymentService.setDefaultValues()
  }

  toggleButtons(): void {
    this.showGoBack = !this.showGoBack;
    this.showMobile = !this.showMobile;
    this.showCharity = !this.showCharity;
    this.showUtility = !this.showUtility;
    this.showBank = !this.showBank;
  }

  enableBankPaymentScreen():void {
    this.enableCharityPaymentScreen()
    this.showAccountNumberComponent = !this.showAccountNumberComponent
  }

  enbaleUtilityPaymentScreen(): void {
    this.enableCharityPaymentScreen()
  }

  enableCharityPaymentScreen(): void {
    this.enableMobilePaymentScreen()
    this.showPersonalNumberComponent = !this.showPersonalNumberComponent
  }

  enableMobilePaymentScreen(): void {
    this.showMobileNumberComponent = !this.showMobileNumberComponent
    this.showAmountComponent = !this.showAmountComponent
  }

  onPay(): void {
    this.paymentService.submitOrder().subscribe(
      (response) => {
        this.handlePaySuccess()
      },
      (error) => {
        this.handlePayFailed()
      }
    )
  }
  handlePayFailed() {
    this.hideComponents()
    this.toggleButtons()
    alert('გადახდის შესრულება ვერ მოხერხდა')
  }
  handlePaySuccess() {
    this.hideComponents()
    this.toggleButtons()
    alert('გადახდა შესრულებულია')
  }

  onPhoneNumberChangeEvent(phoneNumber: string): void {
    this.paymentService.phoneNumber = phoneNumber;
    if(!this.paymentService.isPhonenumberValid(phoneNumber)) {
      this.displayMessage('ტელეფონის ნომერი იწყება 5 ით და შედგება 9 ციფრისგან')
      return;
    }
    this.hideMessage()
  }

  onPersonalNumberChangeEvent(personalNumber: string): void {
    this.paymentService.personalNumber = personalNumber
    if(!this.paymentService.isPersonalNumberValid(personalNumber)) {
      this.displayMessage('პირადი ნომერი შედგება 11 ციფრისაგან')
      return;
    }
    this.hideMessage()
  }

  onAccountNumberChangeEvent(accountNumber: string): void {
    this.paymentService.accountNumber = accountNumber
    if(!this.paymentService.isAccountNumberValid(accountNumber)) {
      this.displayMessage('ანგარიშის ნომრის სტრუქტურა ' + 'GE00XX0000000000000000')
      return
    }
    this.hideMessage()
  }

  onAmountChangeEvent(amount: number): void {
    this.paymentService.amount = amount
    if (!this.paymentService.isAmountValid(amount)) {
      this.displayMessage('მინიმალური თანხა 1 ლ, მაქსიმალური 100')
      return
    }
    this.hideMessage()
    this.paymentService.setCommission(this.paymentService.amount)
    this.displayMessage('საკომისიო ' + this.paymentService.commission)
  }

  isPaymentReady(): boolean {
    return this.paymentService.isPaymentReady();
  }

  displayMessage(message: string): void {
    this.message = message
    this.showMessageComponent = true
  }

  hideMessage(): void {
    this.message = ''
    this.showMessageComponent = false
  }

}
