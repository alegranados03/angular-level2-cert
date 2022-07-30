import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchForm: FormGroup = this.fb.group({
    symbol: ['', Validators.required],
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
      this.searchEvent.emit(this.searchForm.value.symbol);
    this.searchForm.reset();
  }
}
