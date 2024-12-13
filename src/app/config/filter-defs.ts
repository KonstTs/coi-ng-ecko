import { InjectionToken } from "@angular/core";

export const PF_TABLE_FILTER_MODEL_TOKEN = new InjectionToken<any>('PF_TABLE_FILTER_MODEL');
export type PfFilterModel<T extends IPfPaginationModel> = (T);

export interface IPfPaginationModel { 
    page?: number; 
    per_page?: number;
}

export const PF_DASHBOARD_FILTERS = {
    vs_currency: 'usd', 
    order: 'market_cap_desc', 
    sparkline: false
} 