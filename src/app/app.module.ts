import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NbLayoutModule, NbThemeModule } from '@nebular/theme';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './appRouting.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
