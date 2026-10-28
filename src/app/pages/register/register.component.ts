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
import { UserService } from '../../services/user.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    MatProgressSpinnerModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class RegisterComponent {
  form: FormGroup;
  isLoading : boolean = false;

  constructor(private formBuilder: FormBuilder, private userService : UserService, private router : Router, private authService : AuthService) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit () : void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/tasks'])
    }
  }

  get passwordControl(): FormControl {
    return this.form.get('senha') as FormControl;
  }

  get fullNameErrors(): string | null {
    const control = this.form.get('nome');
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
    const formData = this.form.value;

    this.isLoading = true;

    this.userService.register(formData).subscribe({
      next: (response ) => {
        this.router.navigate(['/login'])
      },
      error : (error) => {
        console.error(`Erro ao registrar usuário`, error)
      },
    })
  }
}
