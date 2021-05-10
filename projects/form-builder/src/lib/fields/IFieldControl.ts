import { FormGroup } from '@angular/forms';
import { DynamicField } from './dynamicField';

export interface IFieldControl {
  field: DynamicField<any, any, any>;

  form: FormGroup;
}
