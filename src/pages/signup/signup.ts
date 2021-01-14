import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder) {

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

  signupUser(){
    console.log("enviou o form");
  }


}
