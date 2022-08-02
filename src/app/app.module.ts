import { HttpClientModule } from '@angular/common/http';
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

const components = [
  AppComponent,
  SearchComponent,
  StockComponent,
  MainComponent,
  SentimentComponent,
];
const pipes = [NumberToMonthPipe, NumberWithSignPipe];
const directives = [InputTextLimitDirective];
@NgModule({
  declarations: [...components, ...pipes, ...directives],
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
