import { Injectable } from "@angular/core";

//import { HttpClient } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";

//import { API_CONFIG } from "../../config/api.config";
import { API_CONFIG } from "../../config/api.config";
/*
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx";*/
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<CategoriaDTO[]>  {
        //return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}




/*
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CategoriaService{

    constructor(public http: HttpClient){

    }

    findAll() : Observable<CategoriaDTO[]>  {
      
        return this.http.get<CategoriaDTO[]>("http://localhost:8080/categorias");
    }
}*/