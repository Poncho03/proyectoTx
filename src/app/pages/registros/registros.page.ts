import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage implements OnInit {

  data: any[] = [];
  tipo: string = '';
  neta: number = 0;
  boton: boolean = true;
  color: string;

  constructor( private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.tipo = 'ingresos';
    this.data = JSON.parse(localStorage.getItem("testData"));
    console.log(this.data);
    if(this.data.length === 0){
      this.boton = true;
    }
    else{
      this.boton = false;
    }
    for (let i = 0; i < this.data.length; i++) {
      if( this.data[i].tipo === 'ingresos'){
        console.log(parseInt(this.data[i].money, 10));
        this.neta += parseInt(this.data[i].money, 10);
      }
      else{
        console.log(parseInt(this.data[i].money, 10));
        this.neta -= parseInt(this.data[i].money, 10);
      }
    }
    if (this.neta === 0) {
      this.color='';
    }
    else if(this.neta > 0){
      this.color='success';
    }
    else{
      this.color='danger';
    }
  }

  segmentChanged(event){
    this.tipo = event.detail.value;
    console.log(this.tipo);
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Se borrarán los registros',
      message: '<h4 class="ion-text-center">Esta a punto de eliminar los registros<br>¿Desea continuar?</h4>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.borrarData();
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  borrarData(){
    this.data = [];
    console.log(this.data);
    localStorage.setItem("testData", JSON.stringify(this.data));
    this.boton = true;
    this.neta = 0;
    this.color='';
    this.presentToast()
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Registros eliminados',
      duration: 2000,
      color: 'medium',
      mode: 'ios'
    });
    toast.present();
  }
  
}
