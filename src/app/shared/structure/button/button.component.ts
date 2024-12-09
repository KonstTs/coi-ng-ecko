import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs';

export interface PfButtonConfig {
	id?: string;
	label?: string;
	color?: string;
	bgColor?: string;
	styleClass?: string;
	raised?: boolean;
	flat?: boolean;
	stroked?: boolean;
	icon?: string;
	iconSet?: PfButtonIconSet[];
	iconColor?: string;
	iconSize?: string;
	active?: boolean;
	activeColor?: string;
	hostClass?: string;
	disabled?: boolean;
	style?: any;
	disable?: () => boolean;
	visible?: () => boolean;
	command?: (...args) => void;
	command$?: (...args) => Observable<any>;
}

export type PfButtonIconSet = { name: string; value:string, active:boolean}

@Component({
     selector: 'pf-button',
     standalone: true,
     imports:[CommonModule, MatIconButton, MatIcon],
     templateUrl: './button.component.html',
     styles: []
})
export class PfButtonComponent {
	@Input() config?: PfButtonConfig;
	@Input() label: string;
	@Input() icon: string;

	@HostBinding('style.pointer-events') get events(): string {
		if (this.config?.disabled) return 'none';
		return 'auto';
	}

	constructor() {}
}
