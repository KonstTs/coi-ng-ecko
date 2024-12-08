import { InjectionToken } from "@angular/core";

export interface ICurrencyFormatter {
  value?: number;
  currency?: string;
  locale?: string;
  style?: string;
  setCurrency: (...args: any) => ICurrencyFormatter;
  setLocale: (...args: any) => ICurrencyFormatter;
  format: (...args: any) => ICurrencyFormatter;
  formatWithOptions: (...args: any) => ICurrencyFormatter;
}

export interface IPfCellRenderer {
  CurrencyFormatter: ICurrencyFormatter;
  cells:any;
  defaultCellColor:any;
  defaultCellBgColor:any;
  defaultCellStyle:any;
} 

export const PF_CELL_FORMATTER_TOKEN = new InjectionToken('PF_CELL_FORMATTER')

export const PfCellRenderer = () => {
  const defaultCellColor = 'inherit';
  const defaultCellBgColor = 'transparent';
 const defaultCellStyle = `color: ${defaultCellColor}; background: ${defaultCellBgColor}`;

  const CurrencyFormatter = {
    value: null,
    currency: 'usd',
    locale: 'en-US',
    style: 'currency',
    setCurrency: (_currency: string) => {
      CurrencyFormatter.currency = _currency;
      return CurrencyFormatter;
    },
    setLocale: (_locale: string) => {
      CurrencyFormatter.locale = _locale;
      return CurrencyFormatter;
    },
    format: (_value: number) => {
      const { locale: l, currency: c } = CurrencyFormatter;
      CurrencyFormatter.value = new Intl.NumberFormat(l, { style: 'currency', currency: c }).format(_value);
      return CurrencyFormatter;
    },
    formatWithOptions: (_value: number, _options:any) => {
      const { locale: l, currency: c } = CurrencyFormatter;
      CurrencyFormatter.value = new Intl.NumberFormat(l, { style: 'currency', currency: c, ..._options }).format(_value);
      return CurrencyFormatter;
    }
  };


  const cell = (_value,_style?) => `
     <span style="${_style??defaultCellStyle}">${_value}</span>
  `;
  const cell_image = (_src, _value?) => `
     <div class="pf-ai-center-flex">
        <img class="pf-cell-image pf-mrgr10" src="${_src}"/>
        <span class="pf-cell-image-value">${_value}</span>
      </div>
  `;
  
  const cell_currency = (_value,_style) => `
     ${cell(CurrencyFormatter.format(_value).value, _style)}
  `;

  


  return new function(){
    this.CurrencyFormatter = CurrencyFormatter;
    this.cells = {
      currency: (v,s?) => cell_currency(v,s),
      image: (s, v?) => cell_image(s, v)
    }
    this.defaultCellColor = defaultCellColor;
    this.defaultCellBgColor = defaultCellBgColor;
    this.defaultCellStyle = defaultCellStyle;
  }
}
