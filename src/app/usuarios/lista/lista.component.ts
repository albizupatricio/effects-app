import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as usuariosAcciones from '../../store/actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading: boolean;
  error: any;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('usuarios').subscribe(usuarios => {
      this.usuarios = usuarios.users;
      this.loading = usuarios.loading;
      this.error = usuarios.error;
    });
    this.store.dispatch(new usuariosAcciones.CargarUsuarios());
  }

}
