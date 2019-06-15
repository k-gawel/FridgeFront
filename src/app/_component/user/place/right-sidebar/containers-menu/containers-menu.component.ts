import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Container, ContainersList} from '../../../../../_models/request/Container';
import {PlaceDetails} from '../../../../../_models/request/PlaceDetails';
import {CookieDataService} from '../../../../../_service/auth/cookieDatas/cookie-datas.service';
import {ContainerService} from '../../../../../_service/user/place/container/container.service';
import {ContainerForm} from '../../../../../_models/response/ContainerForm';
import {ErrorMessage} from '../../../../../_models/util/ErrorMessage';
import {Size, WindowService} from '../../../../../_service/utils/window.service';

@Component({
  selector: 'app-containers-menu',
  templateUrl: './containers-menu.component.html',
  styleUrls: ['./containers-menu.component.css']
})
export class ContainersMenuComponent implements OnInit {




  _containers: ContainersList;
  _chosenContainers: ContainersList;
  _place: PlaceDetails;
  @Input() set place(value: PlaceDetails) {
    console.debug("ContainersMenuComponent.setPlace()", value);
    this._place = value;
    this.containerForm.placeId = this._place.id;

    this._containers = this._place.containers;
    this._chosenContainers = new ContainersList();
    this._chosenContainers.pushAll(this._containers);
    this.chosenContainers.emit(this._chosenContainers);
  }

  @Output() chosenContainers = new EventEmitter<ContainersList>();

  constructor(private containersService: ContainerService,
              private cookiesData: CookieDataService) {
    this.containerForm = new ContainerForm();
  }

  ngOnInit() {
  }

  containerForm: ContainerForm = new ContainerForm();


  isAdmin(): boolean {
    return this.cookiesData.getUserId() === this._place.adminId;
  }


  addContainer() {

    if(!this.containerForm.validate())
      return;

    this.containersService.addNewContainer(this.containerForm)
      .then((result: Container) => {
        this._containers.push(result);
        this._chosenContainers.push(result);
        this.chosenContainers.emit(this._chosenContainers);
      })
      .catch((e: ErrorMessage) => {
        this.containerForm.errors = e;
      });

  }


  clickOnContainer(container: Container) {

    if(this._chosenContainers.contains(container))
      this._chosenContainers.remove(container);
    else
      this._chosenContainers.push(container);

    this.chosenContainers.emit(this._chosenContainers);

  }


  removeContainer(container: Container) {
    this._containers.remove(container);
    this._chosenContainers.remove(container);
    this.chosenContainers.emit(this._chosenContainers);
  }

}
