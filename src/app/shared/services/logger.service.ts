import { Inject, Injectable } from '@angular/core';
import { PfLoggingLevel } from '../config/enums';
import { PF_ENVIRONMENT, PfEnvironment } from '../config/environment';

@Injectable()
export class PfLoggerService {
  private _level: PfLoggingLevel;

  constructor(@Inject(PF_ENVIRONMENT) environment: PfEnvironment) {
    this._level = environment.loggerLevel ?? PfLoggingLevel.Verbose;
  }

  logError(message: any, ...optionalParams: any[]) {
    this.log(message, PfLoggingLevel.Error, ...optionalParams);
  }

  logWarning(message: any, ...optionalParams: any[]) {
    this.log(message, PfLoggingLevel.Warning, ...optionalParams);
  }

  logInfo(message: any, ...optionalParams: any[]) {
    this.log(message, PfLoggingLevel.Info, ...optionalParams);
  }

  logVerbose(message: any, ...optionalParams: any[]) {
    this.log(message, PfLoggingLevel.Verbose, ...optionalParams);
  }

  log(message: any, level = PfLoggingLevel.Warning, ...optionalParams: any[]) {
    if (this._level !== PfLoggingLevel.None) {
      if (level >= this._level) {
        switch (level) {
          case PfLoggingLevel.Error:
            console.error(message, ...optionalParams);
            break;
          case PfLoggingLevel.Warning:
            console.warn(message, ...optionalParams);
            break;
          case PfLoggingLevel.Info:
            console.info(message, ...optionalParams);
            break;
          default:
            console.log(message, ...optionalParams);
        }
      }
    }
  }
}
