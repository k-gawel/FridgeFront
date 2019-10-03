import {Form} from '../Form';
import {Length, Min} from "class-validator";
import {FormErrors} from "../FormError";
import {WishListItemFormErrors} from "./WishListItemFormErrors";
import {WishListItemFormErrorMessages} from "./WishListItemFormErrorMessages";
import {FormErrorMessages} from "../FormErrorMessages";


export class WishListItemForm extends Form {

  @Min(0, { message: "wishList.null"} )
  wishList: number;

  @Min(0, { message: "user.null"} )
  author: number;

  @Min(0, { message: "category.null"} )
  category: number;

  item: number;

  @Length(0, 50, { message: "comment.tooLong" } )
  comment: string;

  private _errors = new WishListItemFormErrors();
  private static _messages = new WishListItemFormErrorMessages();

  get errors(): FormErrors {
    return this._errors;
  }

  get messages(): FormErrorMessages {
    return WishListItemForm._messages;
  }

  restartErrors(): void {
    this._errors = new WishListItemFormErrors();
  }

}
