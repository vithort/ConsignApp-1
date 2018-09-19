import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BancoProvider, Caixa } from '../../providers/banco/banco';

@IonicPage()
@Component({
  selector: 'page-caixa-edit',
  templateUrl: 'caixa-edit.html',
})
export class CaixaEditPage {
  model: Caixa;
  key: string;
  origem: string;
  transacao: string;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , private bancoProvider: BancoProvider
    , private toastCtrl: ToastController
  ) {

    this.origem = navParams.get('origem');
    this.transacao = navParams.get('transacao');

    if (this.navParams.data.caixa && this.navParams.data.key) {
      this.model = this.navParams.data.caixa;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Caixa();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaixaEditPage');
  }

  save() {
    this.saveCaixa()
      .then(() => {
        this.toastCtrl.create({
          message: this.origem + ' salva!'
          , duration: 3000
          , position: 'bottom'
        }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toastCtrl.create({
          message: 'Erro ao salvar a ' + this.origem + '!'
          , duration: 3000
          , position: 'bottom'
        }).present();
      })
  }

  private saveCaixa() {
    if (this.key) {
      return this.bancoProvider.update(this.key, this.model);
    } else {
      return this.bancoProvider.insert(this.model);
    }
  }

}