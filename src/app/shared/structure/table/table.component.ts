import { AfterViewInit, Component, HostBinding, Input, NgModule, OnDestroy, OnInit, TemplateRef, forwardRef } from '@angular/core';
import { PfTableViewModelService } from './table-viewmodel.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface IPfTableBaseColdef {
    columnDef: string;
    header: string;
    cell: (item: any) => TemplateRef<unknown> | string | any;
    //complimentary attrs
    id?: string;
    rowClass?: string;
    cellClass?: string;
    cellEditor?: string;
    dropDownOptions?: any[];
    optionLabel?: string;
    optionValue?: string;
    date?: boolean;
    sort?: boolean;
    filter?: boolean;
    rowClick?: Function;
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
  imports:[MatTableModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class PfTableComponent implements OnInit, OnDestroy, AfterViewInit {
    static nextId = 0;
    @HostBinding() id = `pf-table-${PfTableComponent.nextId++}`;

    @Input() VM!: PfTableViewModelService<any>;
    @Input() columns: IPfTableBaseColdef[] = [];
    @Input() pagination: boolean = true;
    @Input() rowsPerPage = 100;
    @Input() rowsPerPageOptions = [50, 100, 150, 200, 250];
    @Input() totalsCount = false;
    
    @Input() search = true;
    @Input() sort = true;
    @Input() filter = true;
    @Input() reorder = false;
    @Input() freeze: string[] = [];
    
    @Input() stripe = true;
    @Input() styles: any = undefined;

    @Input() rowActions: IPfTableRowAction[] = [];
    @Input() hideActions = true;
    @Input() rowClick: ((...args: any) => void) | undefined;

    displayedColumns: string[] = [];

    constructor(){}

    onRowClick(row: any) {
      if (this.rowClick) this.rowClick(row);
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

