import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'close-dialog-button',
  templateUrl: './close-dialog-button.component.html',
  styleUrls: ['./close-dialog-button.component.css']
})
export class CloseDialogButtonComponent implements OnInit {

  @Input() dialogRef: MatDialogRef<Component>;

  constructor() {
  }

  ngOnInit() {
  }

}
