import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Directive, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';


@UntilDestroy()
@Directive()
export abstract class PfInputBase implements OnInit, AfterContentInit, AfterViewInit, OnDestroy, ControlValueAccessor {
    abstract model: NgModel;
    id: string;

    @Input() label: string;
    @Input() name: string;
    @Input() placeholder: string;
    @Input() description: string;
    @Input() hint: string;
    @Input() disabled = false;
    @Input() required = false;
    @Input() updateOn: 'change' | 'blur' = 'blur';
  
    get value(): any {
        return this.innerValue;
    }

    set value(value: any) {
        if (this.innerValue !== value) {
            this.innerValue = value;
            this.changed.forEach((f) => f(value));
        }
    }

    protected changed = new Array<(value: any) => void>();
    protected touched = new Array<() => void>();
    protected innerValue: any;
    protected cdr: ChangeDetectorRef;

    constructor(protected injector: Injector) {
        this.cdr = injector.get(ChangeDetectorRef);
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.changed.push(fn);
    }

    registerOnTouched(fn: any): void {
        this.touched.push(fn);
    }

    markForCheck() {
        this.cdr.markForCheck();
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.markForCheck();
    }

    blur() {
        this.touched.forEach((f) => f());
    }

    ngOnInit(): void {}
    ngAfterContentInit(): void {}
    ngAfterViewInit(): void {}
    ngOnDestroy(): void {}

}



