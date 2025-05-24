import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewerComponent } from './image-viewer.component';
import { ScrollBarModule } from '@shared/components/scroll-bar/scroll-bar.module';
import { AnotationsModule } from '@features/anotations/anotations.module';


@NgModule({
  declarations: [ImageViewerComponent, ImageViewerComponent],
  exports: [ImageViewerComponent],
  imports: [
    CommonModule,
    ScrollBarModule,
    AnotationsModule,
  ]
})
export class ImageViewerModule { }
