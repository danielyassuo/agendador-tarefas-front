import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl , ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'input-password-field',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.scss',
})
export class PasswordFieldComponent {
  hide = true; //o icone vem com a senha fechada

  @Input({required : true}) control! : FormControl //non-null assertion operator, essa propriedade irá vir em tempo de execução

  //validacoes

  get passwordErrors () : string | null {
    const passwordControl = this.control;

    if(passwordControl?.errors?.['required']){
      return 'O campo senha é obrigatório ser preenchido';
    }
    if(passwordControl?.errors?.['minlength']){
      return 'Cadastre uma senha com no minímo 6 digitos'
    }

    return null;
  }
}
