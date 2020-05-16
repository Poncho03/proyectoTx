import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { EstadisticasPage } from '../estadisticas/estadisticas.page';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActionSheetController } from '@ionic/angular';

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
      subtitulo: 'Cambiar nombre de usuario',
      disabled: false
    },
    {
      id: '2',
      icon: 'car',
      titulo: 'Número de unidad',
      subtitulo: 'Cambiar número de la unidad que maneja',
      disabled: false
    },
    {
      id: '3',
      icon: 'analytics',
      titulo: 'Estadísticas generales',
      subtitulo: 'Registro completo del uso de la aplicación',
      disabled: false
    }
  ];
  nombre: string = JSON.parse(localStorage.getItem("nombre"));
  unidad: string = JSON.parse(localStorage.getItem("unidad"));

  foto: SafeResourceUrl;

  constructor( private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController,
              private actionSheetCtrl: ActionSheetController,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('ingreso a la pantalla Ajustes');
    if (!localStorage.getItem("userPhoto")) {
      this.foto = 'assets/userNull.jpg'
    }
    else{
      this.foto = JSON.parse(localStorage.getItem("userPhoto"));
    }
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

  async Opciones() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Elige una opción',
      buttons: [
        {
          text: 'Tomar foto',
          icon: 'camera',
          handler: () => {
            console.log('Share clicked');
            this.tomarFoto();
          }
        },
        {
          text: 'Eliminar foto',
          icon: 'trash',
          handler: () => {
            console.log('Share clicked');
            this.eliminarFoto();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async tomarFoto(){
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.foto = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    console.log(image);
    localStorage.setItem("userPhoto", JSON.stringify(image.dataUrl));
  }

  eliminarFoto(){
    this.foto = 'assets/userNull.jpg';
    localStorage.setItem("userPhoto", JSON.stringify(this.foto));
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
    if (result.data.values.unity != "") {
      localStorage.setItem("unidad", JSON.stringify(result.data.values.unity));
      this.unidad = JSON.parse(localStorage.getItem("unidad"));
      this.changeSuccess();
    }
    else{
      this.changeFailed();
    }
  }

  async estadisticas(){
   const modal = await this.modalCtrl.create({
     component: EstadisticasPage,
     backdropDismiss: false
   });
   await modal.present();
  }

  /*async contacto(){
    console.log('Evento Contacto funciona');
    const alert = await this.alertCtrl.create({
      header: 'Elige la manera que más te guste',
      message: '<ion-item lines="none" href="www.google.com"><ion-icon slot="start" name="logo-facebook"></ion-icon>'
                +'<ion-label>Facebook</ion-label></ion-item><ion-item lines="none" href="www.google.com">'
                +'<ion-icon slot="start" name="mail"></ion-icon><ion-label>'
                +'Email.</ion-label></ion-item>',
      buttons: [{
        text: 'Cerrar',
        handler: () => {
          console.log('Se cierra contacto');
        }
      }],
      mode: 'ios'
    });
    await alert.present();
  }*/

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
