import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-item-input',
  templateUrl: './item-input.component.html',
  styleUrls: ['./item-input.component.css']
})
export class ItemInputComponent implements OnInit {

  @Output() value = new EventEmitter<string | number>();

  _value: string = '';
  previousValue: string = '';

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      const value = this.getValue();
      if(value != this.previousValue) {
        this.value.emit(value);
        this.previousValue = value;
      }
    }, 400)
  }

  getValue(): string {
    if(this._value.length < 4)
      return null;
    else
      return this._value;
  }

}
