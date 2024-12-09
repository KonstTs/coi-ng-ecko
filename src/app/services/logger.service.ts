import { Inject, Injectable } from '@angular/core';
import { PfLoggingLevel } from '../config/enums';
import { PF_ENVIRONMENT, PfEnvironment } from '../config/environment';

@Injectable()
export class PfLoggerService {
  private _level: PfLoggingLevel;

  constructor(@Inject(PF_ENVIRONMENT) environment: PfEnvironment) {
    this._level = environment.loggerLevel ?? PfLoggingLevel.Verbose;
  }

  logError(message: any, ...params: any[]) {
    this.log(message, PfLoggingLevel.Error, ...params);
  }

  logWarning(message: any, ...params: any[]) {
    this.log(message, PfLoggingLevel.Warning, ...params);
  }

  logInfo(message: any, ...params: any[]) {
    this.log(message, PfLoggingLevel.Info, ...params);
  }

  logVerbose(message: any, ...params: any[]) {
    this.log(message, PfLoggingLevel.Verbose, ...params);
  }

  log(message: any, level = PfLoggingLevel.Warning, ...params: any[]) {
    if (this._level !== PfLoggingLevel.None) {
      if (level >= this._level) {
        switch (level) {
          case PfLoggingLevel.Error:
            console.error(message, ...params);
            break;
          case PfLoggingLevel.Warning:
            console.warn(message, ...params);
            break;
          case PfLoggingLevel.Info:
            console.info(message, ...params);
            break;
          default:
            console.log(message, ...params);
        }
      }
    }
  }
}
