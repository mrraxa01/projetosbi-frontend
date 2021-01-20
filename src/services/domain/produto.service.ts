import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import {Observable} from 'rxjs/Rx';
import { StaticInjector } from "@angular/core/src/di/injector";
import { ProdutoDTO } from "../../models/produto.dto";



@Injectable()
export class ProdutoService {

constructor(public http: HttpClient){

}

  findById(produto_id : String){
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);

  }
//page e linerPerPage devem ter o msm nome do backend
//page e linerPerPage se não for passado no método vai carregar com valores conforme abaixo 0 e 24
  findByCategoria(categoria_id:string, page: number =0, linesPerPage: number = 24){
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
  }

  getSmallImageFromBucket(id : string) : Observable<any>{
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
    return this.http.get(url, {responseType : 'blob'});
      }

  getImageFromBucket(id : string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
          }

}
