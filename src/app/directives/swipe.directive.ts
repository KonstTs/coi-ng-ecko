import { CommonModule } from '@angular/common';
import { Directive, HostListener, Output, EventEmitter, HostBinding, ElementRef, OnInit, OnDestroy, Input, NgModule, Renderer2} from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
 
  export interface IpfSwipeEvent {
    element: pfSwipeDirective;
    incrX: number;
    incrY: number;
  }

  export interface IpfSwipeoptions {
    mode: string;
    status: string;
    state: any | IpfSwipeState;
    onSwipeCssClass?: string;
    min?: number;
    max?: number;
    position?: number;
    resetFn?: (...args) => void;
    minFn?: (...args) => void;
    maxFn?: (...args) => void;
    setOption?: (option, value) => void;
    setoptions?: (obj:IpfSwipeoptions) => void;
    setState?: (state:IpfSwipeState) => void;
    setStatus?: (status:string) => void;
  }

  export type IpfSwipeState = {
    [status: string]: { min: number; max: number; x: number; y: number };
  };

export type IpfCoords = {x:number, y:number}
  @Directive({
    selector: '[swipe]',
    exportAs: 'swipe',
    standalone: true
  })
  export class pfSwipeDirective {
    @Input('swipe') direction: 'horizontal' | 'vertical' | null = null;
    @Input('swipeoptions') options?:IpfSwipeoptions;
    @Output() onSwipe: EventEmitter<any> = new EventEmitter<any>();
 
    @HostBinding('style') get _() {
      return this.style;
    }
    @HostBinding('class.pf-user-select-none') get __() {
      return this.onDrag;
    }

    nativeEl: HTMLElement;
    origin: IpfCoords = { x: 0, y: 0 };
    style: any = null;
    rect: IpfCoords = { x: 0, y: 0 };
    incrX: number = 0;
    incrY: number = 0;

    isTouched:boolean=false;
    move$: any;
    trigger$: any;
    onDrag:boolean=false;
   
    mode: string;
    status: string;
    state: IpfSwipeState;
    onSwipeCssClass: string;
    min: number;
    max: number;
   
    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
      this.nativeEl = this.elementRef.nativeElement;
    }

    setStatus(_status){
      this.status = _status;
      if(this.direction==='horizontal') this.style = { transform: `translateX(${this.state[_status].x}px)`}
      if(this.direction==='vertical') this.style = { transform: `translateY(${this.state[_status].y}px)`}
    }

    private engage(){
      if(this.options){
        this.mode = this.options.mode;
        this.state = this.options.state;
        this.onSwipeCssClass = this.options.onSwipeCssClass;
        this.setStatus(this.options.status)
      }
    }
   
    ngOnInit() {
      this.engage();

      this.trigger$ = merge(
        fromEvent(this.elementRef.nativeElement, 'mousedown').pipe(tap(_=>this.isTouched=false)),
        fromEvent(this.elementRef.nativeElement, 'touchstart').pipe(tap(_=>this.isTouched=true),
          map((e: any|TouchEvent) => ({
            target: e.target,
            screenX: e.touches[0].screenX,
            screenY: e.touches[0].screenY
          }))
        )
      ).subscribe((e: any|MouseEvent) => {
        this.onDrag = true;
        this.origin = {
          x: e.screenX,
          y: e.screenY
        };
        merge(fromEvent(document, 'mouseup'), fromEvent(document, 'touchend'))
          .pipe(take(1))
          .subscribe(() => {
            if (this.move$) {
              this.move$.unsubscribe();
              this.move$ = undefined;
            }
            this.rect = { y: this.incrY, x: this.incrX };
            this.onDrag=true;
            this.onSwipe.emit({
              element: this,
              incrX: this.incrX,
              incrY: this.incrY
            });
            if (this.onSwipeCssClass) this.renderer.removeClass(this.nativeEl, this.onSwipeCssClass);
          });
 
        if (!this.move$) {
          this.move$ = merge(
            fromEvent(document, 'mousemove'), fromEvent(document, 'touchmove')
            .pipe(
              map((e: any|Event) => ({
                target: e.target,
                screenX: e.touches[0].screenX,
                screenY: e.touches[0].screenY
              }))
            ))
            .subscribe((e: any|MouseEvent) => {
              if(this.onSwipeCssClass) this.renderer.addClass(this.nativeEl, this.onSwipeCssClass);
              this.incrX = this.rect.x + e.screenX - this.origin.x;
              this.incrY = this.rect.y + e.screenY - this.origin.y;
              this.style =
                  this.direction == 'horizontal' ? { transform: 'translateX(' + this.incrX + 'px)' } :
                  this.direction == 'vertical' ? { transform: 'translateY(' + this.incrY + 'px)' } :
                  { transform: 'translate(' + this.incrX + 'px,' + this.incrY + 'px)'};


              if (this.direction && this.isTouched) window.scrollBy(
                  this.direction == 'horizontal' ? e.screenX - this.origin.x : 0,
                  this.direction == 'vertical' ? e.screenY - this.origin.y : 0
                  );
            })
        }
      });
 
    }


    ngOnDestroy() {
      this.trigger$.unsubscribe();
    }
    reset() {
      this.style = null;
      this.rect = { x: 0, y: 0 };
    }
  }

