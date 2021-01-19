import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { ClienteService } from '../../services/cliente.service';
import { CartService } from '../../services/domain/cart.service';
import { StorageService } from '../../services/storage_service';



@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        //'enderecos' é o nome do campo no backend
        this.items = response['enderecos'];
        //pega o que está no carrinho para finalizar o pedido:
        let cart = this.cartService.getCart();
        //vai aproveitar a buscar e carregar os demais dados:
        this.pedido={
          cliente: {id: response['id']},
          enderecoDeEntrega: null, //null pq o usuário irá escolher
          pagamento:null,
          //vai percorrer a lista de carrinhos salvado os ids dos itens
          itens: cart.itens.map( x => {return{quantidade: x.quantidade, produto: {id: x.produto.id}}})
        }

      },
      error => {
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }else{
          this.navCtrl.setRoot('HomePage');
        }

      });

     }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id:item.id};
    console.log(this.pedido);
  }

}
