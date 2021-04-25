import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { WidgetModule } from '../widget/widget.module';
import { TextWidgetComponent } from './textWidget.component';

@NgModule({
  imports: [SharedModule, WidgetModule],
  declarations: [TextWidgetComponent],
})
export class TextWidgetModule {}
