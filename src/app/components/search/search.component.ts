import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<string>();
  stringLimit = 5;
  searchForm: FormGroup = this.fb.group({
    symbol: [
      '',
      [Validators.required, Validators.maxLength(5), Validators.minLength(1)],
    ],
  });
  constructor(private fb: FormBuilder) {}

  onSearch(): void {
    if (this.searchForm.valid && !!this.searchForm.value.symbol.trim())
      this.searchEvent.emit(this.searchForm.value.symbol.trim());
    this.searchForm.reset();
  }
}
