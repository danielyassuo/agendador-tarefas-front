import { Component, ViewEncapsulation } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PasswordFieldComponent } from '../../shared/components/password-field/password-field.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, PasswordFieldComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation : ViewEncapsulation.Emulated
})
export class RegisterComponent {

}
