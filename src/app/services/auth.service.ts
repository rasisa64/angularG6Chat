import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { map,tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authSrv: AngularFireAuth,
    private rotuer: Router
  ) { }


  public async singIn(email: string, password: string) : Promise<any>{
    await this.authSrv.auth.signInWithEmailAndPassword(email, password).then(
      response => {
        console.log('loggeed!', response);
        if(response.user && response.user.uid){
          let user = {
            email: response.user.email,
            uid: response.user.uid
          }
          sessionStorage.setItem('user', JSON.stringify(user) );
          this.rotuer.navigate(['/chat'])
        }
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  } 

  public async singOut(): Promise<any>{
    this.authSrv.authState.pipe(map(auth => auth),tap(auth => console.log(auth)))
    await this.authSrv.auth.signOut().then(
      r => {
        console.log(r)
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  }
}
