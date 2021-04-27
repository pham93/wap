import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbLayoutModule, NbThemeModule, NbThemeService } from '@nebular/theme';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './appRouting.module';
import { ThemeService } from './services/theme.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: NbThemeService,
      useClass: ThemeService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
