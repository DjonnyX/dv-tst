import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLoadingIndicatorModule } from './features/page-loading-indicator/page-loading-indicator.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PageLoadingIndicatorModule,
  ],
  providers: [
    provideExperimentalZonelessChangeDetection(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
