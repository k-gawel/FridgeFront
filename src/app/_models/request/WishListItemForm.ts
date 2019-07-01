import {Form} from './Form';

export class WishListItemForm extends Form{

  wish_list_id: number = null;
  author_id: number;
  category_id: number;
  item_id: number;
  comment: string;


    validate(): boolean {
      super.validate();
      return this.validateCategory() && this.validateComment() && this.validateItem() && this.validateWishList() && this.validateAuthor();
    }


    validateCategory(): boolean {
      if(this.category_id == null && this.item_id == null) {
        this.sendMessage("category_id.null|item_id.null");
        return false;
      } else if(this.category_id != null && this.item_id != null) {
        this.sendMessage("category_and_item.not_null");
        return false;
      } else
        return true;
    }


    validateItem(): boolean {
      if(this.category_id == null && this.item_id == null) {
        this.sendMessage("category_id.null|item_id.null");
        return false;
      } else if(this.category_id != null && this.item_id != null) {
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
      if(this.author_id == null) {
        this.sendMessage("author_id.null");
        return false;
      }
      return true;
    }


    validateWishList(): boolean {
      if(this.wish_list_id == null) {
        this.sendMessage("wish_list.null");
        return false;
      }
      return true;
    }


}
