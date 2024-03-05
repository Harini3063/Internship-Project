import { Injectable,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddpannelService {
  addPannelToggle:EventEmitter<void>=new EventEmitter<void>();

  constructor() { }

  toggleAddPannel()
  {
    this.addPannelToggle.emit();
  }
}
