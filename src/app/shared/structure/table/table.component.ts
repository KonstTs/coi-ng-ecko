import { AfterViewInit, Component, HostBinding, Input, NgModule, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, forwardRef } from '@angular/core';
import { PfTableViewModelService } from './table-viewmodel.service';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { catchError, debounceTime, distinctUntilChanged, from, fromEvent, of, startWith, Subject, switchMap, takeLast, tap } from 'rxjs';
import { PfBaseEntity } from '../../../config/base-entity';
import { TrustHTMLPipe } from '../../directives/html-sanitizer.directive';
import { PfDashboardViewModelService } from '../../../views/dashboard/dashboard-viewmodel.service';
import { SESSIONSTORAGE_CACHE } from '../../../config/cache';
import { getElement } from '../../utils';

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
  imports: [
    CommonModule, MatInputModule, TrustHTMLPipe,
    MatPaginator, MatTableModule, MatPaginatorModule, MatSortModule
  ],
  providers: [SESSIONSTORAGE_CACHE],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class PfTableComponent implements OnInit, OnDestroy, AfterViewInit {
  static nextId = 0;
  loading = true;
    
  @HostBinding() id = `pf-table-${PfTableComponent.nextId++}`;
  @ViewChild('MatTable') MatTable: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterCtrl') filterCtrl: MatInput;

  @Input() VM: PfDashboardViewModelService;
  @Input() pagination: boolean = true;
  @Input() pagesize = 50;
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
  @Input() filterFn: ((e: UIEvent) => void) | undefined;

  constructor(private _renderer: Renderer2) { }

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
    this.VM.notificationSvc.alerted$.pipe(
      switchMap(_ => { 
        this.paginator.pageIndex = this.VM.filterModel.page = 1
			  return this.VM.getRows(this.VM.filterModel)
      })
    ).subscribe(res => {
      if (res) this.VM.tableDataSource = new MatTableDataSource(res)
    }) 
      
    this.VM.isBusy$.subscribe(busy => this.loading = busy)
    
    
    this.VM.tableDataSource.sort = this.sort;
    this.VM.tableDataSource.paginator = this.paginator;
    this.VM.filterModel.per_page = this.paginator.pageSize;

    this.paginator.page
      .pipe(
        startWith({}),
      // debounceTime(300),
        // switchMap(_ => this.VM.isBusy$),

        tap(_ => { 
          this.VM.emitIsBusy(true)
          this.VM.filterModel.page = this.paginator.pageIndex + 1
        }),
        switchMap(() => this.VM.getRows$(this.VM.filterModel)),
        catchError(error => {
          this.VM.handleError$(error);

          return of(null);
        })
      )
      .subscribe((res) => {
        console.log('res:', res)
        if (res) this.VM.tableDataSource = new MatTableDataSource(res);
        this.VM.emitIsBusy(false)
      });
  
  }

  onMouseEnter() {
    const cdkoc = getElement('.cdk-overlay-container');
    if(cdkoc) this._renderer.addClass(cdkoc, 'pf-display-none');
  }
  onMouseLeave() {
    const cdkoc = getElement('.cdk-overlay-container');
    if(cdkoc) this._renderer.removeClass(cdkoc, 'pf-display-none');
  }

    ngOnDestroy(): void {
      this.VM.ngOnDestroy()
    }

}

