/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { IPfCoinMarket } from '../../models/coins/coins-market';
import { environment } from '../../../environments/environment';
import { IPfCoinSearch } from '../../models/coins/coins-search';
import { IPfCoinDefault } from '../../models/coins/coin-default';


@Injectable({
  providedIn: 'root'
})
export class PfCoingeckoService extends BaseService {

    constructor(config: ApiConfiguration, http: HttpClient) {
      super(config, http);
    }

    static readonly coinsMarketGetPath = '/api/v3/coins/markets?vs_currency={vs_currency}d&order={order}sparkline=false&per_page={rows}&page={page}';
    static readonly coinsSearchGetPath = '/api/v3/search?query={query}';
    static readonly coinsSingleGetPath = '/api/v3/coins/{id}';
    static readonly coinsCurrenciesGetPath = '/api/v3/simple/supported_vs_currencies';

    /**
    * "methodName$Response" methods provide access to the full `HttpResponse`, allowing access to response headers.
    * To access only the response body, use the one that follows it.
    */

    //currencies
    apiCoinsCurrenciesGet$Response(params?: { vs_currency:string; rows?: string, page?: string }): Observable<StrictHttpResponse<Array<string>>> {
        const rb = new RequestBuilder(environment.coinGeckoBaseURL, PfCoingeckoService.coinsCurrenciesGetPath, 'get');

        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<Array<string>>)
        );
    }
   
    apiCoinsCurrenciesGet(params?: { vs_currency:string; rows?: string, page?: string }): Observable<Array<string>> {
        return this.apiCoinsCurrenciesGet$Response(params).pipe(map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>));
    }

    //market
    apiCoinsMarketGet$Response(params?: { vs_currency:string; rows?: string, page?: string }): Observable<StrictHttpResponse<Array<IPfCoinMarket>>> {
        const rb = new RequestBuilder(environment.coinGeckoBaseURL, PfCoingeckoService.coinsMarketGetPath, 'get');
        if(params){
            rb.path('rows', params.rows);
            rb.path('page', params.page);
            rb.header('x-cg-demo-api-key', environment.coingeckoApiKey)
        }
        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<Array<IPfCoinMarket>>)
        );
    }
   
    apiCoinsMarketGet(params?: { vs_currency:string; rows?: string, page?: string }): Observable<Array<IPfCoinMarket>> {
        return this.apiCoinsMarketGet$Response(params).pipe(map((r: StrictHttpResponse<Array<IPfCoinMarket>>) => r.body as Array<IPfCoinMarket>));
    }


    //search
    apiCoinsSearchGet$Response(params?: { query?: string }): Observable<StrictHttpResponse<Array<IPfCoinSearch>>> {
        const rb = new RequestBuilder(environment.coinGeckoBaseURL, PfCoingeckoService.coinsSearchGetPath, 'get');
        if(params){
            rb.path('query', params.query);
            rb.header('x-cg-demo-api-key', environment.coingeckoApiKey)
        }
        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<Array<IPfCoinSearch>>)
        );
    }
   
    apiCoinsSearchGet(params?: { query?: string }): Observable<Array<IPfCoinSearch>> {
        return this.apiCoinsSearchGet$Response(params).pipe(map((r: StrictHttpResponse<Array<IPfCoinSearch>>) => r.body as Array<IPfCoinSearch>));
    }



    //get coin
    apiCoinsSingleGet$Response(params?: { id?: string }): Observable<StrictHttpResponse<IPfCoinDefault>> {
        const rb = new RequestBuilder(environment.coinGeckoBaseURL, PfCoingeckoService.coinsSingleGetPath, 'get');
        if(params){
            rb.path('id', params.id);
            rb.header('x-cg-demo-api-key', environment.coingeckoApiKey)
        }
        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<IPfCoinDefault>)
        );
    }
   
    apiCoinsSingleGet(params?: { id?: string }): Observable<IPfCoinDefault> {
        return this.apiCoinsSingleGet$Response(params).pipe(map((r: StrictHttpResponse<IPfCoinDefault>) => r.body as IPfCoinDefault));
    }
}