export const PF_DASHBOARD_COLUMNS = [
    // { columnDef: 'id', header: 'ID', cell: (item: any) => `${item.id}`},
    { columnDef: 'name', header: 'Name', cell: (item: any) => `${item.name}`},
    { columnDef: 'symbol', header: 'Symbol', cell: (item: any) => `${item.symbol}`},
    { columnDef: 'current_price', header: 'Current price', cell: (item: any) => `${item.current_price}`},
    { columnDef: 'market_cap', header: 'Market cap', cell: (item: any) => `${item.market_cap}` },
    { columnDef: 'total_volume', header: 'Total volume', cell: (item: any) => `${item.total_volume}`},
    { columnDef: 'high_24h', header: 'High 24h', cell: (item: any) => `${item.high_24h}`},
    { columnDef: 'low_24h', header: 'Low 24h', cell: (item: any) => `${item.low_24h}`},
    { columnDef: 'price_change_percentage_24h', header: '24h%', cell: (row: any) => `${row.price_change_percentage_24h}`},
    { columnDef: 'circulating_supply', header: 'Circulating supply', cell: (item: any) => `${item.circulating_supply}`}
  ];

export type IPfDashboardLayoutType = {
  id: string;
  hostClass: string;
};  

export interface IPF_DASHBOARD_MODE {
  default: IPfDashboardLayoutType;
  min: IPfDashboardLayoutType;
  max: IPfDashboardLayoutType;
};

export const PF_DASHBOARD_LAYOUT_MODES = {
  default: {
    id: 'default',
    hostClass: '',
  },
  min: {
    id: 'min',
    hostClass: '--min',
  },
  max: {
    id: 'max',
    hostClass: '-max',
  }
};

export const COIN_ORDER_QUERY_PARAMS = [
  { value: 'market_cap_asc', label: 'Market cap asc' },
  { value: 'market_cap_desc', label: 'Marketcap Desc' },
  { value: 'volume_asc', label: 'Vol Aasc' },
  { value: 'volume_desc', label: 'Vol Dec' },
  { value: 'id_asc', label: 'Id Asc' },
  { value: 'id_desc', label: 'Id Dsc' }
];
