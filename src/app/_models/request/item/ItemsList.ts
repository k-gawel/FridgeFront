import {KeyNameList} from "../KeyName";
import {Category} from "../Category";
import {Item} from "./Item";

export class ItemsList extends KeyNameList {


  static staticList: ItemsList = new ItemsList();


  constructor(json?: JSON[]) {
    super();

    if (json == undefined)
      return;

    json.forEach((element: JSON) => {
      let item = new Item(element);
      this.push(item);
      ItemsList.staticList.push(item);
    });

  }


  public static fromJSON(json: JSON[]): ItemsList {

    if (ItemsList.staticList == null) {
      ItemsList.staticList = new ItemsList();
    }

    const result = new ItemsList();

    json.forEach(element => {
      let item = new Item(element);
      result.push(item);
      ItemsList.staticList.push(item);
    });

    return result;
  }


  public getById(id: number): Item {
    return <Item> super.getById(id);
  }


  public static getById(id: number): Item {
    const result = this.staticList.getById(id);

    return result == null ? null : <Item> result;
  }


  public getByIds(ids: number[]): ItemsList {
    return <ItemsList> super.getByIds(ids);
  }


  public static getByBarcode(barcode: number): Item {
    let result: Item = null;

    this.staticList.list.forEach((element: Item) => {
      if (element.barcode == barcode) {
        result = element;
      }
    });

    return result;
  }


  public static getByCategory(category: number | Category): ItemsList {

    return this.staticList.getByCategory(category);

  }


  public getByCategory(category: number | Category): ItemsList {

    category = typeof category === 'number' ? Category.getById(category) : category;

    let finalCategories: Category[] = category.getFinalCategories();
    let result = new ItemsList();

    this.list.forEach((item: Item) => {
      if (finalCategories.includes(item.category)) {
        result.push(item);
      }
    });

    return result;
  }


  public areAllOfCategory(category: number | Category): boolean {

    if (typeof category === 'number')
      category = Category.getById(category);

    let categories = category.getFinalCategories();

    let itemsList = this.list;

    itemsList.forEach((i: Item) => {
      if (!categories.includes(i.category))
        return false;
    });

    return true;
  }

}
