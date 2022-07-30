import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchForm: FormGroup = this.fb.group({
    symbol: [
      'TSLA',
      [Validators.required, Validators.maxLength(5), Validators.minLength(1)],
    ],
  });
  constructor(private fb: FormBuilder) {}

  validateField(controlName: string) {
    return (
      !!this.searchForm.controls[controlName]?.errors &&
      this.searchForm.controls[controlName]?.touched
    );
  }

  onSearch() {
    if (this.searchForm.valid)
      this.searchEvent.emit(this.searchForm.value.symbol.trim());
    this.searchForm.reset();
  }
}
