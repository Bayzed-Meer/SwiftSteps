import { Component } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [
        FlexModule,
        RouterLink,
        MatButton,
        MatIcon,
        RouterOutlet,
    ],
})
export class AppComponent {
  imageUrl: string = './../assets/images/logo.png';
}
