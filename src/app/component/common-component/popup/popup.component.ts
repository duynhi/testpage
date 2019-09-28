import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupComponent implements OnInit {
  @Input() data: any;
  @Input() display: any;
  @Output() valueChange = new EventEmitter();
  dataName = '';
  @Input() width: number;
  showRequire = false;
  windowWidth = 0;
  constructor() { }

  ngOnInit() {
    // this.dataName = '';
  }

  checkRequire() {
    if (!this.dataName.length || this.dataName.length === 0) {
      this.showRequire = true;
    } else {
      this.showRequire = false;
    }
  }


  valueChanged(data) {
    if (data === 'back') {
      this.valueChange.emit(null);
    }
    if (data === 'save') {
      if (this.data.from === 'addKeiyakuSha' || this.data.from === 'addProduct') {
        this.valueChange.emit(this.dataName);
        this.dataName = '';
        this.showRequire = false;
      }
    }
  }


}
