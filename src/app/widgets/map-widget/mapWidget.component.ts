import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import * as L from 'leaflet';
import ResizeObserver from 'resize-observer-polyfill';

@Component({
  selector: 'map-widget',
  templateUrl: './mapWidget.component.html',
  styleUrls: ['./mapWidget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapWidgetComponent implements OnDestroy {
  options = {
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

  resizeObserver!: ResizeObserver;

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
