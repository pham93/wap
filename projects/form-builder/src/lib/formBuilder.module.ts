import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFieldDirective } from './fields';
import { FormBuilderComponent } from './formBuilder.component';

@NgModule({
  declarations: [FormBuilderComponent, DynamicFieldDirective],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormBuilderComponent],
})
export class FormBuilderModule {}
