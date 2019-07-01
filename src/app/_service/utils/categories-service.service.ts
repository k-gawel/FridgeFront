import {Injectable} from '@angular/core';
import {CategoryApiService} from '../api/utils/category-api.service';
import {Category} from '../../_models/response/Category';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandlerService} from './errorhanler/error-handler.service';
import {ErrorMessage} from '../../_models/util/ErrorMessage';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {

  constructor(private api: CategoryApiService,
              private errorHandler: ErrorHandlerService) { }

  public initCategories(): void {
    this.api.getAllCategories()
      .then((result: JSON) => {
        new Category(result);
      })
      .catch((e: HttpErrorResponse) => {
        this.errorHandler.sendErrors(new ErrorMessage(e.message));
      });
  }

}
