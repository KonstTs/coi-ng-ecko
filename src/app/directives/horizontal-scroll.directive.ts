import { Directive, ElementRef, Input, HostListener} from '@angular/core';


  @Directive({
    selector: '[scrolly]',
    host: {'(window:wheel)': 'scroll($event)'},
    standalone: true
  })
  export class PfHorizontalScrollerDirective {
    @Input('scrolly') selector: string;
    scroller: Element | HTMLElement;
    allowed = false;

    @HostListener('mouseenter') onMouseEnter() {this.allowed = true}
    @HostListener('mouseleave') onMouseLeave() {this.allowed = false}

    constructor(private _el: ElementRef) { }

    scroll(e:any){
      if(this.scroller && this.allowed) this.scroller.scrollLeft += (e.deltaY > 0 ? 10 : -10);
    }

    ngAfterViewInit(): void {
      setTimeout(() => {
        this.scroller = this._el.nativeElement.querySelector(this.selector);
      })
    }

    ngOnInit() {}
    ngOnDestroy() {}
  }

