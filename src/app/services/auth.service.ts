import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  login(username: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(username, password);
  }

  register(username: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(username, password);
  }

  logout() {
    return this.afAuth.signOut();
  }
}
