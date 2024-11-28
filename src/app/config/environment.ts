import { InjectionToken } from '@angular/core';
import { PfLoggingLevel } from './enums';

export interface PfEnvironment {
  production: boolean;
  loggerLevel: PfLoggingLevel;
}

export const PF_ENVIRONMENT = new InjectionToken<PfEnvironment>('Environment');
