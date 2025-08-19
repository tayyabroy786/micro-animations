import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoAnimButtonComponent } from './demo-anim-button/demo-anim-button.component';
import { MicroAnimationsModule } from 'micro-animations';
import { DemoDirectiveCardsComponent } from './demo-directive-cards/demo-directive-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoAnimButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MicroAnimationsModule,
    DemoDirectiveCardsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
