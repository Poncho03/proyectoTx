import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { StartAppPage } from '../start-app/start-app.page';

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
  dataJSON: string;

  //Variables de informacion del usuario
  nombre: string;
  unidad: string;

  constructor( private alertCtrl: AlertController,
              private router: Router,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController ) {}

  ngOnInit() {
    this.obtenerDatosUsuarioFirstTime();
  }
  ionViewWillEnter(){
    this.obtenerDatosUsuario();
    this.obtenerDatosRegistro();
  }

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
      message: `<br><h4 class="ion-text-center">Ingrese el costo del viaje<br><br>Duracion: ${this.time}</h4>`,
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
        tipo: 'ingresos',
        tiempo: this.time,
        money: result.data.values.costo,
        icon: 'arrow-up-circle'
      }
      this.precio.push(dataIngreso);
      console.log(this.precio);
      this.messageSave();
      this.dataJSON = JSON.stringify(this.precio);
      localStorage.setItem("data", this.dataJSON);
    }
    else{
      this.messageNull();
    }
  }

  async agregarEgreso(){
    let hora = new Date().getHours().toString();
    let min = new Date().getMinutes().toString();
    let tiempoRegistro = hora +' : '+ min +' hrs.';
    const alert = await this.alertCtrl.create({
      header: 'Añadir un gasto',
      message: '<br><h4 class="ion-text-center">Ingrese la cantidad de dinero que se gastó</h4>',
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
        tipo: 'egresos',
        tiempo: tiempoRegistro,
        money: result.data.values.gasto,
        icon: 'arrow-down-circle'
      }
      this.precio.push(dataIngreso);
      console.log(this.precio);
      this.messageSave();
      this.dataJSON = JSON.stringify(this.precio);
      localStorage.setItem("data", this.dataJSON);
    }
    else{
      this.messageNull();
    }
  }

  async userData() {
    const alert = await this.alertCtrl.create({
      header: 'Bienvenido a Tax',
      message: '<h4>Por favor, llene los campos para personalizar su servicio</h4>',
      inputs: [ 
        { name: 'nombre', type: 'text', placeholder: 'Nombre' },
        { name: 'unidad', type: 'number', placeholder: 'Número de su unidad' },
      ],
      buttons: [
        { text: 'Ok', cssClass: 'primary',
          handler: () => {
            console.log('Datos añadidos');
          }
        }
      ],
      mode: 'ios',
      backdropDismiss: false
      
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    if(result.data.values.nombre != "" && result.data.values.unidad != ""){
      localStorage.setItem("nombre", JSON.stringify(result.data.values.nombre));
      localStorage.setItem("unidad", JSON.stringify(result.data.values.unidad));
      this.nombre = JSON.parse(localStorage.getItem("nombre"));
      this.unidad = JSON.parse(localStorage.getItem("unidad"));
      this.messageDataSuccess();
    }
    else{
      this.messageDataNull();
      this.userData();
    }
  }

  async messageNull() {
    const alert = await this.alertCtrl.create({
      header: 'Operación cancelada',
      message: '<h4 class="ion-text-center">No se agregó un valor</h4',
      buttons: ['Ok'],
      mode: 'ios'
    });
    
    await alert.present();
  }
  async messageSave() {
    const alert = await this.alertCtrl.create({
      header: 'Buen trabajo, ¡siga así!',
      message: '<h4 class="ion-text-center">Se guardó la cantidad</h4',
      buttons: ['Ok'],
      mode: 'ios'
    });
    await alert.present();
  }
  async messageDataSuccess() {
    const alert = await this.alertCtrl.create({
      header: 'Datos guardados',
      message: `<h4 class=\\"ion-text-center ion-text-capitalize\\">Bienvenido ${this.nombre}</h4>`,
      mode: 'ios'
    });
    await alert.present();
  }
  async messageDataNull() {
    const toast = await this.toastCtrl.create({
      message: 'Es necesario agregar los datos para continuar',
      duration: 3000,
      color: 'dark',
      mode: 'ios'
    });
    toast.present();
  }

  Registros(){
    if (!localStorage.getItem("data")) {
      this.precio = [];
      this.router.navigate(['/registros'],{
        queryParams: {
          value: JSON.stringify(this.precio)
        }
      });
    }
    else{
      this.router.navigate(['/registros'],{
        queryParams: {
          value: JSON.stringify(this.precio)
        }
      });
    }
  }

  obtenerDatosUsuario(){
    if (localStorage.getItem("nombre") || localStorage.getItem("unidad")) {
      this.nombre = JSON.parse(localStorage.getItem("nombre"));
      this.unidad = JSON.parse(localStorage.getItem("unidad"));
    }
  }
  obtenerDatosRegistro(){
    if (localStorage.getItem("data") != null) {
      let dataArray = JSON.parse(localStorage.getItem("data"));
      this.precio = dataArray;
   }
  }
  obtenerDatosUsuarioFirstTime(){
    if (!localStorage.getItem("nombre") || !localStorage.getItem("unidad")) {
      this.inicioApp();
    }
    else{
      this.nombre = JSON.parse(localStorage.getItem("nombre"));
      this.unidad = JSON.parse(localStorage.getItem("unidad"));
    }
  }

  async inicioApp(){
    const modal = await this.modalCtrl.create({
      component: StartAppPage,
      componentProps: {
        nombre: '',
        unidad: ''
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
    localStorage.setItem("nombre", JSON.stringify(data.nombre));
    localStorage.setItem("unidad", JSON.stringify(data.unidad.toString()));
    this.nombre = JSON.parse(localStorage.getItem("nombre"));
    this.unidad = JSON.parse(localStorage.getItem("unidad"));
  }

}

interface Datos {
  tipo: string;
  tiempo: string;
  money: number;
  icon: string;
}
