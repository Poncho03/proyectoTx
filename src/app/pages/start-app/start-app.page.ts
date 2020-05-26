import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-start-app',
  templateUrl: './start-app.page.html',
  styleUrls: ['./start-app.page.scss'],
})
export class StartAppPage implements OnInit {

  boton: boolean = false;
  newUser = {
    nombreModal: '',
    unidadModal: ''
  }
  switch: boolean = JSON.parse(localStorage.getItem("theme"));

  constructor( private modalCtrl: ModalController ) {
  }

  ngOnInit() {
  }

  salir(){
    this.modalCtrl.dismiss({
      nombre: this.newUser.nombreModal,
      unidad: this.newUser.unidadModal
    });
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

}
