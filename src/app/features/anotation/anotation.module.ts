import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnotationModule as AnotationEntityModule } from '@entities/anotation/anotation.module';
import { AnotationComponent } from '../anotation/anotation.component';
import { AnotationsEditorModule } from "../../entities/anotations-editor/anotations-editor.module";


@NgModule({
  declarations: [
    AnotationComponent,
  ],
  exports: [
    AnotationComponent,
  ],
  imports: [
    CommonModule,
    AnotationEntityModule,
    AnotationsEditorModule
]
})
export class AnotationModule { }
