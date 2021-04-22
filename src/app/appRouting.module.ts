import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'main', loadChildren: async () => (await import('./pages/main-page/mainPage.module')).MainPageModule },
  { path: '', redirectTo: 'main', pathMatch: 'full'},
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
