import { IPfCoinDefault } from "./coin-default";
import { IPfCoinMarket } from "./coins-market";
import { IPfCoinSearch } from "./coins-search";

export type PfCoin = IPfCoinDefault | IPfCoinMarket | IPfCoinSearch;