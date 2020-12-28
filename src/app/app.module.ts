import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { PaymentsComponent } from './component/payment/payment.component';
import { MobileComponent } from './component/payment/mobile/mobile.component';
import { PersonalNumberComponent } from './component/payment/personal-number/personal-number.component';
import { AccountNumberComponent } from './component/payment/account-number/account-number.component';
import { AmountComponent } from './component/payment/amount/amount.component';
import { MessageComponent } from './component/message/message.component';

@NgModule({
  declarations: [
    PaymentsComponent,
    AppComponent,
    MobileComponent,
    PersonalNumberComponent,
    AccountNumberComponent,
    AmountComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
