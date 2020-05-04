import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  //Variables de cronometro
  public centesimas: number = 0;
  public minutos: number = 0;
  public segundos: number = 0;
  public contador: any;
  public _centesimas: string = '00';
  public _minutos: string = '00';
  public _segundos: string = '00';
  isRun = false;
  refreshColor = 'light';
  //Variables que guardan el tiempo
  time: string = '';

  //Variables de la interfaz
  mensaje: string = 'Empezar viaje';
  estado = false;
  disable = false;
  color: string = 'start';
  precio: Datos [] = [];
  ganancia: number = 0;
  perdida: number = 0;

  constructor(private navCtrl: NavController, private plt: Platform, private alertCtrl: AlertController) { }

  ngOnInit() { }

  status(){
    if(this.estado === false){
      console.log('Servicio activo');
      this.color = 'progress';
      this.mensaje = 'Finalizar viaje';
      this.estado = true;
      this.disable = true;
      this.start();
    }
    else{
      console.log('Servicio inactivo');
      this.color = 'start';
      this.mensaje = 'Empezar viaje';
      this.estado = false;
      this.disable = false;
      this.pause();
      this.stop();
      this.agregarIngreso();
    }
  }

  start() {
    this.contador = setInterval(() => {
      this.centesimas += 1;
      if (this.centesimas < 10) this._centesimas = '0' + this.centesimas;
      else this._centesimas = '' + this.centesimas;
      if (this.centesimas == 10) {
        this.centesimas = 0;
        this.segundos += 1;
        if (this.segundos < 10) this._segundos = '0' + this.segundos;
        else this._segundos = this.segundos + '';
        if (this.segundos == 60) {
          this.segundos = 0;
          this.minutos += 1;
          if (this.minutos < 10) this._minutos = '0' + this.minutos;
          else this._minutos = this.minutos + '';
          this._segundos = '00';
          if (this.minutos == 90) {
            this.pause();
          }
        }
      }
    }, 100)
  }

  pause() {
    clearInterval(this.contador);
  }

  stop() {
    if (!this.isRun) {
      clearInterval(this.contador);
      this.time = this._minutos +' : '+ this._segundos +' : '+ this._centesimas;

      this.minutos = 0;
      this.segundos = 0;
      this.centesimas = 0;

      this._centesimas = '00';
      this._segundos = '00';
      this._minutos = '00';

      this.isRun = false;
      this.contador = null;
    }
  }

  async agregarIngreso() {
    const alert = await this.alertCtrl.create({
      header: 'Fin de recorrido',
      message: `<br>Ingrese el costo del viaje<br><br>Duracion: ${this.time}`,
      inputs: [{
        name: 'costo',
        type: 'number',
        placeholder: '$'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Operacion cancelada');
          }
        }, {
          text: 'Guardar',
          handler: () => {
            console.log('Precio guardado');
          }
        }
      ],
      backdropDismiss: false,
      mode: 'ios'
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    if (result.data.values.costo != ""){
      let dataIngreso = {
        tipo: 'Ingreso',
        tiempo: this.time,
        money: result.data.values.costo
      }
      this.precio.push(dataIngreso);
      console.log(this.precio);
    }
  }

  async agregarEgrego(){
    let hora = new Date().getHours().toString();
    let min = new Date().getMinutes().toString();
    let tiempoRegistro = hora +' : '+ min;
    const alert = await this.alertCtrl.create({
      header: 'Añadir un gasto',
      message: '<br>Ingrese la cantidad de dinero que se gastó',
      inputs: [{
        name: 'gasto',
        type: 'number',
        placeholder: '$'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Operacion cancelada');
          }
        }, {
          text: 'Guardar',
          handler: () => {
            console.log('Gasto guardado');
          }
        }
      ],
      backdropDismiss: false,
      mode: 'ios'
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    if (result.data.values.gasto != "") {
      let dataIngreso = {
        tipo: 'Engreso',
        tiempo: tiempoRegistro,
        money: result.data.values.gasto
      }
      this.precio.push(dataIngreso);
      console.log(this.precio);
    }
  }

}

interface Datos {
  tipo: String;
  tiempo: String;
  money: number;
}
