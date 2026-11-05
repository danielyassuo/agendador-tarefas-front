import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogFields,
  ModalDialogComponent,
} from '../../shared/components/modal-dialog/modal-dialog.component';
import { TasksService } from '../../services/tasks.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatIcon,
    MatFormFieldModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  constructor(
    private readonly dialog: MatDialog,
    private tasksService: TasksService,
  ) {}

  tasks = this.tasksService.tasks;
  panelOpenState = false;

  hasTasks = () => (this.tasks() ?? []).length > 0;

  normalizarDataEvento(dataEvento: string) {
    const [data, tempo] = dataEvento.split(' ');
    const [dia, mes, ano] = data.split('-').map(Number);
    const [hora, minuto] = tempo.split(':').map(Number);

    const dataFormatada = new Date(ano , mes - 1, dia);
    const doisDigitios = (n : Number) =>  n.toString().padStart(2, '0')
    const tempoFormatado = `${doisDigitios(hora)}:${doisDigitios(minuto)}` 
    const dataString = `${dia}/${mes}/${ano}`
    const tempoString = `${hora}:${minuto}`

    return {
      dataFormatada,
      dataString,
      tempoFormatado,
      tempoString
    };
  }

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

        const formatterDateTime = (n: number) => n.toString().padStart(2, '0');

        const ano = data.getFullYear();
        const mes = formatterDateTime(data.getMonth() + 1);
        const dia = formatterDateTime(data.getDate());
        const segundo = formatterDateTime(0);

        let [hora, minuto] = tempo.split(':').map(Number);

        hora = formatterDateTime(hora);
        minuto = formatterDateTime(minuto);

        const dataEvento = `${dia}-${mes}-${ano} ${hora}:${minuto}:${segundo}`;

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
  editarTarefa(tarefa: any) {


    const dataEvento = this.normalizarDataEvento(tarefa.dataEvento);

    const formConfig: DialogFields[] = [
      {
        name: 'nomeTarefa',
        label: 'Nome da Tarefa ',
        value: tarefa.nomeTarefa,
      },
      { name: 'data', label: 'Data da Tarefa', type: 'date' , value : dataEvento.dataFormatada},
      { name: 'tempo', label: 'Hora da Tarefa', type: 'time', value : dataEvento.tempoFormatado },
      {
        name: 'descricao',
        label: 'Descreva a Tarefa ',
        value: tarefa.descricao,
      },
    ];

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: 'Adicionar Tarefa', formConfig },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { data, tempo, ...resto } = result;

        const formatterDateTime = (n: number) => n.toString().padStart(2, '0');

        const ano = data.getFullYear();
        const mes = formatterDateTime(data.getMonth() + 1);
        const dia = formatterDateTime(data.getDate());
        const segundo = formatterDateTime(0);

        let [hora, minuto] = tempo.split(':').map(Number);

        hora = formatterDateTime(hora);
        minuto = formatterDateTime(minuto);

        const dataEvento = `${dia}-${mes}-${ano} ${hora}:${minuto}:${segundo}`;

        const payload = {
          ...resto,
          dataEvento,
        };

        console.log('Tarefa Cadastrada', payload);
        this.tasksService.editTask(tarefa.id, payload).subscribe({
          next: () => console.log('Endereço Cadastrado com sucesso', payload),
          error: () => console.error('Erro ao cadastrar Endereço', payload),
        });
      }
    });
  }  

  removerTarefa (id : string) {
    this.tasksService.removeTask(id).subscribe({
      next : () => console.log("Tarefa removida"),
      error : () => console.error("Erro ao remover tarefa")
    });
  }
}
