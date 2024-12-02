import { AfterViewInit, Component, HostBinding, Input, NgModule, OnDestroy, OnInit, TemplateRef, ViewChild, forwardRef } from '@angular/core';
import { PfTableViewModelService } from './table-viewmodel.service';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, from, fromEvent, of, Subject, switchMap, tap } from 'rxjs';
import { PfBaseEntity } from '../../../config/base-entity';

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
  imports:[
    CommonModule, AsyncPipe, MatFormField, MatInputModule,
    MatPaginator, MatTableModule, MatPaginatorModule,MatSortModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class PfTableComponent implements OnInit, OnDestroy, AfterViewInit {
    static nextId = 0;

    
    @HostBinding() id = `pf-table-${PfTableComponent.nextId++}`;
    @ViewChild('MatTable') MatTable: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filterCtrl') filterCtrl: MatInput;

    @Input() VM: PfTableViewModelService<PfBaseEntity>;
    @Input() dataSource: MatTableDataSource<any>
    @Input() columns?: IPfTableBaseColdef[];
    @Input() displayedColumns?: string[];
    @Input() pagination: boolean = true;
    @Input() pagesize = 100;
    @Input() pageSizeOptions = [10, 15, 20, 200, 250];
    @Input() totalsCount = false;
    
    @Input() searchable = true;
    @Input() sortable: boolean;
    @Input() filterable: boolean;
    @Input() reorderable = false;
    @Input() freeze: string[] = [];
    @Input() sticky = false;

    @Input() stripe = true;
    @Input() styles: any = undefined;

    @Input() rowActions: IPfTableRowAction[] = [];
    @Input() hideActions = true;
    @Input() rowClickFn: ((...args: any) => void) | undefined;
    @Input() filterFn: ((e:UIEvent) => void) | undefined;

    constructor(){}

    onRowClick(row: any) {
      if (this.rowClickFn) this.rowClickFn(row);
    }

    onFilter(e: Event) {
      this.VM.tableDataSource.filter = (e.target as HTMLInputElement).value.trim().toLowerCase();
      if (this.VM.tableDataSource.paginator) this.VM.tableDataSource.paginator.firstPage();
    }

    ngOnInit(): void {
      this.VM.ngOnInit()
    }

    ngAfterViewInit(): void {
      this.VM.tableDataSource.sort = this.sort;
      this.VM.tableDataSource.paginator = this.paginator;
      console.log('this.sort:', this.sort)
      console.log('this.paginator:', this.paginator)
      this.paginator.page.pipe(
        tap(res => console.log('res:', res))
      ).subscribe()
    }

    ngOnDestroy(): void {
      this.VM.ngOnDestroy()
    }

}

