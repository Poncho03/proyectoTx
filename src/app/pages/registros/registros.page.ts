import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage implements OnInit {

  data: any[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe( (d) => {
      this.data = JSON.parse(d.value);
      console.log(this.data);
    } )
  }

  ngOnInit() {
  }

  segmentChanged(event){
    console.log(event.detail.value);
  }

}
