import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
})
export class Page2Component implements OnInit {
  constructor() {}

  pieChartLabels: Label[] = [];
  pieChartData: number[] = [];

  defaultBindingsList = [
    { value: 1, label: 'Cliente' },
    { value: 2, label: 'Producto' },
    { value: 3, label: 'Empleado' },
  ];
  mesesList = [];
  aniosList = [];
  nombresList = [];

  selectedDimension = null;
  selectedMeses: any[] = [];
  selectedAnios: any[] = [];
  selectedCustomer: any[] = [];

  // Ng-Select Multiple
  customer$: Observable<any>;

  ngOnInit(): void {
    // this.selectedDimension = this.defaultBindingsList[0];

    // this.north.getSelectsData().subscribe((result: any) => {
    // console.log(result);

    const data = {
      clientes: [
        'Alfreds Futterkiste',
        'Alfreds Futterkiste',
        'Alfreds Futterkiste',
        'Alfreds Futterkiste',
        'Alfreds Futterkiste',
        'Alfreds Futterkiste',
      ],
      meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      anios: ['2000', '2000', '2000', '2000', '2000', '2000'],
    };

    this.mesesList = data.meses;
    this.aniosList = data.anios;
    this.nombresList = data.clientes;

    const graphic = {
      datosDimension: ['Alfreds Futterkiste'],
      datosVenta: [Math.round(4273.0)],
      datosTabla: [
        {
          descripcion: 'Alfreds Futterkiste',
          valor: 4273.0,
        },
      ],
      años: ['2000', '2000', '2000', '2000', '2000'],
    };

    this.pieChartLabels = graphic.datosDimension;
    this.pieChartData = graphic.datosVenta;
  }
}
