import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewerComponent } from './image-viewer.component';
import { ScrollBarModule } from '@shared/components/scroll-bar/scroll-bar.module';
import { AnotationModule } from "../../entities/anotation/anotation.module";



@NgModule({
  declarations: [ImageViewerComponent, ImageViewerComponent],
  exports: [ImageViewerComponent],
  imports: [
    CommonModule,
    ScrollBarModule,
    AnotationModule,
  ]
})
export class ImageViewerModule { }
