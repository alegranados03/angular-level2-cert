import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { StockComponent } from './components/stock/stock.component';
import { MainComponent } from './pages/main/main.component';
import { SentimentComponent } from './pages/sentiment/sentiment.component';
import { NumberToMonthPipe } from './pipes/number-to-month.pipe';
import { NumberWithSignPipe } from './pipes/number-with-sign.pipe';
import { InputTextLimitDirective } from './directives/input-text-limit.directive';

@NgModule({
  declarations: [AppComponent, SearchComponent, StockComponent, MainComponent, SentimentComponent, NumberToMonthPipe, NumberWithSignPipe, InputTextLimitDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
