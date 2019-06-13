import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import {BehaviorSubject, fromEvent} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowServiceService {

  constructor() {
  }

  private $resizeEvent = fromEvent(window, 'resize')
    .forEach(() => {
      let size = this.getValue(document.documentElement.clientWidth);
      if(size != this.$resize.value)
        this.$resize.next(size);
    });

  $resize: BehaviorSubject<Size> = new BehaviorSubject(this.getValue(document.documentElement.clientWidth));



  private getValue(width: number) {
    if(width < 576)
      return Size.XS;
    if(width < 768)
      return Size.SM;
    if(width < 992)
      return Size.MD;
    if(width < 1200)
      return Size.LG;
    return Size.XL;
  }

}


export enum Size {
  XS, SM, MD, LG, XL
}
