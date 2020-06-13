import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

const URL_API = environment.API.EndPoint.NODE;

@Injectable({
  providedIn: 'root'
})
export class NodeapiService {

  constructor(private http: HttpClient) { }

  // getGraphicsData(dim: string, values: any) {
  //   const dimension: string = `[Dim%20${dim}].[Dim%20${dim}%20Nombre]`;
  //   return this.http
  //     .post(`${URL_API}GetDataPieByDimension/${dimension}/DESC`, values)
  //     .pipe(map((result: any) => result));
  // }

  test() {
    return this.http.get(`${URL_API}/api/auth/test`);
  }

  login(username: string, password: string) {
    return this.http.post(`${URL_API}/api/auth/login`, {
      username,
      password
    });
  }

  verifyToken(token: string) {
    return this.http.get(`${URL_API}/api/auth/verify`, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    });
  }
}
