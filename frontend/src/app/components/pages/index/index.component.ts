import { Component } from '@angular/core';
import {ErrorPage} from '../../general/error-page/error-page.component';

@Component({
  selector: 'app-index',
    imports: [
        ErrorPage
    ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
