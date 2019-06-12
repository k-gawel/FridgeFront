import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserComponent} from './_component/user/user/user-component/user.component';
import {LoginComponent} from './_component/guest/login/login.component';
import {RegisterComponent} from './_component/guest/register/register.component';
import {ContainersMenuComponent} from './_component/user/place/right-sidebar/containers-menu/containers-menu.component';
import {ErrorHandlerComponent} from './_component/utils/error-handler/error-handler.component';
import {PlaceMenuComponent} from './_component/user/user/place-menu/place-menu.component';
import {PlaceComponent} from './_component/user/place/place/place.component';
import {AccountManagmentComponent} from './_component/user/account/account-managment/account-managment.component';
import {ItemComponent} from './_component/user/place/item/item/item/item.component';
import {RelatedItemComponent} from './_component/user/place/item-picker/related-items/related-item/related-item.component';
import {CategoriesMenu} from './_component/user/place/categories-menu/categories-menu.component';
import {NewInstanceFormComponent} from './_component/user/place/item/item/new-instance-form/new-instance-form.component';
import {RelatedItemsSceneComponent} from './_component/user/place/item-picker/related-items/related-items-scene/related-items-scene.component';
import {NewItemComponent} from './_component/user/place/item-picker/new_item/new_item.component';
import {WishListComponent} from './_component/user/place/wishlist/wish-list/wish-list.component';
import {WishListFormComponent} from './_component/user/place/right-sidebar/wish-list-menu/wish-list-form/wish-list-form.component';
import {WishListMenuComponent} from './_component/user/place/right-sidebar/wish-list-menu/wishl-list-menu-list/wish-list-menu.component';
import {WishListItemComponent} from './_component/user/place/wishlist/wish-list-item/wish-list-item.component';
import {WishListItemFormComponent} from './_component/user/place/wishlist/wish-list-item-form/wish-list-item-form.component';
import {ItemPickerComponent} from './_component/user/place/item-picker/item-picker/item-picker.component';
import {PlaceItemsSceneComponent} from './_component/user/place/place-items-scene/place-items-scene.component';
import {ItemInstancesComponent} from './_component/user/place/item/item/item-instances/item-instances-list/item-instances.component';
import {SingleInstanceComponent} from './_component/user/place/item/item/item-instances/single-instance/single-instance.component';
import {ItemDescriptionComponent} from './_component/user/place/item/item/item-description/item-description.component';
import {UsersMenuComponent} from './_component/user/place/right-sidebar/users-menu/users-menu.component';
import {WishListItemService} from './_service/user/place/wishlist/wishListItem/wish-list-item.service';
import {WishListService} from './_service/user/place/wishlist/wishlist/wish-list.service';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';


const appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    PlaceComponent,
    ItemComponent,
    RegisterComponent,
    CategoriesMenu,
    NewItemComponent,
    NewInstanceFormComponent,
    RelatedItemComponent,
    RelatedItemsSceneComponent,
    WishListComponent,
    WishListFormComponent,
    WishListMenuComponent,
    WishListItemComponent,
    WishListItemFormComponent,
    ItemPickerComponent,
    PlaceItemsSceneComponent,
    ContainersMenuComponent,
    ErrorHandlerComponent,
    ItemInstancesComponent,
    SingleInstanceComponent,
    PlaceMenuComponent,
    ItemDescriptionComponent,
    AccountManagmentComponent,
    UsersMenuComponent
  ],
  entryComponents: [
    NewInstanceFormComponent,
    WishListFormComponent,
    WishListItemFormComponent,
    NewItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [
    CookieService,
    WishListItemService,
    WishListService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
