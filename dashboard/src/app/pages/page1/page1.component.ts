import { Component, OnInit } from '@angular/core';
import { NorthwindService } from 'src/app/services/northwind.service';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
})
export class Page1Component implements OnInit {
  constructor(private north: NorthwindService) { }

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

  selectedParams: any = {
    dimension: '',
    clients: [],
    years: [],
    months: [],
  };

  ngOnInit(): void {
    this.selectedDimension = this.defaultBindingsList[0];
    this.north.getSelectsData().subscribe((selectsData: any) => {

      this.mesesList = selectsData.meses;
      this.aniosList = selectsData.anios;
      this.nombresList = selectsData.clientes;

      this.updateGraphic();
    });
  }

  onChangeDimension($event) {
    this.selectedParams.dimension = $event.label;
    this.updateGraphic();
  }

  onChangeMeses($event) {
    this.selectedParams.months = $event;
    this.updateGraphic();
  }

  onChangeAnios($event) {
    this.selectedParams.years = $event;
    this.updateGraphic();
  }

  onChangeCustomer($event) {
    this.selectedParams.clients = $event;
    this.updateGraphic();
  }

  updateGraphic() {
    const dimension = this.selectedParams.dimension;
    const { clients, years, months } = this.selectedParams;
    let body = { clients, years, months };
    for (const key in body) {
      if (body[key].length === 0) body[key] = [''];
    }
    
    this.north.getGraphicsData(dimension ? dimension : 'Cliente', body).subscribe((graphic: any) => {

        const labels = graphic.datosTabla.map(label => `${label.meses} ${label.años}`).filter((item, index, arr) => arr.indexOf(item) === index);

        let graphicValues: number[] = [];
        let values = graphic.datosTabla.map((value, index, arr) => {
          if (index === 0) {
            graphicValues.push(value.valor);
          } else if (value.descripcion === arr[index - 1].descripcion) {
            graphicValues.push(value.valor);
          }

          if (arr[index + 1] !== undefined && value.descripcion !== arr[index + 1].descripcion) {
            const vals = graphicValues;
            graphicValues = [];
            return { label: value.descripcion, data: vals }
          } else if (arr[index + 1] === undefined) {
            if (graphicValues.length === 0) graphicValues.push(value.valor);
            return { label: value.descripcion, data: graphicValues }
          }
          else return undefined;
        });

        values = values.filter(v => v !== undefined);

        const graphicData: ChartDataSets[] = values;
        const emptyData: ChartDataSets[] = [{ label: '', data: [0] }];


        this.dataAnios = labels ? labels : '';
        this.dataChartTable = graphicData.length !== 0 ? graphicData : emptyData;
    });
  }
}
