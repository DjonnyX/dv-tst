import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundModule as NotFoundEntityModule } from '@entities/not-found/not-found.module';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';


@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    NotFoundEntityModule,
    NotFoundRoutingModule
  ]
})
export class NotFoundModule { }
