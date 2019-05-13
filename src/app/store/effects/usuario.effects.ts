import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usuarioAcciones from '../actions';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { usuariosAcciones } from '../actions';

@Injectable()
export class UsuarioEffects {

    constructor(private actions$: Actions, public usuariosService: UsuarioService) {}

    @Effect()
    cargarUsuarios$ = this.actions$.pipe(
        ofType(usuarioAcciones.CARGAR_USUARIO),
        switchMap((action: usuarioAcciones.CargarUsuario) => {
            return this.usuariosService.getUsersById(action.id).pipe(
                map(user => new usuarioAcciones.CargarUsuarioSuccess(user)),
                catchError( error => of(new usuarioAcciones.CargarUsuarioFail(error)))
            );
        })
    );
}
