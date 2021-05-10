import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { IFieldControl } from './fields/IFieldControl';
import { DynamicField } from './fields/dynamicField';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  constructor() {}

  toFormGroup(fields: DynamicField<string, IFieldControl>[]) {
    const group: any = {};

    fields.forEach((field) => {
      group[field.key] = new FormControl(
        field.value ?? '',
        field.validators,
        field.asyncValidators
      );
    });
    return new FormGroup(group);
  }
}
