import {Injectable} from '@angular/core';
import {CategoryApiService} from '../../api/utils/category-api.service';
import {Category} from '../../../_models/request/Category';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorMessage} from '../../../_models/util/ErrorMessage';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private api: CategoryApiService) { }


  public getRootCategory(): Promise<Category> {

    return this.api.getAllCategories()
      .then((res: JSON) => {
        return new Category(res);
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e);
      });

  }


}
