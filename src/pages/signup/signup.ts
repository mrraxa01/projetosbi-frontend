import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { ClienteService } from '../../services/cliente.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public cidadeService: CidadeService,
              public estadoService: EstadoService,
              public clienteService: ClienteService,
              public alertCtrl: AlertController
              ) {

        this.formGroup = this.formBuilder.group({
          //validators.required - campo obrigatório
          //o campo só está preenchido para facilitar os testes
          nome: ['Joaquim',[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
          email: ['joaquim@gmail.com',[Validators.required,Validators.email]],
          tipo:['1',[Validators.required]],
          //a validação do se o CPF/CNPJ é válido é feito pelo backend
          //Aqui apenas o preenchimento é validado. CPF 11 e CNPJ 14 dígitos
          cpfOuCnpj: ['42662803002',[Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
          senha:['123', [Validators.required]],
          logradouro: ['Rua Via', Validators.required],
          numero:['25',[Validators.required]],
          complemento: ['Apto 3', []],
          bairro: ['Copacabana', []],
          cep: ['38181415', [Validators.required]],
          telefone1: ['977261827', [Validators.required]],
          telefone2: ['',[]],
          telefone3: ['',[]],
          estadoId: [null, [Validators.required]],
          cidadeId: [null,[Validators.required]]
        });
  }

  ionViewDidLoad(){

    this.estadoService.findAll()
    .subscribe(response => {
      this.estados = response;
      //pega o ID do estado que estiver selecionado no html
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error => {});
  }

  updateCidades(){
    //recebe o ID do estado marcado no html
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(response => {
      this.cidades = response;
    //deixa a lista de cidades sem nenhuma seleção
    this.formGroup.controls.cidadeId.setValue(null);
    },
    error => {});
  }


  signupUser(){

    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }
  //se tiver sucesso na inserção vai apresentar o alert abaixo
showInsertOk(){
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Cadastro efetuado com sucesso!',
    enableBackdropDismiss: false,
    buttons: [
      //qdo clicar no botão ok vai desempilhar a página de login
      {
        text: 'Ok',
        handler: () =>{
          this.navCtrl.pop();
        }
      }
    ]
  });
  alert.present();
}

}
