import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IFieldControl } from './fields/IFieldControl';
import { DynamicField } from './fields/dynamicField';
import { FormBuilderService } from './formBuilder.service';

@Component({
  selector: 'form-builder-group',
  templateUrl: './formBuilder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent implements OnInit {
  @Input()
  fields: DynamicField<string, IFieldControl>[] = [];

  @Output()
  formReady = new EventEmitter<FormGroup>();

  form!: FormGroup;

  constructor(private readonly formBuilderService: FormBuilderService) {}

  ngOnInit() {
    this.form = this.formBuilderService.toFormGroup(this.fields);
    this.formReady.emit(this.form);
  }
}
