import {Form} from './Form';

export class WishListItemForm extends Form{

  wishListId: number = null;
  authorId: number;
  categoryId: number;
  itemId: number;
  comment: string;


    validate(): boolean {
      super.validate();
      return this.validateCategory() && this.validateComment() && this.validateItem() && this.validateWishList() && this.validateAuthor();
    }


    validateCategory(): boolean {
      if (this.categoryId == null && this.itemId == null) {
        this.sendMessage("categoryId.null|itemId.null");
        return false;
      } else if (this.categoryId != null && this.itemId != null) {
        this.sendMessage("category_and_item.not_null");
        return false;
      } else
        return true;
    }


    validateItem(): boolean {
      if (this.categoryId == null && this.itemId == null) {
        this.sendMessage("categoryId.null|itemId.null");
        return false;
      } else if (this.categoryId != null && this.itemId != null) {
        this.sendMessage("category_and_item.not_null");
        return false;
      } else
        return true;
    }


    validateComment(): boolean {
      if(this.comment.length > 400) {
        this.sendMessage("comment.too_long");
        return false;
      } else
        return true;
    }


    validateAuthor(): boolean {
      if (this.authorId == null) {
        this.sendMessage("authorId.null");
        return false;
      }
      return true;
    }


    validateWishList(): boolean {
      if (this.wishListId == null) {
        this.sendMessage("wish_list.null");
        return false;
      }
      return true;
    }


}
