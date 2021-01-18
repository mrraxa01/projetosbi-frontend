import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local_user";
import { CartService } from "./domain/cart.service";
import { StorageService } from "./storage_service";

@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
      public http: HttpClient,
      public storage: StorageService,
      public cartService: CartService){
    }

    authenticate(creds : CredenciaisDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`,
        creds,
        {
            observe: 'response',
            responseType: 'text',

        });
     }
     //não precisa passar as credenciais pelo método pq o header vai pelo interceptor
     refreshToken(){
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,
        {},
        {
            observe: 'response',
            responseType: 'text',

        });
     }
     sucessfulLogin(authorazitionValue: string){
        //vai pegar o token a partir do carcter 7 eliminando o 'BEAR '
        let tok = authorazitionValue.substring(7);
        let user : LocalUser = {
            token : tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart();
    }
    logout(){
        this.storage.setLocalUser(null);
        }
    }

