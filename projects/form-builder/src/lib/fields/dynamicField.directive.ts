import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicField } from './dynamicField';
import { IFieldControl } from './IFieldControl';

@Directive({
  selector: '[formBuilderDynamicField]',
})
export class DynamicFieldDirective implements OnInit {
  @Input()
  field!: DynamicField<unknown, IFieldControl>;

  @Input()
  form!: FormGroup;

  component!: ComponentRef<IFieldControl>;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {}

  ngOnInit() {
    if (this.field?.component) {
      const factory = this.resolver.resolveComponentFactory<IFieldControl>(this.field.component);
      this.component = this.container.createComponent(factory);
      this.component.instance.field = this.field;
      this.component.instance.form = this.form;
    }
  }
}
