import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogFields,
  ModalDialogComponent,
} from '../../shared/components/modal-dialog/modal-dialog.component';
import { TasksService } from '../../services/tasks.service';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatExpansionModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  constructor(
    private readonly dialog: MatDialog,
    private tasksService : TasksService,
  ) {}

  tasks = this.tasksService.tasks;
  panelOpenState = false;

  hasTasks = () => (this.tasks() ?? []).length > 0

  cadastrarTarefa() {
    
    const formConfig: DialogFields[] = [
      { name: 'nomeTarefa', label: 'Nome da Tarefa ' },
      { name: 'data', label: 'Data da Tarefa', type: 'date' },
      { name: 'tempo', label: 'Hora da Tarefa', type: 'time' },
      { name: 'descricao', label: 'Descreva a Tarefa ' },
    ];

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: 'Adicionar Tarefa', formConfig },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { data, tempo, ...resto } = result;

        const formatterDateTime = (n : number) => n.toString().padStart(2, "0") 

        const ano = data.getFullYear();
        const mes = formatterDateTime(data.getMonth() + 1);
        const dia = formatterDateTime(data.getDate());
        const segundo = formatterDateTime(0)

        let [hora, minuto] = tempo.split(':').map(Number);

        hora = formatterDateTime(hora);
        minuto = formatterDateTime(minuto);

        const dataEvento = `${dia}-${mes}-${ano} ${hora}:${minuto}:${segundo}`
        

        const payload = {
          ...resto,
          dataEvento,
        };

        console.log('Tarefa Cadastrada', payload);
        this.tasksService.createTask(payload).subscribe({
          next: () => console.log('Endereço Cadastrado com sucesso', payload),
          error: () => console.error('Erro ao cadastrar Endereço', payload),
        });
      }
    });
  }
}
