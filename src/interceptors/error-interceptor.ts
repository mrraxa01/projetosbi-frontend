import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage_service';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCrtl: AlertController){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // console.log("Passou no interceptor");
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            //permite tratar cada erro especificamente
            switch(errorObj.status){
                case 401:
                    this.handle401();
                    break;
                case 403:
                    this.handle403();
                    break;

                default:
                    this.handleDefaulError(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle401(){
        let alert = this.alertCrtl.create({
            title : 'Erro 401: Falha de Autenticação!!',
            message: 'Email ou senha incorretos!!',
            enableBackdropDismiss: false, // só sai do alert clicando em fechar
            buttons:[{
                    text : 'Ok'
            }]

        });
        alert.present();
    }    
    //caso ocorra o 403(usuário inválido) vai forçar o zeramento do storage
    handle403(){
        this.storage.setLocalUser(null);
    }
    handleDefaulError(errorObj){
        let alert = this.alertCrtl.create({
            title : 'Erro' +errorObj.status +': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false, // só sai do alert clicando em fechar
            buttons:[{
                    text : 'Ok'
            }]

        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};