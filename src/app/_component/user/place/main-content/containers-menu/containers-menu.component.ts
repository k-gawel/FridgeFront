import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Container, ContainersList} from '../../../../../_models/response/Container';
import {PlaceDetails} from '../../../../../_models/response/PlaceDetails';
import {CookieDataService} from '../../../../../_service/auth/cookieDatas/cookie-datas.service';
import {ContainerService} from '../../../../../_service/user/place/container/container.service';
import {ContainerForm} from '../../../../../_models/request/ContainerForm';
import {ErrorMessage} from '../../../../../_models/util/ErrorMessage';

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
    this._place = value;
    this.containerForm.placeId = this._place.id;

    this._containers = this._place.containers;
    this._chosenContainers = new ContainersList();
    this._chosenContainers.addAll(this._containers);
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
        this._containers.add(result);
        this.addToChosen(result);
      })
      .catch((e: ErrorMessage) => {
        this.containerForm.errors = e;
      });

  }


  clickOnContainer(container: Container) {
    if(this._chosenContainers.contains(container))
      this.removeFromChosen(container);
    else
      this.addToChosen(container);
  }


  private addToChosen(container: Container): void {
    this._chosenContainers.add(container);
    this.chosenContainers.emit(this._chosenContainers);
  }


  private removeFromChosen(container: Container): void {
    this._chosenContainers.remove(container);
    this.chosenContainers.emit(this._chosenContainers);
  }


}
