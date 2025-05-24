import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnotationImageEditorComponent } from './anotation-image-editor.component';
import { FormsModule } from '@angular/forms';
import { TabbarModule } from '@shared/tabbar/tabbar.module';
import { ImageEmptyModule } from '@entities/image-empty/image-empty.module';
import { SpinnerModule } from "../spinner/spinner.module";



@NgModule({
  declarations: [
    AnotationImageEditorComponent,
  ],
  exports: [
    AnotationImageEditorComponent,
  ],
  imports: [
    CommonModule,
    ImageEmptyModule,
    FormsModule,
    TabbarModule,
    SpinnerModule
  ]
})
export class AnotationImageEditorModule { }
