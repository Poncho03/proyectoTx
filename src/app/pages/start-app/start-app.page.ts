import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Plugins } from '@capacitor/core';
import { User } from '../../interfaces/user'

const { Device } = Plugins;

@Component({
  selector: 'app-start-app',
  templateUrl: './start-app.page.html',
  styleUrls: ['./start-app.page.scss'],
})
export class StartAppPage implements OnInit {

  boton: boolean = false;
  newUser = {} as User
  switch: boolean = JSON.parse(localStorage.getItem("theme"));

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController
    ) {
  }

  ngOnInit() {
    this.getInfo();
  }

  salir(){
    this.modalCtrl.dismiss({
      nombre: this.newUser.nombre,
      unidad: this.newUser.unidad
    });
    this.crearUsuario(this.newUser);
  }

  onSubmitTemplate(){
    console.log('form');
  }

  changeTheme(e){
    this.switch = e.detail.checked;
    localStorage.setItem("theme", JSON.stringify(this.switch));
    if (this.switch === true) {
      document.body.setAttribute('class', 'dark');
    }
    else{
      document.body.removeAttribute('class');
    }
  }

  async crearUsuario(nu: User){
    let loader = this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    (await loader).present();

    try{
      await this.firestore.collection("usuarios").add(nu);
      this.showToast("Usuario agregado")
    }
    catch(e){
      this.showToast("Error: "+e);
    }
    (await loader).dismiss();
  }

  showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then( toasData => toasData.present());
  }

  async getInfo(){
    const info = await Device.getInfo();
    this.newUser.osversion = info.osVersion;
    this.newUser.modelo = info.model;
  }

}
