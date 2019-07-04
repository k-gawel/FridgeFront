import {Injectable} from '@angular/core';
import {Item} from '../../_models/response/item/Item';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../_models/response/Category';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  itemImages = new Map<Item, string>();
  categoryIcons = new Map<Category, string>();

  constructor(private httpClient: HttpClient) { }

  public async getImageUrl(item: Item): Promise<string> {
    if(!this.itemImages.has(item)) {
      let url = "http://91.134.142.39:8080/fridgeapi/images/" + item.id + ".jpg";
      let imageUrl = await this.httpClient.get(url).toPromise()
        .then(r => url)
        .catch(e => this.getCategoryIconUrl(item.category));
      this.itemImages.set(item, imageUrl);
    }
    return this.itemImages.get(item);
  }

  private async getCategoryIconUrl(category: Category): Promise<string> {
    if(!this.categoryIcons.has(category)) {
      let url: string = "/assets/icons/" + category.id + ".svg";
      let categoryIcon = await this.httpClient.get(url).toPromise()
        .then(r => url)
        .catch(e => this.getCategoryIconUrl(category.parent));
      this.categoryIcons.set(category, categoryIcon);
    }
    return this.categoryIcons.get(category);
  }



}
