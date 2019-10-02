import {FormErrors} from "../FormError";

export class WishListItemFormErrors extends FormErrors {

  constructor() {
    super();
    this.init("wishList");
    this.init("user");
    this.init("category");
    this.init("comment");
  }

}
