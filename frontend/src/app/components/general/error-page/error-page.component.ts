import {Component, input} from '@angular/core';

@Component({
  selector: 'app-error-page',
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPage {
    title = input<string>("Error");
    subtitle = input<string>();
}
