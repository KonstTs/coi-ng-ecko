import { Inject, Injectable, InjectionToken, Injector, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { PfTableViewModelService } from '../../shared/structure/table/table-viewmodel.service';
import { PfCoin } from '../../models/coins/coin-global-type';
import { PfCoingeckoService } from '../../api/services/coins-services.service';
import { IPfCoinMarket } from '../../models/coins/coins-market';
import { PF_DASHBOARD_BASE_QUERY_TOKEN } from './dashboard.component';



@Injectable()
export class PfDashboardViewModelService extends PfTableViewModelService<PfCoin> implements OnInit, OnDestroy {
    protected override getRowsCb = this.getRows.bind(this);
    protected override searchCb = this.search.bind(this);
    protected override getItemCb = this.getItem.bind(this) 

    constructor(
        injector: Injector,
        @Inject(PF_DASHBOARD_BASE_QUERY_TOKEN) public _query:any,
        @Inject(forwardRef(() => PfCoingeckoService)) public apiSvc: PfCoingeckoService
    ){
        super(injector, _query);
    }

    processReponse = (res:PfCoin[]) => {
        return res;
    }

    getRows(_query: any){
        // return this.apiSvc.apiCoinsMarketGet(_query).pipe(switchMap((res:any) => of(this.processReponse(res))))
    return of(this.processReponse([{
      "id": "bitcoin",
      "symbol": "btc",
      "name": "Bitcoin",
      "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
      "current_price": 94834,
      "market_cap": 1874484178489,
      "market_cap_rank": 1,
      "fully_diluted_valuation": 1989227459908,
      "total_volume": 66663187859,
      "high_24h": 96666,
      "low_24h": 94716,
      "price_change_24h": -1788.2976039376517,
      "price_change_percentage_24h": -1.85081,
      "market_cap_change_24h": -36338238552.74878,
      "market_cap_change_percentage_24h": -1.90171,
      "circulating_supply": 19788671,
      "total_supply": 21000000,
      "max_supply": 21000000,
      "ath": 99645,
      "ath_change_percentage": -4.88068,
      "ath_date": "2024-11-22T19:35:49.770Z",
      "atl": 67.81,
      "atl_change_percentage": 139677.93655,
      "atl_date": "2013-07-06T00:00:00.000Z",
      "roi": null,
      "last_updated": "2024-11-28T21:00:09.643Z"
    },
    {
      "id": "ethereum",
      "symbol": "eth",
      "name": "Ethereum",
      "image": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
      "current_price": 3560.37,
      "market_cap": 428443931971,
      "market_cap_rank": 2,
      "fully_diluted_valuation": 428443931971,
      "total_volume": 38286633789,
      "high_24h": 3682.28,
      "low_24h": 3534.44,
      "price_change_24h": -62.44904328418852,
      "price_change_percentage_24h": -1.72377,
      "market_cap_change_24h": -7063600197.927246,
      "market_cap_change_percentage_24h": -1.62192,
      "circulating_supply": 120436471.504176,
      "total_supply": 120436471.504176,
      "max_supply": null,
      "ath": 4878.26,
      "ath_change_percentage": -27.17401,
      "ath_date": "2021-11-10T14:24:19.604Z",
      "atl": 0.432979,
      "atl_change_percentage": 820411.5762,
      "atl_date": "2015-10-20T00:00:00.000Z",
      "roi": {
        "times": 49.2003221908926,
        "currency": "btc",
        "percentage": 4920.03221908926
      },
      "last_updated": "2024-11-28T21:00:02.317Z"
    },
    {
      "id": "tether",
      "symbol": "usdt",
      "name": "Tether",
      "image": "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
      "current_price": 1.001,
      "market_cap": 133142954704,
      "market_cap_rank": 3,
      "fully_diluted_valuation": 133142954704,
      "total_volume": 74906409782,
      "high_24h": 1.004,
      "low_24h": 0.998194,
      "price_change_24h": -0.0004864315860722,
      "price_change_percentage_24h": -0.04858,
      "market_cap_change_24h": 291909181,
      "market_cap_change_percentage_24h": 0.21973,
      "circulating_supply": 133205067986.126,
      "total_supply": 133205067986.126,
      "max_supply": null,
      "ath": 1.32,
      "ath_change_percentage": -24.51531,
      "ath_date": "2018-07-24T00:00:00.000Z",
      "atl": 0.572521,
      "atl_change_percentage": 74.44502,
      "atl_date": "2015-03-02T00:00:00.000Z",
      "roi": null,
      "last_updated": "2024-11-28T21:00:00.077Z"
    },
    {
      "id": "solana",
      "symbol": "sol",
      "name": "Solana",
      "image": "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
      "current_price": 235.72,
      "market_cap": 111794332465,
      "market_cap_rank": 4,
      "fully_diluted_valuation": 138689543378,
      "total_volume": 5644514238,
      "high_24h": 245.03,
      "low_24h": 233.57,
      "price_change_24h": -6.023386216960802,
      "price_change_percentage_24h": -2.49164,
      "market_cap_change_24h": -2885505694.7821503,
      "market_cap_change_percentage_24h": -2.51614,
      "circulating_supply": 474906441.573684,
      "total_supply": 589158288.055607,
      "max_supply": null,
      "ath": 263.21,
      "ath_change_percentage": -10.62541,
      "ath_date": "2024-11-23T15:05:59.896Z",
      "atl": 0.500801,
      "atl_change_percentage": 46872.80591,
      "atl_date": "2020-05-11T19:35:23.449Z",
      "roi": null,
      "last_updated": "2024-11-28T21:00:09.445Z"
    },
    {
      "id": "binancecoin",
      "symbol": "bnb",
      "name": "BNB",
      "image": "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
      "current_price": 653.28,
      "market_cap": 95196939387,
      "market_cap_rank": 5,
      "fully_diluted_valuation": 95196939387,
      "total_volume": 2420017826,
      "high_24h": 660.09,
      "low_24h": 639.17,
      "price_change_24h": 12.29,
      "price_change_percentage_24h": 1.91658,
      "market_cap_change_24h": 1611177436,
      "market_cap_change_percentage_24h": 1.72161,
      "circulating_supply": 145887575.79,
      "total_supply": 145887575.79,
      "max_supply": 200000000,
      "ath": 717.48,
      "ath_change_percentage": -9.0897,
      "ath_date": "2024-06-06T14:10:59.816Z",
      "atl": 0.0398177,
      "atl_change_percentage": 1638013.20256,
      "atl_date": "2017-10-19T00:00:00.000Z",
      "roi": null,
      "last_updated": "2024-11-28T21:00:08.919Z"
    },
    {
      "id": "ripple",
      "symbol": "xrp",
      "name": "XRP",
      "image": "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
      "current_price": 1.48,
      "market_cap": 84071984319,
      "market_cap_rank": 6,
      "fully_diluted_valuation": 147478486029,
      "total_volume": 5911062543,
      "high_24h": 1.5,
      "low_24h": 1.44,
      "price_change_24h": -0.019186023425373788,
      "price_change_percentage_24h": -1.28279,
      "market_cap_change_24h": -1210790581.9687653,
      "market_cap_change_percentage_24h": -1.41974,
      "circulating_supply": 56998852241,
      "total_supply": 99986987365,
      "max_supply": 100000000000,
      "ath": 3.4,
      "ath_change_percentage": -56.75534,
      "ath_date": "2018-01-07T00:00:00.000Z",
      "atl": 0.00268621,
      "atl_change_percentage": 54610.91356,
      "atl_date": "2014-05-22T00:00:00.000Z",
      "roi": null,
      "last_updated": "2024-11-28T21:00:07.930Z"
    },
    {
      "id": "dogecoin",
      "symbol": "doge",
      "name": "Dogecoin",
      "image": "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
      "current_price": 0.397084,
      "market_cap": 58300496266,
      "market_cap_rank": 7,
      "fully_diluted_valuation": 58306732226,
      "total_volume": 7156394777,
      "high_24h": 0.423947,
      "low_24h": 0.39305,
      "price_change_24h": -0.006005427154143317,
      "price_change_percentage_24h": -1.48985,
      "market_cap_change_24h": -966533407.2537613,
      "market_cap_change_percentage_24h": -1.63081,
      "circulating_supply": 146967556383.705,
      "total_supply": 146983276383.705,
      "max_supply": null,
      "ath": 0.731578,
      "ath_change_percentage": -45.80292,
      "ath_date": "2021-05-08T05:08:23.458Z",
      "atl": 0.0000869,
      "atl_change_percentage": 456144.90154,
      "atl_date": "2015-05-06T00:00:00.000Z",
      "roi": null,
      "last_updated": "2024-11-28T21:00:02.249Z"
    },
    {
      "id": "usd-coin",
      "symbol": "usdc",
      "name": "USDC",
      "image": "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
      "current_price": 1,
      "market_cap": 39427299505,
      "market_cap_rank": 8,
      "fully_diluted_valuation": 39427642823,
      "total_volume": 10792169239,
      "high_24h": 1.003,
      "low_24h": 0.997931,
      "price_change_24h": 0.00088354,
      "price_change_percentage_24h": 0.08841,
      "market_cap_change_24h": 343131589,
      "market_cap_change_percentage_24h": 0.87793,
      "circulating_supply": 39455564602.7955,
      "total_supply": 39455908167.5717,
      "max_supply": null,
      "ath": 1.17,
      "ath_change_percentage": -14.813,
      "ath_date": "2019-05-08T00:40:28.300Z",
      "atl": 0.877647,
      "atl_change_percentage": 13.82635,
      "atl_date": "2023-03-11T08:02:13.981Z",
      "roi": null,
      "last_updated": "2024-11-28T20:59:59.560Z"
    }]))

    }

    search(_term: string) {
        return this.apiSvc.apiCoinsSearchGet({ query: _term });
    }

    getItem(_id: string){
        return this.apiSvc.apiCoinsSingleGet({id: _id})
    }

    override ngOnInit(): void {
        super.ngOnInit()
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
    }
}





