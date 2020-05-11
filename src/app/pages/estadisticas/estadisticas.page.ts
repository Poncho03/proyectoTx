import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

  constructor( private modalCtrl: ModalController) { }

  data: any[] = [];
  tipo;
  tiempo;
  money;


  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem("data"));
    for (let i = 0; i < this.data.length; i++) {
      this.tipo = this.data[i].tipo;
      this.tiempo = this.data[i].tiempo;
      this.money = this.data[i].money;
    }
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
