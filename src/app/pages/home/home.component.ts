import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  imgHero = 'assets/agendador-image.png';


  //é possivel realizar com o injenct ()
  constructor(private authService : AuthService, private router : Router){}

  ngOnInit () : void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/tasks'])
    }
  }
 }
