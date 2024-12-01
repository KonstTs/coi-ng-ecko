export const PF_DASHBOARD_COLUMNS = [
    // { columnDef: 'id', header: 'ID', cell: (item: any) => `${item.id}`},
    { columnDef: 'name', header: 'Name', cell: (item: any) => `${item.name}`},
    { columnDef: 'symbol', header: 'Symbol', cell: (item: any) => `${item.symbol}`},
    { columnDef: 'current_price', header: 'Current price', cell: (item: any) => `${item.current_price}`},
    { columnDef: 'market_cap', header: 'Market cap', cell: (item: any) => `${item.market_cap}` },
    { columnDef: 'total_volume', header: 'Total volume', cell: (item: any) => `${item.total_volume}`},
    { columnDef: 'high_24h', header: 'High 24h', cell: (item: any) => `${item.high_24h}`},
    { columnDef: 'low_24h', header: 'Low 24h', cell: (item: any) => `${item.low_24h}`},
    { columnDef: 'price_change_percentage_24h', header: 'Pice change percentage 24h', cell: (row: any) => `${row.price_change_percentage_24h}`},
    { columnDef: 'circulating_supply', header: 'Circulating supply', cell: (item: any) => `${item.circulating_supply}`}
  ];

export const PF_DASHBOARD_LAYOUT_MODES = {

}