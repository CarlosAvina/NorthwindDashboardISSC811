import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

const URL_API = environment.API.EndPoint.Northwind;

@Injectable({
  providedIn: 'root',
})
export class NorthwindService {
  constructor(private http: HttpClient) {}

  getSelectsData() {
    return this.http.get(`${URL_API}clients`);
  }

  getGraphicsData(dim: string, values: string[]) {
    const dimension: string = `[Dim%20${dim}].[Dim%20${dim}%20Nombre]`;
    return this.http
      .post(`${URL_API}GetDataPieByDimension/${dimension}`, values)
      .pipe(map((result: any) => result));
  }
}
