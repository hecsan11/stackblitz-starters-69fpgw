import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { RouterModule } from '@angular/router';

import { appConfig } from './app.config';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './app.component.html',
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, appConfig);
