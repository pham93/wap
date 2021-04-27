import { NgModule } from '@angular/core';
import { WidgetModule } from '../widget/widget.module';
import { TextWidgetComponent } from './textWidget.component';

@NgModule({
  imports: [WidgetModule],
  declarations: [TextWidgetComponent],
})
export class TextWidgetModule {
  static getComponent() {
    return TextWidgetComponent;
  }
}
