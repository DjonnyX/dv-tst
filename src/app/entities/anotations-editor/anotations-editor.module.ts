import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnotationsEditorComponent } from './anotations-editor.component';
import { ImageEmptyModule } from '@entities/image-empty/image-empty.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AnotationsEditorComponent],
  exports: [AnotationsEditorComponent],
  imports: [
    CommonModule,
    ImageEmptyModule,
    FormsModule,
  ]
})
export class AnotationsEditorModule { }
