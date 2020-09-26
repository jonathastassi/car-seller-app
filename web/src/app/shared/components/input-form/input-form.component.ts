import { Component, OnInit, Input, EventEmitter, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid);
  }
}

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      useExisting: InputFormComponent,
      multi: true
    },
    {
      provide: ErrorStateMatcher,
      useClass: MyErrorStateMatcher
    }
  ]
})
export class InputFormComponent implements OnInit, ControlValueAccessor {

  @Input() label = '';
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() public value: string = '';
  @Output() public valueChange = new EventEmitter<string>();

  hide: boolean = true;

  form: FormControl;
  public errors;

  public onChange = (value: string) => {};
  public onTouched = () => { };

  constructor() {
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
  }

  validate(value: FormControl) {
    this.form = value;
    this.errors = value.errors;
  }
}
