import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  ajustes = [
    {
      id: '1',
      icon: 'person',
      titulo: 'Nombre',
      subtitulo: 'Cambiar nombre de usuario'
    },
    {
      id: '2',
      icon: 'car',
      titulo: 'Número de unidad',
      subtitulo: 'Cambiar número de la unidad que maneja'
    },
    {
      id: '3',
      icon: 'analytics',
      titulo: 'Estadísticas generales',
      subtitulo: 'Registro completo del uso de la aplicación'
    }
  ];
  nombre: string = JSON.parse(localStorage.getItem("nombre"));
  unidad: string = JSON.parse(localStorage.getItem("unidad"));

  constructor( private alertCtrl: AlertController,
              private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  onClick(item){
    if (item.id === '1') {
      this.cambiarNombre();
    }
    if (item.id === '2') {
      this.cambiarUnidad();
    }
    if (item.id === '3') {
      this.estadisticas();
    }
  }

  async cambiarNombre(){
    const alert = await this.alertCtrl.create({
      header: 'Cambiar nombre',
      message: '<br><h4 class="ion-text-center">Ingrese su nuevo nombre de usuario</h4>',
      inputs: [{
        name: 'name',
        type: 'text',
        value: this.nombre
      }],
      buttons: [
        {
          text: 'Cambiar',
          handler: () => {
            console.log('Nombre guardado');
          }
        }
      ],
      mode: 'ios'
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    if (result.data.values.name != '') {
      localStorage.setItem("nombre", JSON.stringify(result.data.values.name));
      this.nombre = JSON.parse(localStorage.getItem("nombre"));
      this.changeSuccess();
    }
    else{
      this.changeFailed();
    }
  }

  async cambiarUnidad(){
    const alert = await this.alertCtrl.create({
      header: 'Cambiar número de unidad',
      message: '<br><h4 class="ion-text-center">Ingrese el nuevo número de su unidad</h4>',
      inputs: [{
        name: 'unity',
        type: 'text',
        value: this.unidad
      }],
      buttons: [
        {
          text: 'Cambiar',
          handler: () => {
            console.log('Unidad guardada');
          }
        }
      ],
      mode: 'ios'
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    if (result.data.values.unity != '') {
      localStorage.setItem("unidad", JSON.stringify(result.data.values.unity));
      this.unidad = JSON.parse(localStorage.getItem("unidad"));
      this.changeSuccess();
    }
    else{
      this.changeFailed();
    }
  }
  estadisticas(){
    console.log('Evento Estadisticas funciona');
  }

  async changeSuccess() {
    const toast = await this.toastCtrl.create({
      message: 'Se guardó exitosamente',
      duration: 1500,
      color: 'medium',
      mode: 'ios'
    });
    toast.present();
  }

  async changeFailed() {
    const toast = await this.toastCtrl.create({
      message: 'No se puede dejar vacío el campo, por favor, ingrese un dato',
      duration: 2000,
      color: 'medium',
      mode: 'ios'
    });
    toast.present();
  }

}
