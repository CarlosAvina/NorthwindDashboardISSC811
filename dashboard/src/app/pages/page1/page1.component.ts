import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { NorthwindService } from 'src/app/services/northwind.service';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
})
export class Page1Component implements OnInit {
  constructor(private north: NorthwindService) {}

  dataAnios: Label[] = [];
  dataChartTable: ChartDataSets[] = [];

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

    // this.dataAnios = result.years;
    // this.dataChartTable = result;

    // });

    // this.north.getGraphicsData('Cliente', []).subscribe((result: any) => {
    //   console.log(result);

    const graphic = {
      datosDimension: ['Alfreds Futterkiste'],
      datosVenta: [4273.0],
      datosTabla: [
        {
          descripcion: 'Alfreds Futterkiste',
          valor: 4273.0,
        },
      ],
      años: ['2000', '2000', '2000', '2000', '2000'],
    };

    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
    const graphicData: ChartDataSets[] = [
      {
        data: [Math.round(graphic.datosVenta[0])],
        label: graphic.datosDimension[0],
      },
      {
        data: [Math.round(graphic.datosVenta[0])],
        label: graphic.datosDimension[0],
      },
      {
        data: [Math.round(graphic.datosVenta[0])],
        label: graphic.datosDimension[0],
      },
      {
        data: [Math.round(graphic.datosVenta[0])],
        label: graphic.datosDimension[0],
      }
    ];
    this.dataAnios = graphic.años;
    this.dataChartTable = graphicData;
    // });
  }
}
