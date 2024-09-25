import { Component, Input } from '@angular/core';
import { tratamiento } from 'src/app/tratamientos/interfaces/tratamiento';
import { TratamientoService } from 'src/app/tratamientos/services/tratamiento';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent {
  @Input()
  public tratamiento: tratamiento={
    id: 0,
    title:'',
    title2:'',
    textTratamiento:'',
    image:'',
  }
  constructor(private tratamientoService: TratamientoService, public userService: UserService){

  }
  isAdmin: boolean = false;
  ngOnInit(): void {
    this.userService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }
}
