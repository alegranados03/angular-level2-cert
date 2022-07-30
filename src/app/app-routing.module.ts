import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SentimentComponent } from './pages/sentiment/sentiment.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'sentiment/:symbol',
    component: SentimentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
