import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usuariosAcciones from '../actions';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuariosEffects {

    constructor(private actions$: Actions, public usuariosService: UsuarioService) {}

    @Effect()
    cargarUsuarios$ = this.actions$.pipe(
        ofType(usuariosAcciones.CARGAR_USUARIOS),
        switchMap(() => {
            return this.usuariosService.getUsers().pipe(
                map(users => new usuariosAcciones.CargarUsuariosSuccess(users)),
                catchError( error => of(new usuariosAcciones.CargarUsuariosFail(error)))
            );
        })
    );
}
