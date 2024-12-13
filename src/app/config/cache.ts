import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { PfBrowserCacheService } from '../shared/services/browser-cache.service';
import { PfMemoryCacheService } from '../shared/services/memory-cache.service';

export const SESSIONSTORAGE_CACHE_TOKEN = new InjectionToken<PfCacheService>('SESSIONSTORAGE_CACHE');
export const LOCALSTORAGE_CACHE_TOKEN = new InjectionToken<PfCacheService>('LOCALSTORAGE_CACHE');
export const MEMORY_CACHE_TOKEN = new InjectionToken<PfCacheService>('MEMORY_CACHE');

export const SESSIONSTORAGE_CACHE = { provide: SESSIONSTORAGE_CACHE_TOKEN, useFactory: () => new PfBrowserCacheService(sessionStorage) };
export const LOCALSTORAGE_CACHE = { provide: LOCALSTORAGE_CACHE_TOKEN, useFactory: () => new PfBrowserCacheService(localStorage) };
export const MEMORY_CACHE = { provide: MEMORY_CACHE_TOKEN, useFactory: () => new PfMemoryCacheService() };

export interface PfCacheService {
  get<T>(key: string, args?: any): Observable<T>;
  set(key: string, value: any): Observable<boolean>;
  remove(key: string): Observable<boolean>;
}
