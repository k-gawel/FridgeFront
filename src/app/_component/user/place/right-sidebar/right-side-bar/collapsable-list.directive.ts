import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {Size, WindowService} from '../../../../../_service/utils/window.service';
import {stringify} from 'querystring';

@Directive({
  selector: '[appCollapsableListHeader]'
})
export class CollapsableListDirective implements OnInit {

  readonly angleUpClass = "fa fa-2x fa-angle-up";
  readonly angleDownClass = "fa fa-2x fa-angle-down";

  @Input() collapseName: string;
  @Input() set title(value: string) {
    this.titleNode = this.getTitleNode(value);
  }

  titleNode;

  iconNodeUp = CollapsableListDirective.getIconNode(() => {this.onUpClick()}, this.angleUpClass);
  iconNodeDown = CollapsableListDirective.getIconNode(() => {this.onDownClick()}, this.angleDownClass);
  iconNodeNone = CollapsableListDirective.getIconNode(() => {}, undefined);

  nL = this.el.nativeElement;

  constructor(private el: ElementRef,
              private windowService: WindowService) {
  }

  ngOnInit() {
    this.nL.style.display = "flex";
    this.nL.appendChild(this.titleNode);
    this.nL.appendChild(this.iconNodeNone);

    this.windowService.$resize.subscribe(s => {
      switch (s) {
        case Size.XS:
          this.onExtraSmall();
          break;
        case Size.SM:
          this.onSmall();
          break;
        case Size.MD:
          this.onMid();
          break;
        case Size.LG:
          this.onLarge();
          break;
        case Size.XL:
          this.onExtraLarge();
          break;
        default:
          throw Error("Unknown size type: " + stringify(s));
      }
    } );
  }

  setIconNode(iconNode) {
    this.nL.replaceChild(iconNode, this.nL.childNodes[1]);
  }

  onExtraSmall() {
    this.onSmall();
  }

  onSmall() {
    this.show();
    this.setIconNode(this.iconNodeNone);
  }

  onMid() {
    this.hide();
    this.setIconNode(this.iconNodeDown);
  }

  onLarge() {
    this.show();
    this.setIconNode(this.iconNodeNone);
  }

  onExtraLarge() {
    this.onLarge();
  }

  show() {
    this.setDisplayValue("block");
  }

  hide() {
    this.setDisplayValue("none");
  }

  setDisplayValue(value: string) {
    document.getElementsByName(this.collapseName).forEach(e => e.style.display = value);
  }

  getTitle(title: string) {
    let textNode = document.createElement("H6");
    textNode.appendChild(document.createTextNode(title));
    return textNode;
  }

  getTitleNode(title: string) {
    let titleNode = document.createElement("SPAN");
    titleNode.style.width = "80%";
    titleNode.style.textAlign = "center";
    try {
      titleNode.replaceChild(this.getTitle(title), titleNode.firstChild);
    } catch (e) {
      titleNode.appendChild(this.getTitle(title));
    }
    return titleNode;
  }

  static getIconNode(event, angleClass) {
    let iconNode = document.createElement("SPAN");
    iconNode.style.width = "20%";
    iconNode.addEventListener("click", event);

    let icon = document.createElement("I");
    icon.className = angleClass;
    icon.style.cssFloat = "right";
    iconNode.appendChild(icon);

    return iconNode;
  }

  private onDownClick() {
    this.show();
    this.setIconNode(this.iconNodeUp);
  }

  private onUpClick() {
    this.hide();
    this.setIconNode(this.iconNodeDown);
  }

}


