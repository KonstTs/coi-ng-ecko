import { colorme } from "../../shared/utils";
import { PfDashboardViewModelService } from "./dashboard-viewmodel.service";
import { PfButtonConfig } from '../../shared/structure/button/button.component';

export type IPfDashboardLayoutType = {
  id: string;
  hostClass: string;
};  

export interface IPF_DASHBOARD_MODE {
  default: IPfDashboardLayoutType;
  min: IPfDashboardLayoutType;
  max: IPfDashboardLayoutType;
};

export const DASHBOARD_CONFIG = {
  columns: [
    // { columnDef: 'id', header: 'ID', cell: (item: any) => `${item.id}`},
    { columnDef: 'name', header: 'Name', sticky: true, cell: (item: any) => `${item.name}`},
    { columnDef: 'symbol', header: 'Symbol', cell: (item: any) => `${item.symbol}`},
    { columnDef: 'current_price', header: 'Current price', cell: (item: any) => `${item.current_price}`},
    { columnDef: 'market_cap', header: 'Market cap', cell: (item: any) => `${item.market_cap}` },
    { columnDef: 'total_volume', header: 'Total volume', cell: (item: any) => `${item.total_volume}`},
    { columnDef: 'high_24h', header: 'High 24h', cell: (item: any) => `${item.high_24h}`},
    { columnDef: 'low_24h', header: 'Low 24h', cell: (item: any) => `${item.low_24h}`},
    { columnDef: 'price_change_percentage_24h', header: '24h%', cell: (row: any) => `${row.price_change_percentage_24h}`},
    { columnDef: 'circulating_supply', header: 'Circulating supply', cell: (item: any) => `${item.circulating_supply}`}
  ],
  layouts: {
    min: {
      id: 'min',
      hostClass: '--min',
      iconClass: 'toast'
    },
    default: {
      id: 'default',
      hostClass: '',
      iconClass: 'chips'
    },
    
    max: {
      id: 'max',
      hostClass: '--max',
      iconClass: 'toolbar'
    }
  },
  ordering: [
    { value: 'market_cap_asc', label: 'MCap Asc' },
    { value: 'market_cap_desc', label: 'MCap Desc' },
    { value: 'volume_asc', label: 'Vol Asc' },
    { value: 'volume_desc', label: 'Vol Desc' },
    { value: 'id_asc', label: 'Id Asc' },
    { value: 'id_desc', label: 'Id Desc' }
  ],

  provideLayoutActionsFor: (layouts, fn): PfButtonConfig[] =>
    Object.entries(layouts)
      .map(([key, obj]) =>
      ({
          id: key,
          color: '#c1c1c1',
          activeColor: '#4285f4',
          icon: (<any>obj).iconClass,
          command: () => fn(key),
          ...(key === 'default' && { active: true })
      })),


  provideChartData: ([d, v]: [[], []], vm: PfDashboardViewModelService): any => {
    const { Renderer: { CurrencyFormatter: { formatWithOptions } } } = vm;
    const fo = { maximumFractionDigits: 2, notation: 'compact' };
    const clr = v.map(_ => `#${colorme()}`)
    const stacks = d.map((dt, i) => ({ name: dt, type: 'bar', stack: 'total', label: { show: false }, data:[{ value: v[i], itemStyle: { color: clr[i] } }] }))
    
    return {
      bar: {
        xAxis: { data: d },
        yAxis: {
          axisLabel: {
            formatter: (d) => formatWithOptions(d, fo).value
          }
        },
        series: [{
          name: 'Market Cap',
          type: 'bar',
          itemStyle: { borderRadius: [50, 50, 0, 0] },
          data: v?.map((val,i) => ({ value: val, itemStyle: { color: clr[i] } }))
        }]
      },
      stack: {
        series: stacks,
        focus: 'series'
      }
    }
  }
}
