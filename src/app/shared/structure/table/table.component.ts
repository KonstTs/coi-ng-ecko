import { AfterViewInit, Component, HostBinding, Input, NgModule, OnDestroy, OnInit, TemplateRef, ViewChild, forwardRef } from '@angular/core';
import { PfTableViewModelService } from './table-viewmodel.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';

export interface IPfTableBaseColdef {
    columnDef: string;
    header: string;
    cell: (item: any) => TemplateRef<unknown> | string | any;
}

export interface IPfTableRowAction {
    id?: string;
    icon?: string;
    hostClass?: string;
    command?: (...args: any) => void;
  }


@Component({
  selector: 'pf-table',
  standalone: true,
  imports:[CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, AsyncPipe],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class PfTableComponent implements OnInit, OnDestroy, AfterViewInit {
    static nextId = 0;
    @HostBinding() id = `pf-table-${PfTableComponent.nextId++}`;
    @ViewChild('MatTable') MatTable: MatTable<any>;

    @Input() VM: PfTableViewModelService<any>;
    @Input() columns: IPfTableBaseColdef[];
    @Input() displayedColumns: string[];
    @Input() pagination: boolean = true;
    @Input() rowsPerPage = 100;
    @Input() rowsPerPageOptions = [50, 100, 150, 200, 250];
    @Input() totalsCount = false;
    
    @Input() search = true;
    @Input() sort = true;
    @Input() filter = true;
    @Input() reorder = false;
    @Input() freeze: string[] = [];
    @Input() stick = false;

    @Input() stripe = true;
    @Input() styles: any = undefined;

    @Input() rowActions: IPfTableRowAction[] = [];
    @Input() hideActions = true;
    @Input() rowClickFn: ((...args: any) => void) | undefined;

    // displayedColumns: string[];

    constructor(){}

    onRowClick(row: any) {
      if (this.rowClickFn) this.rowClickFn(row);
    }

    ngOnInit(): void {
      this.VM.ngOnInit();
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
      this.VM.ngOnDestroy()
    }

}

