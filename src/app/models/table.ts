export interface IPfTableRowActions {
    id?: string;
    icon?: string;
    hostClass?: string;
    command?: (...args: any) => void;
}

export interface PfTableBaseColumnDefs  {
    id?: string | number;
    field: string;
    raw?: any;
    header?: string;
    rowClass?: string;
    cellClass?: string;
    cellEditor?: string;
    dropDownOptions?: any[];
    optionLabel?: string;
    optionValue?: string;
    styled?: boolean;
    date?: boolean;
    sort?: boolean;
    filter?: boolean;
    rowClick?: Function;
  }
 


