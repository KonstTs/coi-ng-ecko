// import { CommonModule } from '@angular/common';
// import { Component, HostBinding, Input, NgModule } from '@angular/core';
// import { Observable } from 'rxjs';

// export type PfButtonSeverity = 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger';
// ``;
// export interface PfButtonConfig {
// 	id?: string;
// 	label?: string;
// 	color?: string;
// 	active?: boolean;
// 	activeColor?: string;
// 	severity?: PfButtonSeverity;
// 	textOnly?: boolean;
// 	icon?: string;
// 	iconPos?: string;
// 	styleClass?: string;
// 	hostClass?: string;
// 	raised?: boolean;
// 	rounded?: boolean;
// 	outline?: boolean;
// 	small?: boolean;
// 	large?: boolean;
// 	disabled?: boolean;
// 	style?: any;
// 	fragment?: string;
// 	disable?: () => boolean;
// 	visible?: () => boolean;
// 	command?: (...args) => void;
// 	command$?: (...args) => Observable<any>;
// }

// @Component({
// 	selector: 'lm-button',
// 	templateUrl: './button.component.html',
// 	styles: [
// 		`
// 			:host button {
// 				border: none;
// 			}
// 			:host ::ng-deep .p-button.p-button-text:enabled:hover {
// 				background: none !important;
// 			}
// 		`
// 	]
// })
// export class LMButtonComponent {
// 	@Input() config?: PfButtonConfig;
// 	@Input() label: string;
// 	@Input() icon: string;
// 	@Input() pInitEditableRow;
// 	@Input() pSaveEditableRow;
// 	@Input() pCancelEditableRow;

// 	@HostBinding('style.pointer-events') get events(): string {
// 		if (this.config?.disabled) return 'none';
// 		return 'auto';
// 	}

// 	@HostBinding('style.color') get style() {
// 		return this.config?.color ?? 'inherit';
// 	}

// 	constructor() {}
// }

// @NgModule({
// 	imports: [CommonModule, ButtonModule, RippleModule],
// 	exports: [LMButtonComponent, ButtonModule],
// 	declarations: [LMButtonComponent]
// })
// export class PfButtonModule {}
