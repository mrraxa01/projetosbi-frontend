import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoService } from '../../services/domain/pedido.service';
import { OrderConfirmationPage } from './order-confirmation';

@NgModule({
  declarations: [
    OrderConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderConfirmationPage),
  ],
  //o provider do pedidoservice foi estanciado aqui em vez do appmodule.ts pq só será necessário para confirmar o pedido
  providers:[
    PedidoService
  ]
})
export class OrderConfirmationPageModule {}
