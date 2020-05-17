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
  esta = [
    {
      titulo: 'No. de viajes realizados',
      data: localStorage.getItem("numVia")
    },
    {
      titulo: 'Ganancias totales',
      data: '$'+localStorage.getItem("ganTot")
    },
    {
      titulo: 'Gastos totales',
      data: '$'+localStorage.getItem("gasTot")
    },
    {
      titulo: 'Viaje más largo',
      data: localStorage.getItem("timeMax")
    },
    {
      titulo: 'Fecha de inicio',
      data: localStorage.getItem("fechaInicio")
    }
  ]


  ngOnInit() {
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
