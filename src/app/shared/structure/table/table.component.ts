import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostBinding, Input, NgModule, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PfTableViewModelService } from './table-viewmodel.service';
import { PfBaseEntity } from '../../../models/base-entity';
import { PF_TABLE_BASE_ROW_ACTIONS } from '../../../config/table';
import { IPfTableRowActions, PfTableBaseColumnDefs } from '../../../models/table';


@Component({
  selector: 'pf-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class PfTableComponent implements OnInit, OnDestroy, AfterViewInit {
    static nextId = 0;
    @HostBinding() id = `pf-table-${PfTableComponent.nextId++}`;

    @Input() VM!: PfTableViewModelService<PfBaseEntity>;
    @Input() cols: PfTableBaseColumnDefs[] | any = [];
    @Input() pagination: boolean = true;
    @Input() total = false;
    @Input() rowsPerPage = 100;
    @Input() rowsPerPageOptions = [50, 100, 150, 200, 250];
    @Input() reorderable = false;
    @Input() filterable = true;
    @Input() sortable = true;
    @Input() frozenColumns: string[] = [];
    @Input() styles: any = undefined;
    @Input() striped = true;
    @Input() rowActions: IPfTableRowActions[] = [];
    @Input() hideActions = true;
    @Input() rowClick: ((...args: any) => void) | undefined;

    constructor(){}

    onRowClick(row: any) {
      if (this.rowClick) this.rowClick(row);
    }

    ngOnInit(): void {
      if(this.VM && this.VM.ngOnInit) this.VM.ngOnInit();
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
      if(this.VM && this.VM.ngOnDestroy) this.VM.ngOnDestroy()
    }

}


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [PfTableComponent],
  declarations: [PfTableComponent]
})
export class PfTableModule {}


