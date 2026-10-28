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
import { LoginPayload, UserService } from '../../services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginComponent {
  form: FormGroup<{email : FormControl<string>, senha : FormControl<string>}>;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService : AuthService,
  ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control ('', {validators : [Validators.required, Validators.email], nonNullable : true}),
      senha: this.formBuilder.control ('', { validators : [Validators.required, Validators.minLength(6)], nonNullable : true}),
    });
  }

  ngOnInit (): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/tasks'])
    }
  }

  get passwordControl(): FormControl {
    return this.form.get('senha') as FormControl;
  }

  get emailErrors(): string | null {
    const control = this.form.get('email');

    if (control?.hasError('required')) {
      return 'A informação do email é obrigatória';
    }
    if (control?.hasError('email')) {
      return 'Este e-mail é inválido';
    }
    return null;
  }

   submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); //simular um click em todos os campos do formulário e marcar todos que possuem required
      return;
    }
    const formData = this.form.value as LoginPayload;

    this.isLoading = true;


    //TODO: trocar o serviço para login
    this.userService.login(formData).pipe(finalize (() => this.isLoading = false)).subscribe({
      next: (response) => {
        this.authService.saveToken(response)
        this.router.navigate(['/tasks'])
      },
      error : (error) => {
        console.error(`Erro ao registrar usuário`, error)
      },
    })
  }
}
