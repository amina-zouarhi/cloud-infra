import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-sliding-menu',
  imports: [MatSidenavModule, MatButtonModule, MatListModule],
  templateUrl: './sliding-menu.component.html',
  styleUrl: './sliding-menu.component.scss',
})
export class SlidingMenuComponent {}
