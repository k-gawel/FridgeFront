import {KeyNameList} from '../KeyName';
import {Category} from '../Category';
import {Item} from './Item';
import {IdSelector} from '../../../_service/utils/EntitySelector';

export class ItemsList extends KeyNameList {

  public static readonly ALL: ItemsList = new ItemsList();
  list: Item[] = [];

  constructor(json?: JSON[]) {
    super();

    if (json == undefined)
      return;

    console.log("JSON", json);

    this.list = json.map(j => new Item(j));
  }

  public getById(id: number): Item {
    return <Item> super.getById(id);
  }

  public getByIds(ids: number[]): ItemsList {
    return <ItemsList> super.getByIds(ids);
  }

  public getByCategory(category: number | Category): ItemsList {
    category = typeof category === 'number' ? Category.getById(category) : category;

    let finalCategories: Category[] = category.getFinalCategories();
    let ids = new IdSelector(finalCategories).id;
    const result = new ItemsList();
    result.list = this.list.filter(i => ids.includes(i.category.id));
    return result;
  }

}
