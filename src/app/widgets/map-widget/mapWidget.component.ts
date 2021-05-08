import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import * as L from 'leaflet';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import ResizeObserver from 'resize-observer-polyfill';

@Component({
  selector: 'map-widget',
  templateUrl: './mapWidget.component.html',
  styleUrls: ['./mapWidget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapWidgetComponent implements OnDestroy {
  formattedaddress : String = " ";
  mapOptions = {
    layers: [
      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      }),
    ],
    zoom: 2,
    center: L.latLng({ lat: 38.991709, lng: -76.886109 }),
  };
  cityOptions: any;
  constructor() {
    this.cityOptions = {
      bounds: new google.maps.LatLngBounds(),
      types: ['city'],
      fields: ["address_component"],
      strictBounds: false,
      componentRestrictions: {
        country:"UA"
      },
      origin: new google.maps.LatLng(0, 0)
    }
  }
  

  resizeObserver!: ResizeObserver;

    
  public handleAddressChange(address: any) {
    this.formattedaddress = address.formatted_address;
  }

  onMapReady(map: L.Map, mapContainer: HTMLDivElement) {
    this.resizeObserver = new ResizeObserver(() => {
      map && map.invalidateSize();
    });
    this.resizeObserver.observe(mapContainer);
    map.setZoom(14);
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
  }
}
