import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { NodeapiService } from '../../services/nodeapi.service';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private formBuilder: FormBuilder, private node: NodeapiService, private auth: AuthService, public router: Router, public dialog: MatDialog) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmit($event) {
    console.log($event);
    const { username, password } = $event;

    this.node.login(username, password).subscribe(async (response: any) => {
      if (!response.ok) {
        console.log(response.error.msg);
      }

      const { msg, token } = response;
      console.log(token);
      localStorage.setItem('token', token);
      const res = await this.auth.isAuthenticated(token);
      console.log(res);
      if (res) {
        this.router.navigate(['barras']);
      }
    }, (error) => this.openDialog());


    this.loginForm.reset();


    // this.router.navigate(['barras']);
  }
}
