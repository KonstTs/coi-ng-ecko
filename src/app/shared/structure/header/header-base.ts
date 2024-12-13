import { AfterViewInit, Directive, EventEmitter, HostBinding, Injector, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";
import { PfButtonConfig } from "../button/button.component";
import { Observable, of } from "rxjs";
import { PfSelectComponent } from "../../input/select/select.component";
import { PfTextComponent } from "../../input/text/text.component";
import { MatSelect } from "@angular/material/select";
import { MatInput } from "@angular/material/input";


@Directive()
export abstract class PfBaseHeader implements OnInit, AfterViewInit, OnDestroy { 
     static nextId = 0;
     @HostBinding() id = `pf-header-${PfBaseHeader.nextId++}`;
     @Input() title?: string;
     ngOnInit(): void {}
     ngAfterViewInit(): void {}
     ngOnDestroy(): void {}
}


@Directive()
export abstract class PfHeader extends PfBaseHeader implements OnInit, AfterViewInit, OnDestroy{
     @Input() VM?: any;
     @Input() titleIcon?: string;
     @Input() subtitle?: string;
     @Input() styles?: any;
     @Input() cssClass?: string;
     @Input() tpl?: TemplateRef<unknown>;

     constructor() { super() }
     
     public get values() {
          return [this.title, this.subtitle]
     }

     public set values([t, s]) { 
          this.title = t;
          this.subtitle = s;
     }

     ngOnInit(): void {super.ngOnInit()}
     ngAfterViewInit(): void {super.ngAfterViewInit()}
     ngOnDestroy(): void {super.ngOnDestroy()}
    
};

@Directive()
export abstract class PfSectionHeader extends PfHeader implements OnInit, AfterViewInit, OnDestroy{     
     @Input() actions?: PfButtonConfig[];
     @Input() hideActions?: boolean;
     @Input() loading: boolean;
     constructor() { super() }

     ngOnInit(): void {super.ngOnInit()}
     ngAfterViewInit(): void {super.ngAfterViewInit()}
     ngOnDestroy(): void {super.ngOnDestroy()}
};


export type PFHeaderControls = PfTextComponent | PfSelectComponent | MatInput | MatSelect;

@Directive()
export abstract class PfTableHeader extends PfSectionHeader implements OnInit, AfterViewInit, OnDestroy{     
     @Input() sorting?: boolean;
     @Input() filtering?: boolean;
     @Input() searching?: boolean;
     
     @Input() inputControls: PFHeaderControls[];
     @Input() filterFn: (...args) => void;
     @Input() searchFn$ = (...args) => Observable<any>;
     constructor() { super() }

     ngOnInit(): void {super.ngOnInit()}
     ngAfterViewInit(): void {super.ngAfterViewInit()}
     ngOnDestroy(): void {super.ngOnDestroy()}
}

