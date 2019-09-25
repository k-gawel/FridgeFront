import {KeyNameList} from '../KeyName';
import {Category} from '../Category';
import {Item} from './Item';
import {IdSelector} from '../../../_service/utils/EntitySelector';
import {Entity} from "../Entity";

export class ItemsList extends KeyNameList<Item> {

  public static readonly ALL: ItemsList = new ItemsList();

  constructor(json?: JSON[]) {
    super();
    if (json == undefined) return;

    json.forEach(j => this.add(new Item(j)));
  }

  public getByIds(ids: number[]): ItemsList {
    return <ItemsList> super.getByIds(ids);
  }

  public getByCategory(category: number | Category): ItemsList {
    if (category == null)
      return new ItemsList();

    category = typeof category === 'number' ? Category.getById(category) : category;

    let finalCategories: Category[] = category.getFinalCategories();
    let ids = new IdSelector(finalCategories).id;

    let result = <ItemsList>  this.filter(i => ids.includes(i.category.id));
    Object.setPrototypeOf(result, ItemsList.prototype);


    return result;
  }

}
