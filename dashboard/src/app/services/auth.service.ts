import { Injectable } from '@angular/core';
import { NodeapiService } from './nodeapi.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private node: NodeapiService) { }

  public isAuthenticated(token: string): Promise<boolean> {
    return new Promise(resolve => {
      this.node.verifyToken(token).subscribe((response: any) => {
        console.log('AUTH SERVICE');
        console.log(response);
        resolve(response.ok);
      });
    });
  }
}
