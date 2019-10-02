import {FormError} from "../FormError";
import {FormErrorMessages} from "../FormErrorMessages";

export class WishListItemFormErrorMessages extends FormErrorMessages {

  private static readonly _messages: FormError[] = [
    WishListItemFormErrorMessages.userNull,
    new FormError("wishList.null", "Musisz wybrać listę życzeń", "WishList must not be null"),
    new FormError("category.null", "Musisz wybrać kategorię", "Category must not be null"),
    new FormError("comment.tooLong", "Komentarz nie może być dłuższy niż 50 znaków", "Comment must not be longer than 50 characters")
  ];

  get messages(): FormError[] {
    return WishListItemFormErrorMessages._messages;
  }

}
