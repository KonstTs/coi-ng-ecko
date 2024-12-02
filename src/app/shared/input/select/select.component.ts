import { AfterViewInit, Component, forwardRef, HostBinding, Injector, Input, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { PfInputBase } from '../input-base';
import { Observable, take } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';


export interface IPfSelectOptions {
    name?: string;
    title?: string;
    value?: string;
    caption?: string;
    data?: any;
    data$?: Observable<any>;
}
const VALUE_ACCESSOR = { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PfSelectComponent), multi: true };
const PF_INPUT_BASE = { provide: PfInputBase, useExisting: forwardRef(() => PfSelectComponent) };


@Component({
  selector: 'pf-select',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [VALUE_ACCESSOR, PF_INPUT_BASE]
})
export class PfSelectComponent extends PfInputBase implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  static nextId = 0;

  @HostBinding() id = `pf-select-${PfSelectComponent.nextId++}`;
  name = `pf-select-${PfSelectComponent.nextId++}`;

  @ViewChild(NgModel) model: NgModel;
  
  @Input() label: string;
  @Input() options: any[];
  @Input() field: string;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() optionLabel = 'name';
  @Input() optionValue = 'id';
  selected:any;


  @Input() optionsFn: (...args: any) => any[];
  @Input() optionsFn$: (...args: any) => Observable<any[]>;


  constructor(injector: Injector) {
    super(injector);
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  valueChanged(value: any) {
    this.onChange(value);
    this.onTouched();
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.selected = value;
  }

  ngOnInit(): void {
    super.ngOnInit();
    // if(this.optionsFn) this.options = this.optionsFn();
    // if(this.optionsFn$) this.optionsFn$().pipe(take(1), untilDestroyed(this)).subscribe(res => this.options = res)
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    if(this.optionsFn) this.options = this.optionsFn();
    if(this.optionsFn$) this.optionsFn$().pipe(take(1), untilDestroyed(this)).subscribe(res => this.options = res)
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}

