import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PasswordFieldComponent } from '../../shared/components/password-field/password-field.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PasswordFieldComponent,
    ReactiveFormsModule,
    CommonModule,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get fullNameErrors(): string | null {
    const control = this.form.get('fullname');
    if (control?.hasError('required')) {
      return 'O nome completo é um campo obrigatório';
    }
    if (control?.hasError('minlength')) {
      return 'Escreva um nome com mais de 3 letras';
    }
    return null;
  }

  get emailErrors () : string | null {
    const control = this.form.get('email');

    if(control?.hasError('required')){
      return 'O cadastro de e-mail é obrigatório'
    }
    if(control?.hasError('email')){
      return 'Este e-mail é inválido'
    }
    return null;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); //simular um click em todos os campos do formulário e marcar todos que possuem required
      return;
    }
    console.log('Formulário submetido', this.form.value);
  }
}
