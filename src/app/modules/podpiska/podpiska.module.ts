import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodpiskaRoutingModule } from './podpiska-routing.module';
import { MainComponent } from './components/main/main.component';
import { SortirovkaComponent } from './components/sortirovka/sortirovka.component';
import {CardModule} from 'primeng/card'


@NgModule({
  declarations: [MainComponent, SortirovkaComponent],
  imports: [CommonModule, PodpiskaRoutingModule, CardModule],
})
export class PodpiskaModule {}
