import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ErrorPage} from '../general/error-page/error-page.component';
import {LanguageManagerComponent} from './language-manager/language-manager.component';
import {UserManagerComponent} from './user-manager/user-manager.component';

@Component({
  selector: 'app-admin',
    imports: [
        RouterLink,
        ErrorPage,
        LanguageManagerComponent,
        UserManagerComponent
    ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
    protected subpage = input<string>();
}
