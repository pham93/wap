import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GoogleMapsModule } from '@angular/google-maps';
import { WidgetModule } from '../widget/widget.module';
import { MapWidgetComponent } from './mapWidget.component';

@NgModule({
  imports: [WidgetModule, LeafletModule, GooglePlaceModule,
    GoogleMapsModule,
  ],
  declarations: [MapWidgetComponent],
})
export class MapWidgetModule {
  static getComponent() {
    return MapWidgetComponent;
  }
}
