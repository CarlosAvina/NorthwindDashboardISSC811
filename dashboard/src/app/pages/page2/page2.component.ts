import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Label } from 'ng2-charts';
import { NorthwindService } from 'src/app/services/northwind.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
})
export class Page2Component implements OnInit {
  constructor(private north: NorthwindService) { }

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

    this.north.getSelectsData().subscribe((data: any) => {
      console.log(data);

      // const data = {
      //   clientes: [
      //     "Alfreds Futterkiste",
      //     "Ana Trujillo Emparedados y helados",
      //     "Antonio Moreno Taquería",
      //     "Around the Horn",
      //     "Berglunds snabbköp",
      //     "Blauer See Delikatessen",
      //     "Blondesddsl père et fils",
      //     "Bólido Comidas preparadas",
      //     "Bon app'",
      //     "Bottom-Dollar Markets",
      //     "B's Beverages",
      //     "Cactus Comidas para llevar",
      //     "Centro comercial Moctezuma",
      //     "Chop-suey Chinese",
      //     "Comércio Mineiro",
      //     "Consolidated Holdings",
      //     "Die Wandernde Kuh",
      //     "Drachenblut Delikatessen",
      //     "Du monde entier",
      //     "Eastern Connection",
      //     "Ernst Handel",
      //     "Familia Arquibaldo",
      //     "Folies gourmandes",
      //     "Folk och fä HB",
      //     "France restauration",
      //     "Franchi S.p.A.",
      //     "Frankenversand",
      //     "Furia Bacalhau e Frutos do Mar",
      //     "Galería del gastrónomo",
      //     "Godos Cocina Típica",
      //     "Gourmet Lanchonetes",
      //     "Great Lakes Food Market",
      //     "GROSELLA-Restaurante",
      //     "Hanari Carnes",
      //     "HILARION-Abastos",
      //     "Hungry Coyote Import Store",
      //     "Hungry Owl All-Night Grocers",
      //     "Island Trading",
      //     "Königlich Essen",
      //     "La corne d'abondance",
      //     "La maison d'Asie",
      //     "Laughing Bacchus Wine Cellars",
      //     "Lazy K Kountry Store",
      //     "Lehmanns Marktstand",
      //     "Let's Stop N Shop",
      //     "LILA-Supermercado",
      //     "LINO-Delicateses",
      //     "Lonesome Pine Restaurant",
      //     "Magazzini Alimentari Riuniti",
      //     "Maison Dewey",
      //     "Mère Paillarde",
      //     "Morgenstern Gesundkost",
      //     "North/South",
      //     "Océano Atlántico Ltda.",
      //     "Old World Delicatessen",
      //     "Ottilies Käseladen",
      //     "Pericles Comidas clásicas",
      //     "Piccolo und mehr",
      //     "Princesa Isabel Vinhos",
      //     "Que Delícia",
      //     "Queen Cozinha",
      //     "QUICK-Stop",
      //     "Rancho grande",
      //     "Rattlesnake Canyon Grocery",
      //     "Reggiani Caseifici",
      //     "Ricardo Adocicados",
      //     "Richter Supermarkt",
      //     "Romero y tomillo",
      //     "Santé Gourmet",
      //     "Save-a-lot Markets",
      //     "Seven Seas Imports",
      //     "Simons bistro",
      //     "Spécialités du monde",
      //     "Split Rail Beer & Ale",
      //     "Suprêmes délices",
      //     "The Big Cheese",
      //     "The Cracker Box",
      //     "Toms Spezialitäten",
      //     "Tortuga Restaurante",
      //     "Tradição Hipermercados",
      //     "Trail's Head Gourmet Provisioners",
      //     "Vaffeljernet",
      //     "Victuailles en stock",
      //     "Vins et alcools Chevalier",
      //     "Wartian Herkku",
      //     "Wellington Importadora",
      //     "White Clover Markets",
      //     "Wilman Kala",
      //     "Wolski  Zajazd"
      //   ],
      //   meses: [
      //     "Abril",
      //     "Agosto",
      //     "Diciembre",
      //     "Enero",
      //     "Febrero",
      //     "Julio",
      //     "Junio",
      //     "Marzo",
      //     "Mayo",
      //     "Noviembre",
      //     "Octubre",
      //     "Septiembre"
      //   ],
      //   anios: [
      //     "1996",
      //     "1997",
      //     "1998"
      //   ]
      // }


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
    });
  }
}
