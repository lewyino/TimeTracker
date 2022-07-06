import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appMultiple]'
})
export class MultipleDirective {
  @Input()
  public set appMultiple(value: number) {
    for(let i = 0; i < value; i++) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {
  }

}
