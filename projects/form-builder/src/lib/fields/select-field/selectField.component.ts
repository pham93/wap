import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicField } from '../dynamicField';
import { IFieldControl } from '../IFieldControl';

export interface SelectFieldData {
  options: { key: string; value: string }[];
}

@Component({
  selector: 'form-builder-form-select',
  templateUrl: './selectField.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFieldComponent implements IFieldControl {
  field!: DynamicField<string, IFieldControl, SelectFieldData>;

  form!: FormGroup;
}
