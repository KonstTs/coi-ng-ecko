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
import { TrustHTMLPipe } from '../../directives/html-sanitizer.directive';

export interface IPfTableBaseColdef {
    columnDef: string;
    header: string;
    sticky?: boolean;
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
    CommonModule, MatInputModule, TrustHTMLPipe,
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
    @Input() pagesize = 250;
    @Input() pageSizeOptions = [100, 150, 200, 250];
    @Input() totalsCount = false;
    @Input() pagerClass: string
    
    @Input() searchable = true;
    @Input() sortable: boolean;
    @Input() filterable: boolean;
    @Input() filterableColumns: boolean;
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
    if (this.VM.tableDataSource) { 
        this.VM.tableDataSource.sort = this.sort;
        this.VM.tableDataSource.paginator = this.paginator;
        this.paginator.page.pipe(
          tap(res => console.log('res:', res))
        ).subscribe()
    }
      
    }

    ngOnDestroy(): void {
      this.VM.ngOnDestroy()
    }

}

