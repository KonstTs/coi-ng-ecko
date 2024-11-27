export interface IPfCoinSearch{
    coins?: IPfSearchResultCoin[];
    exchanges?: IPfSearchResultExchange[];
    categories?: IPfSearchResultCategory[];
    nfts?: IPfSearchResultNft[];
    icos?: any;
}

export interface IPfSearchResultCoin{
  id: string;
  name?: string;
  api_symbol?: string;
  symbol?: string;
  market_cap_rank?: number;
  thumb?: string;
  large?: string;
}

export interface IPfSearchResultExchange{
  id: string;
  name?: string;
  market_type?: number;
  thumb?: string;
  large?: string;
}

export interface IPfSearchResultCategory{
  id: string;
  name?: string;
}

export interface IPfSearchResultNft{
  id: string;
  name?: string;
  symbol?: string;
  thumb?: string;
}
