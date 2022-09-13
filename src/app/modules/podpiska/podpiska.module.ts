import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodpiskaRoutingModule } from './podpiska-routing.module';
import { MainComponent } from './components/main/main.component';
import { SortirovkaComponent } from './components/sortirovka/sortirovka.component';


@NgModule({
  declarations: [
    MainComponent,
    SortirovkaComponent
  ],
  imports: [
    CommonModule,
    PodpiskaRoutingModule
  ]
})
export class PodpiskaModule { }
