import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';


interface DialogData {
  title: string;
  formConfig: DialogFields[];
}

export interface DialogFields {
  name: string;
  label: string;
  value?: string | number;
  button?: {
    icon: string;
    callback: (
      value: string,
      dialogRef: MatDialogRef<ModalDialogComponent>,
    ) => void;
  };
  type?: 'text' | 'number' | 'date' | 'time' | 'datetime';
  validators?: any[];
}

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.scss',
})
export class ModalDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly formBuilder: FormBuilder,
  ) {}

  fields: DialogFields[] = this.data.formConfig;

  private buildControls(): Record<string, any> {
    const controls: Record<string, any> = {};

    this.fields.forEach((field) => {
      controls[field.name] = [field.value ?? '', field.validators || []];
    });
    return controls;
  }

  form: FormGroup = this.formBuilder.group(this.buildControls());

  onSave() {
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
