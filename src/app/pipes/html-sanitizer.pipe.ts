import { Directive, ElementRef, Input, HostListener, Pipe} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: "trustHTML",
    standalone: true,
  })
  export class TrustHTMLPipe {
    constructor(private sanitizer: DomSanitizer) {}
  
    transform(html) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
  }