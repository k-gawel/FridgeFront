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
import {ContainersMenuComponent} from './_component/user/place/main-content/containers-menu/containers-menu.component';
import {ErrorHandlerComponent} from './_component/utils/error-handler/error-handler.component';
import {PlaceMenuComponent} from './_component/user/user/place-menu/place-menu.component';
import {PlaceComponent} from './_component/user/place/place/place.component';
import {AccountManagmentComponent} from './_component/user/account/account-managment/account-managment.component';
import {ItemComponent, NewInstanceFormDialog} from './_component/user/place/elements/item/item/item.component';
import {RelatedItemComponent} from './_component/user/place/elements/item-picker/related-items/related-item/related-item.component';
import {CategoriesMenu} from './_component/user/place/elements/categories-menu/categories-menu.component';
import {NewInstanceFormComponent} from './_component/user/place/elements/item-instance/new-instance-form/new-instance-form.component';
import {RelatedItemsSceneComponent} from './_component/user/place/elements/item-picker/related-items/related-items-scene/related-items-scene.component';
import {NewItemComponent} from './_component/user/place/elements/item/new-item-form/new_item.component';
import {WishListComponent} from './_component/user/place/elements/wishlist/wish-list/wish-list.component';
import {WishListFormComponent} from './_component/user/place/elements/wishlist/wish-list-form/wish-list-form.component';
import {WishListMenuComponent} from './_component/user/place/main-content/wish-list-menu/wish-list-menu.component';
import {WishListItemComponent} from './_component/user/place/elements/wishlist/wish-list-item/wish-list-item.component';
import {WishListItemFormComponent} from './_component/user/place/elements/wishlist/wish-list-item-form/wish-list-item-form.component';
import {ItemPickerComponent} from './_component/user/place/elements/item-picker/item-picker/item-picker.component';
import {PlaceItemsSceneComponent} from './_component/user/place/main-content/place-items-scene/place-items-scene.component';
import {ItemDescriptionComponent} from './_component/user/place/elements/item/item-description/item-description.component';
import {
  UsersMenuComponent,
  UserStatComponent
} from './_component/user/place/main-content/users-menu/users-menu.component';
import {WishListItemService} from './_service/user/wishlist/wishListItem/wish-list-item.service';
import {WishListService} from './_service/user/wishlist/wishlist/wish-list.service';
import {
  MatAutocompleteModule,
  MatButtonModule, MatButtonToggleModule, MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDialogRef, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {LoaderComponent} from './_component/utils/loader/loader.component';
import {BarcodeScannerComponent} from './_component/user/place/elements/item-picker/barcode-scanner/barcode-scanner.component';
import {NavbarComponent} from './_component/user/user/navbar/navbar.component';
import {EntityListPipe} from './_service/utils/entity-list.pipe';
import {NewWishListItemInstanceItemComponent} from './_component/user/place/elements/item-instance/new-wish-list-item-instance-item/new-wish-list-item-instance-item.component';
import {ItemInstanceComponent} from './_component/user/place/elements/item-instance/item-instance/item-instance.component';
import {CloseDialogButtonComponent} from './_component/utils/close-dialog-button/close-dialog-button.component';
import {InstanceActionInfoComponent} from './_component/user/place/elements/item-instance/item-instance/instance-action-info.component';
import {ProducersMenuComponent} from './_component/user/place/main-content/producers-menu/producers-menu.component';
import {ShopListMenuComponent} from './_component/user/place/main-content/shop-list-menu/shop-list-menu.component';
import {ShopListFormComponent} from './_component/user/place/elements/shoplist/shop-list-form/shop-list-form.component';


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
    PlaceMenuComponent,
    ItemDescriptionComponent,
    AccountManagmentComponent,
    UsersMenuComponent,
    LoaderComponent,
    BarcodeScannerComponent,
    NavbarComponent,
    NewInstanceFormDialog,
    EntityListPipe,
    NewWishListItemInstanceItemComponent,
    ItemInstanceComponent,
    CloseDialogButtonComponent,
    InstanceActionInfoComponent,
    ProducersMenuComponent,
    UserStatComponent,
    ShopListMenuComponent,
    ShopListFormComponent
  ],
  entryComponents: [
    NewInstanceFormComponent,
    WishListFormComponent,
    WishListItemFormComponent,
    NewItemComponent,
    BarcodeScannerComponent,
    ItemComponent,
    NewInstanceFormDialog,
    WishListFormComponent,
    WishListComponent,
    WishListItemComponent
  ],
  imports: [
    MatTabsModule,
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
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatStepperModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatAutocompleteModule
  ],
  providers: [
    CookieService,
    WishListItemService,
    WishListService,
    {provide: MatDialogRef, useValue: {}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
