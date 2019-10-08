import {Form} from '../Form';
import {FormErrorMessages} from "../FormErrorMessages";
import {Min, MinDate} from "class-validator";
import {LocalDate} from "../../../_util/date/JavaLocalDate";
import {ItemInstanceFormErrors} from "./ItemInstanceFormErrors";
import {ItemInstanceFormErrorMessages} from "./ItemInstanceFormErrorMessages";

export class ItemInstanceForm extends Form {


  @Min(0, {message: "user.null"})
  user: number;

  comment: string;

  @Min(0, {message: "item.null"})
  item: number;

  @Min(0, {message: "container.null"})
  container: number;

  wishListItem: number;
  shopList: number;

  @MinDate(new LocalDate().toDate(), { message: "expireDate.past"})
  expireDate: Date;

  price: { amount: number, currency: string,  } = {amount: null, currency: null};

  errors = new ItemInstanceFormErrors();

  private static _messages = new ItemInstanceFormErrorMessages();

  get messages(): FormErrorMessages {
    return ItemInstanceForm._messages;
  }

  restartErrors(): void {
    this.errors = new ItemInstanceFormErrors();
  }

  validPrice(): boolean {
    return this.price.amount != null && this.price.currency != null;
  }

}


