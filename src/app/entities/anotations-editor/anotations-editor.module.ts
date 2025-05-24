import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnotationsEditorComponent } from './anotations-editor.component';
import { ImageEmptyModule } from '@entities/image-empty/image-empty.module';
import { FormsModule } from '@angular/forms';
import { TabbarModule } from '@shared/tabbar/tabbar.module';
import { AnotationImageEditorModule } from '@entities/anotation-image-editor/anotation-image-editor.module';


@NgModule({
  declarations: [AnotationsEditorComponent],
  exports: [AnotationsEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    TabbarModule,
    AnotationImageEditorModule,
  ]
})
export class AnotationsEditorModule { }
