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
  // Ng-Select Multiple
  customer$: Observable<any>;

  ngOnInit(): void {
    this.selectedDimension = this.defaultBindingsList[0];
    this.north.getSelectsData().subscribe((selectsData: any) => {
      console.log(selectsData);

      // const selectsData = {
      //   clientes: [
      //     'Alfreds Futterkiste',
      //     'Ana Trujillo Emparedados y helados',
      //     'Antonio Moreno Taquería',
      //     'Around the Horn',
      //     'Berglunds snabbköp',
      //     'Blauer See Delikatessen',
      //     'Blondesddsl père et fils',
      //     'Bólido Comidas preparadas',
      //     "Bon app'",
      //     'Bottom-Dollar Markets',
      //     "B's Beverages",
      //     'Cactus Comidas para llevar',
      //     'Centro comercial Moctezuma',
      //     'Chop-suey Chinese',
      //     'Comércio Mineiro',
      //     'Consolidated Holdings',
      //     'Die Wandernde Kuh',
      //     'Drachenblut Delikatessen',
      //     'Du monde entier',
      //     'Eastern Connection',
      //     'Ernst Handel',
      //     'Familia Arquibaldo',
      //     'Folies gourmandes',
      //     'Folk och fä HB',
      //     'France restauration',
      //     'Franchi S.p.A.',
      //     'Frankenversand',
      //     'Furia Bacalhau e Frutos do Mar',
      //     'Galería del gastrónomo',
      //     'Godos Cocina Típica',
      //     'Gourmet Lanchonetes',
      //     'Great Lakes Food Market',
      //     'GROSELLA-Restaurante',
      //     'Hanari Carnes',
      //     'HILARION-Abastos',
      //     'Hungry Coyote Import Store',
      //     'Hungry Owl All-Night Grocers',
      //     'Island Trading',
      //     'Königlich Essen',
      //     "La corne d'abondance",
      //     "La maison d'Asie",
      //     'Laughing Bacchus Wine Cellars',
      //     'Lazy K Kountry Store',
      //     'Lehmanns Marktstand',
      //     "Let's Stop N Shop",
      //     'LILA-Supermercado',
      //     'LINO-Delicateses',
      //     'Lonesome Pine Restaurant',
      //     'Magazzini Alimentari Riuniti',
      //     'Maison Dewey',
      //     'Mère Paillarde',
      //     'Morgenstern Gesundkost',
      //     'North/South',
      //     'Océano Atlántico Ltda.',
      //     'Old World Delicatessen',
      //     'Ottilies Käseladen',
      //     'Pericles Comidas clásicas',
      //     'Piccolo und mehr',
      //     'Princesa Isabel Vinhos',
      //     'Que Delícia',
      //     'Queen Cozinha',
      //     'QUICK-Stop',
      //     'Rancho grande',
      //     'Rattlesnake Canyon Grocery',
      //     'Reggiani Caseifici',
      //     'Ricardo Adocicados',
      //     'Richter Supermarkt',
      //     'Romero y tomillo',
      //     'Santé Gourmet',
      //     'Save-a-lot Markets',
      //     'Seven Seas Imports',
      //     'Simons bistro',
      //     'Spécialités du monde',
      //     'Split Rail Beer & Ale',
      //     'Suprêmes délices',
      //     'The Big Cheese',
      //     'The Cracker Box',
      //     'Toms Spezialitäten',
      //     'Tortuga Restaurante',
      //     'Tradição Hipermercados',
      //     "Trail's Head Gourmet Provisioners",
      //     'Vaffeljernet',
      //     'Victuailles en stock',
      //     'Vins et alcools Chevalier',
      //     'Wartian Herkku',
      //     'Wellington Importadora',
      //     'White Clover Markets',
      //     'Wilman Kala',
      //     'Wolski  Zajazd',
      //   ],
      //   meses: [
      //     'Abril',
      //     'Agosto',
      //     'Diciembre',
      //     'Enero',
      //     'Febrero',
      //     'Julio',
      //     'Junio',
      //     'Marzo',
      //     'Mayo',
      //     'Noviembre',
      //     'Octubre',
      //     'Septiembre',
      //   ],
      //   anios: ['1996', '1997', '1998'],
      // };

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
    console.log(dimension);
    console.log(body);
    this.north.getGraphicsData(dimension ? dimension : 'Cliente', body).subscribe((graphic: any) => {
      console.log(graphic);

      // const graphic = {
      //   datosDimension: [
      //     'Bottom-Dollar Markets',
      //     'Bottom-Dollar Markets',
      //     'Alfreds Futterkiste',
      //   ],
      //   datosAnios: ['1996', '1998', '1998'],
      //   datosMeses: ['Diciembre', 'Abril', 'Abril'],
      //   datosVenta: [1833.0, 2712.0, 934.0],
      //   datosTabla: [
      //     {
      //       descripcion: 'Bottom-Dollar Markets',
      //       años: '1996',
      //       meses: 'Diciembre',
      //       valor: 1833.0,
      //     },
      //     {
      //       descripcion: 'Bottom-Dollar Markets',
      //       años: '1998',
      //       meses: 'Abril',
      //       valor: 2712.0,
      //     },
      //     {
      //       descripcion: 'Alfreds Futterkiste',
      //       años: '1998',
      //       meses: 'Abril',
      //       valor: 934.0,
      //     },
      //   ],
      // };

        console.log('ENTRO');
        console.log(graphic);
        const labels = graphic.datosTabla.map(label => `${label.meses} ${label.años}`).filter((item, index, arr) => arr.indexOf(item) === index);

        // let currentName: string = '';
        let graphicValues: number[] = [];
        let values = graphic.datosTabla.map((value, index, arr) => {
          if (index === 0) {
            // currentName = value.descripcion;
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

        console.log(values);
        values = values.filter(v => v !== undefined);

        console.log(labels);
        console.log(values);

        const graphicData: ChartDataSets[] = values;
        const emptyData: ChartDataSets[] = [{ label: '', data: [0] }];


        this.dataAnios = labels ? labels : '';
        this.dataChartTable = graphicData.length !== 0 ? graphicData : emptyData;
    });
  }
}
