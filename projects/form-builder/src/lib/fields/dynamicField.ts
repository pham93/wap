import { Type } from '@angular/core';
import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';

import { IFieldControl } from './IFieldControl';

export interface FieldOptions<T extends any, V extends IFieldControl, X = V['field']['data']> {
  value?: T;
  key?: string;
  label?: string;
  validators?: ValidatorFn | ValidatorFn[] | AbstractControlOptions;
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
  order?: number;
  component?: Type<V>;
  data?: X;
}

export class DynamicField<T extends any, V extends IFieldControl, X = V['field']['data']> {
  value?: T;
  key: string;
  label: string;
  validators?: ValidatorFn | ValidatorFn[] | AbstractControlOptions;
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
  order: number;
  component?: Type<V>;
  data?: X;

  constructor(options: FieldOptions<T, V> = {}) {
    this.value = options.value;
    this.key = options.key ?? '';
    this.label = options.label ?? '';
    this.validators = options.validators ?? [];
    this.asyncValidators = options.asyncValidators ?? [];
    this.order = options.order === undefined ? 1 : options.order;
    this.component = options.component;
    this.data = options.data;
  }
}
