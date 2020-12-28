import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  phoneNumber: string
  personalNumber: string
  accountNumber: string
  amount: number
  commission = 0
  pendingPaymentType: string;

  constructor(private http: HttpClient) { }

  setDefaultValues() {
    this.phoneNumber = null
    this.personalNumber = null
    this.accountNumber = null
    this.amount = 0
    this.commission = 0
    this.pendingPaymentType = null
  }

  isPhonenumberValid(phoneNumber: string): boolean {
    return phoneNumber && phoneNumber.charAt(0) === '5' && phoneNumber.length === 9 && /^\d+$/.test(phoneNumber)
  }

  isAmountValid(amount: number): boolean {
    return amount && amount >= 1 && amount <= 100
  }

  isAccountNumberValid(accountNumber: string): boolean {
    return accountNumber && /GE[0-9]{2}\D{2}[0-9]{16}/.test(accountNumber) && accountNumber.length === 22
  }

  isPersonalNumberValid(personalNumber: string) : boolean {
    return personalNumber && /^\d+$/.test(personalNumber) && personalNumber.length === 11
  }

  setCommission(amount: number): void {
    if (this.isAmountValid(amount)) {
      (amount / 100) < 0.5 ? this.commission = 0.5 : this.commission = (amount / 100);
      return
    }
    this.commission = 0
  }

  submitOrder() : Observable<any> {
    return this.http.post('http://localhost:8080/orders/'+ this.pendingPaymentType, {
      phoneNumber: this.phoneNumber,
      personalNumber: this.personalNumber,
      accountNumber: this.accountNumber,
      amount: this.amount,
      commission: this.commission
    }
    )
  }

  isPaymentReady(): boolean {
    switch (this.pendingPaymentType) {
      case 'mobile': return this.isMobilePaymentReady();
      case 'charity':
      case 'utility': return this.isCharityUtilityPaymentReady();
      case 'bank': return this.isBankPaymentReady();
      default: return false;
    }
  }


  private isBankPaymentReady(): boolean {
    return this.isAccountNumberValid(this.accountNumber) && this.isCharityUtilityPaymentReady();
  }

  private isCharityUtilityPaymentReady(): boolean {
    return  this.isMobilePaymentReady() && this.isPersonalNumberValid(this.personalNumber);
  }

  private isMobilePaymentReady(): boolean {
    return this.isPhonenumberValid(this.phoneNumber) && this.isAmountValid(this.amount);
  }
}
