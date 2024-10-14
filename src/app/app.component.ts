import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-ngrx-entity-client-server-state';
     constructor(private router: Router) {
  }

  public Computers() {
    this.router.navigate(['/computers']);
  }

  public Cars() {
    this.router.navigate(['/cars']);
  }

  public Cafeteria() {
    this.router.navigate(['/cafeteria']);
  }
}
