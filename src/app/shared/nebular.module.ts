import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbSelectModule,
  NbToggleModule,
  NbIconModule,
  NbLayoutModule,
  NbThemeModule,
  NbInputModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  exports: [
    NbEvaIconsModule,
    NbIconModule,
    NbToggleModule,
    NbSelectModule,
    NbCardModule,
    NbButtonModule,
    NbLayoutModule,
    NbInputModule,
  ],
})
export class NebularModule {}
