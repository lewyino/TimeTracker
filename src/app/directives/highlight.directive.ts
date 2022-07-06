import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight: string = '';

  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseenter', ['$event'])
  mouseEnter(event: any) {
    this.elementRef.nativeElement.style.backgroundColor = this.appHighlight;
    console.log(event);
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.elementRef.nativeElement.style.backgroundColor = '';
  }
}
