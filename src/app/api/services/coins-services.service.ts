/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { IPfCoinMarket } from '../../models/coins-market';


@Injectable({
  providedIn: 'root'
})
export class PfCoingeckoService extends BaseService {
    private readonly coinGeckoBaseURL = 'https://api.coingecko.com';

    constructor(config: ApiConfiguration, http: HttpClient) {
      super(config, http);
    }

    static readonly coinsMarketGetPath = '/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false&per_page={rows}&page={page}';
    static readonly coinSingleGetPath = '/api/v3/coins/{id}';
    static readonly coinsSearchGetPath = '/api/v3/coins/{id}';

    /**
    * "xxxxxxx$Response" methods provide access to the full `HttpResponse`, allowing access to response headers.
    * To access only the response body, use the one that follows it.
    */

    coinsMarketGetPath$Response(params?: { rows?: string, page?: string, pudoPointId?: string}): Observable<StrictHttpResponse<Array<IPfCoinMarket>>> {
        const rb = new RequestBuilder(this.coinGeckoBaseURL, PfCoingeckoService.coinsMarketGetPath, 'get');
        if(params){
            rb.path('rows', params.rows);
            rb.path('page', params.page);
            rb.header('x-cg-demo-api-key', 'CG-x8sLogniDaJxuDFZMWf9z6it')
        }
        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<Array<IPfCoinMarket>>)
        );
    }
   
    coinsMarketGetPath(params?: { rows?: string, page?: string, pudoPointId?: string}): Observable<Array<IPfCoinMarket>> {
        return this.coinsMarketGetPath$Response(params).pipe(map((r: StrictHttpResponse<Array<IPfCoinMarket>>) => r.body as Array<IPfCoinMarket>));
    }


}