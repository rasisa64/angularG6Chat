import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authSrv: AuthService

  ) {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    )
  }

  ngOnInit() {
  }

  public onSubmit(): void{
    const email: string = this.loginForm.controls.email.value;
    const password: string = this.loginForm.controls.password.value;
    console.log('submited!: ', this.loginForm)
    if(this.loginForm.valid){
      this._singIn(email, password);
    }
  }

  public showErrorMessage(): any{
    if(this.loginForm.controls.email.hasError('required')){
      return this.errorMessage = 'Debes ingresar un correo electrónico'
    }
    if(this.loginForm.controls.password.hasError('email') && !this.loginForm.controls.password.hasError('required')){
      return this.errorMessage = 'Ingresa un correo válido'
    }
  }

  private async _singIn(email:string, password: string){
    await this.authSrv.singIn(email,password)
  }

  public async singOut(){
    this.authSrv.singOut();
  }

}
