import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputTextLimit]',
})
export class InputTextLimitDirective {
  @Input() limit: number = 100;
  private regex: RegExp = new RegExp(/^[1-9]\d*$/g);
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'Delete',
  ];
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('keydown', ['$event'])
  lettersOnly(event: KeyboardEvent): void {
    event.stopPropagation();
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (
      (next && next.length > this.limit) ||
      String(event.key).match(this.regex)
    ) {
      event.preventDefault();
    }
  }
}
