import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterStateService {

  //Guardar o valor que estamos recebendo aqui
  private rotaAtualSubject$ = new BehaviorSubject<string>('');

  //Pegar a rotaAtualSubject$ e tranformar em um Observable, deixar os componentes acessarem ele, pois ele é público, já que é so pra leitura 
  //não vai poder usar o next, já que ele não pode mandar um evento e sim exibir
  public readonly rotaAtual$ = this.rotaAtualSubject$.asObservable();

  //injetando uma variavel privado, um serviço do angular
  //Injeção de dependência
  constructor(private router : Router) {

    //o next serve para atualizar o evento e aqui ele está sendo instaciado
    this.rotaAtualSubject$.next(this.router.url);

    this.router.events.pipe(
      filter((event) : event is NavigationEnd => event instanceof NavigationEnd)
    )
    .subscribe((evento : NavigationEnd ) => {
      //ele está sendo atualizado de acordo com a navegação e este evento vai atualizar a rota atual em que estanos
      this.rotaAtualSubject$.next(evento.url)
    })
  }
}
