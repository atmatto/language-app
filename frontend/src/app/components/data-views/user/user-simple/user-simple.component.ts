import { Component } from '@angular/core';
import {UserComponent} from '../user.component';
import {LanguageSimpleComponent} from '../../language/language-simple/language-simple.component';
import {SkeletonPlaceholderComponent} from '../../../general/skeleton-placeholder/skeleton-placeholder.component';

@Component({
  selector: 'app-user-simple',
    imports: [
        LanguageSimpleComponent,
        SkeletonPlaceholderComponent
    ],
  templateUrl: './user-simple.component.html',
  styleUrl: './user-simple.component.css'
})
export class UserSimpleComponent extends UserComponent {

}
