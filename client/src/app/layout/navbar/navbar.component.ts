import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout/flex";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FlexModule,
    RouterLink,
    MatButton,
    MatIcon,
    RouterOutlet,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  imageUrl: string = './../assets/images/logo.png';
}
