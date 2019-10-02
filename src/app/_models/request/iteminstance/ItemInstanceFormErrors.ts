import {FormErrors} from "../FormError";

export class ItemInstanceFormErrors extends FormErrors {

  constructor() {
    super();
    this.init("user");
    this.init("comment");
    this.init("item");
    this.init("container");
    this.init("wishListItem");
    this.init("shopList");
    this.init("expireDate");
    this.init("price");
  }



}
