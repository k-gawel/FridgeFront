import {Form} from './Form';

export class WishListItemForm extends Form{

    category: number;
    item: number;
    comment: string;
    author: number;
    wishList: number = null;


    validate(): boolean {
      super.validate();
      return this.validateCategory() && this.validateComment() && this.validateItem() && this.validateWishList() && this.validateAuthor();
    }


    validateCategory(): boolean {
      if(this.category == null && this.item == null) {
        this.sendMessage("category.null|item.null");
        return false;
      } else if(this.category != null && this.item != null) {
        this.sendMessage("category_and_item.not_null");
        return false;
      } else
        return true;
    }


    validateItem(): boolean {
      if(this.category == null && this.item == null) {
        this.sendMessage("category.null|item.null");
        return false;
      } else if(this.category != null && this.item != null) {
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
      if(this.author == null) {
        this.sendMessage("author.null");
        return false;
      }
      return true;
    }


    validateWishList(): boolean {
      if(this.wishList == null) {
        this.sendMessage("wish_list.null");
        return false;
      }
      return true;
    }


}
