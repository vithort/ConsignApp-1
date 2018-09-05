import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ToastOptions } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';

import { BrMaskerIonic3, BrMaskModel } from 'brmasker-ionic-3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items: any;

  public hide: boolean = false;
  public resultado: string;
  public rendaRestante: number;
  public percentualComprometido: number; //percentual ja comprometido da renda
  public percentualComprometer: number; //percentual que a pessoa pode comprometer da renda: 35%: verificar se eh melhor colocar 0,35
  public valor: number;

  public toastOptions: ToastOptions;
  public toastMessage: string;


  @ViewChild('renda') renda;
  @ViewChild('despesas') despesas;

  constructor(
    public navCtrl: NavController
    , public http: HttpClient
    , public toastCtrl: ToastController
  ) {
    //this.loadData();
  }

  loadData() {
    let data: Observable<any>;
    data = this.http.get('https://jsonplaceholder.typicode.com/posts');
    data.subscribe(results => {
      this.items = results;
    })
  }

  itemClick(itemid: number) {
    alert(itemid);
  }

  showToast(mensagem: string) {
    this.toastOptions = {
      message: mensagem
      , duration: 3000
      , position: 'bottom'
    }

    this.toastCtrl.create(this.toastOptions).present();
  }

  valeAPena() {

    this.rendaRestante = this.renda.value - this.despesas.value;
    this.valor = (this.renda.value * 35) / 100;
    if (this.renda.value == 0) {
      this.showToast('Por favor, informe alguma renda!!');
    } else {
      this.hide = !this.hide;
      if (this.valor < this.rendaRestante) {
        this.resultado = "Vale a Pena!";
      } else {
        this.resultado = "Não Vale a Pena!!";
      }
    }
  }

  ngIfCtrl() {
    this.hide = !this.hide;
  }

}
