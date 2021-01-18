import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";
import { StorageService } from "../storage_service";


@Injectable()
export class CartService{

  constructor (public storage: StorageService){
  }

  createOrClearCart() : Cart {
    let cart: Cart = {itens: []};
    this.storage.setCart(cart);
    return cart;
  }

  getCart() : Cart {
    let cart: Cart = this.storage.getCart();
    if(cart == null){
      cart = this.createOrClearCart();
    }
    return cart;
  }
  addProduto(produto: ProdutoDTO ) : Cart{
    let cart = this.getCart();
    //se o produto não exister o findindex vai retornar -1
    let position = cart.itens.findIndex(x => x.produto.id == produto.id);
    if(position == -1){
      cart.itens.push({quantidade: 1, produto: produto});
    }
    this.storage.setCart(cart);
    return cart;
  }
  removeProduto(produto: ProdutoDTO ) : Cart{
    let cart = this.getCart();
    //se o produto não exister o findindex vai retornar -1
    let position = cart.itens.findIndex(x => x.produto.id == produto.id);
    if(position != -1){
      cart.itens.splice(position,1);
    }
    this.storage.setCart(cart);
    return cart;
  }

  increaseQuantity(produto: ProdutoDTO ) : Cart{
    let cart = this.getCart();
    //se o produto não exister o findindex vai retornar -1
    let position = cart.itens.findIndex(x => x.produto.id == produto.id);
    if(position != -1){
      cart.itens[position].quantidade++;
    }
    this.storage.setCart(cart);
    return cart;
  }

  decreaseQuantity(produto: ProdutoDTO ) : Cart{
    let cart = this.getCart();
    //se o produto não exister o findindex vai retornar -1
    let position = cart.itens.findIndex(x => x.produto.id == produto.id);
    if(position != -1){
      cart.itens[position].quantidade--;
      //testa se a qtidade chegou a 0 e exclui o produto
      if(cart.itens[position].quantidade< 1){
        cart = this.removeProduto(produto);
      }
    }
    this.storage.setCart(cart);
    return cart;
  }

  total() : number {
    let cart = this.getCart();
    let sum = 0;
    for(var i=0; i<cart.itens.length;i++){
      sum += cart.itens[i].produto.preco * cart.itens[i].quantidade;

    }
    return sum;
  }
}
