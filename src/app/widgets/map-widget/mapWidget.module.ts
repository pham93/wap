import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { WidgetModule } from '../widget/widget.module';
import { MapWidgetComponent } from './mapWidget.component';

@NgModule({
  imports: [WidgetModule, LeafletModule],
  declarations: [MapWidgetComponent],
})
export class MapWidgetModule {
  static getComponent() {
    return MapWidgetComponent;
  }
}
